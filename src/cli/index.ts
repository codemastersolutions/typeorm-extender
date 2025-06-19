#!/usr/bin/env node

import { Command } from 'commander';
import { createMigration } from './commands/migration';
import { createFactory } from './commands/factory';
import { createSeed } from './commands/seed';
import { runMigrations } from './commands/run-migrations';
import { runSeeds } from './commands/run-seeds';
import { initProject } from './commands/init';
import { manageConfig } from './commands/config';
import { i18n, SupportedLanguage } from './i18n';
import { configManager } from './config';

// Initialize i18n with environment variable or config file language
const envLanguage = process.env.TYPEORM_EXTENDER_LANG as SupportedLanguage;
const configLanguage = configManager.getLanguage();

if (envLanguage && i18n.getSupportedLanguages().includes(envLanguage)) {
  i18n.setLanguage(envLanguage);
} else if (configLanguage) {
  i18n.initializeFromConfig(configLanguage);
}

const program = new Command();

// Global language option
program.option(
  '-l, --language <lang>',
  i18n.t('cli.options.language'),
  (value: string) => {
    const supportedLanguages = i18n.getSupportedLanguages();
    if (supportedLanguages.includes(value as SupportedLanguage)) {
      const language = value as SupportedLanguage;
      i18n.setLanguage(language);
      configManager.setLanguage(language);
      console.log(`✅ ${i18n.t('cli.options.confirmSet')}: ${language}`);
    } else {
      console.error(
        `❌ Unsupported language: ${value}. Supported: ${supportedLanguages.join(', ')}`
      );
      process.exit(1);
    }
  }
);

// Set program info with translations after language initialization
program
  .name(i18n.t('cli.name'))
  .description(i18n.t('cli.description'))
  .version(i18n.t('cli.version'));

// Comando para inicializar projeto
program
  .command('init')
  .description(i18n.t('commands.init.description'))
  .option(
    '-d, --database <type>',
    i18n.t('commands.init.options.database'),
    'postgres'
  )
  .option('--datasource <path>', i18n.t('commands.init.options.datasource'))
  .action(initProject);

// Comandos para migrations
program
  .command('migration:create <name>')
  .description(i18n.t('commands.migration.create.description'))
  .option(
    '-d, --dir <directory>',
    i18n.t('commands.migration.create.options.dir'),
    'src/migrations'
  )
  .action(createMigration);

program
  .command('migration:run')
  .description(i18n.t('commands.migration.run.description'))
  .option(
    '-c, --config <path>',
    i18n.t('commands.migration.run.options.config'),
    'ormconfig.json'
  )
  .option(
    '--datasource <path>',
    i18n.t('commands.migration.run.options.datasource')
  )
  .action(runMigrations);

// Comandos para factories
program
  .command('factory:create <name>')
  .description(i18n.t('commands.factory.create.description'))
  .option(
    '-d, --dir <directory>',
    i18n.t('commands.factory.create.options.dir'),
    'src/factories'
  )
  .option(
    '-e, --entity <entity>',
    i18n.t('commands.factory.create.options.entity')
  )
  .action(createFactory);

// Comandos para seeds
program
  .command('seed:create <name>')
  .description(i18n.t('commands.seed.create.description'))
  .option(
    '-d, --dir <directory>',
    i18n.t('commands.seed.create.options.dir'),
    'src/seeds'
  )
  .option(
    '-f, --factory <factory>',
    i18n.t('commands.seed.create.options.factory')
  )
  .action(createSeed);

program
  .command('seed:run')
  .description(i18n.t('commands.seed.run.description'))
  .option(
    '-c, --config <path>',
    i18n.t('commands.seed.run.options.config'),
    'ormconfig.json'
  )
  .option('--datasource <path>', i18n.t('commands.seed.run.options.datasource'))
  .option('-s, --seed <name>', i18n.t('commands.seed.run.options.seed'))
  .action(runSeeds);

// Comando para executar migrations e seeds em sequência
program
  .command('db:setup')
  .description(i18n.t('commands.db.setup.description'))
  .option(
    '-c, --config <path>',
    i18n.t('commands.db.setup.options.config'),
    'ormconfig.json'
  )
  .option('--datasource <path>', i18n.t('commands.db.setup.options.datasource'))
  .action(async options => {
    console.log(i18n.t('commands.db.setup.messages.start'));
    await runMigrations(options);
    await runSeeds(options);
    console.log(i18n.t('commands.db.setup.messages.success'));
  });

// Comando para gerenciar configurações
program
  .command('config')
  .description('Manage CLI configuration and language settings')
  .option('--show', 'Show current configuration')
  .option('--list', 'List supported languages')
  .option('--language <lang>', 'Set language (en, pt-BR, es)')
  .option('--reset', 'Reset to default configuration')
  .action(manageConfig);

// Hook para processar opções globais antes de executar comandos
program.hook('preAction', (thisCommand, actionCommand) => {
  const options = thisCommand.opts();
  if (options.language) {
    const supportedLanguages = i18n.getSupportedLanguages();
    if (supportedLanguages.includes(options.language as SupportedLanguage)) {
      const language = options.language as SupportedLanguage;
      i18n.setLanguage(language);
      configManager.setLanguage(language);
      console.log(`✅ ${i18n.t('cli.options.confirmSet')}: ${language}`);
    }
  }
});

program.parse();
