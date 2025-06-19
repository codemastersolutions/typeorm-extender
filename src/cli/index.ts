#!/usr/bin/env node

import { Command } from 'commander';
import { createMigration } from './commands/migration';
import { createFactory } from './commands/factory';
import { createSeed } from './commands/seed';
import { runMigrations } from './commands/run-migrations';
import { runSeeds } from './commands/run-seeds';
import { initProject } from './commands/init';

const program = new Command();

program
  .name('typeorm-extender')
  .description('CLI para TypeORM com funcionalidades estendidas')
  .version('0.0.3');

// Comando para inicializar projeto
program
  .command('init')
  .description('Inicializa a estrutura do projeto com configurações padrão')
  .option('-d, --database <type>', 'Tipo de banco de dados (postgres, mysql, sqlite)', 'postgres')
  .option('--datasource <path>', 'Caminho para arquivo de configuração do DataSource customizado')
  .action(initProject);

// Comandos para migrations
program
  .command('migration:create <name>')
  .description('Cria uma nova migration')
  .option('-d, --dir <directory>', 'Diretório das migrations', 'src/migrations')
  .action(createMigration);

program
  .command('migration:run')
  .description('Executa todas as migrations pendentes')
  .option('-c, --config <path>', 'Caminho para o arquivo de configuração', 'ormconfig.json')
  .option('--datasource <path>', 'Caminho para arquivo de configuração do DataSource customizado')
  .action(runMigrations);

// Comandos para factories
program
  .command('factory:create <name>')
  .description('Cria uma nova factory')
  .option('-d, --dir <directory>', 'Diretório das factories', 'src/factories')
  .option('-e, --entity <entity>', 'Nome da entidade relacionada')
  .action(createFactory);

// Comandos para seeds
program
  .command('seed:create <name>')
  .description('Cria um novo seed')
  .option('-d, --dir <directory>', 'Diretório dos seeds', 'src/seeds')
  .option('-f, --factory <factory>', 'Factory a ser utilizada no seed')
  .action(createSeed);

program
  .command('seed:run')
  .description('Executa todos os seeds')
  .option('-c, --config <path>', 'Caminho para o arquivo de configuração', 'ormconfig.json')
  .option('--datasource <path>', 'Caminho para arquivo de configuração do DataSource customizado')
  .option('-s, --seed <name>', 'Executa um seed específico')
  .action(runSeeds);

// Comando para executar migrations e seeds em sequência
program
  .command('db:setup')
  .description('Executa migrations e seeds em sequência')
  .option('-c, --config <path>', 'Caminho para o arquivo de configuração', 'ormconfig.json')
  .option('--datasource <path>', 'Caminho para arquivo de configuração do DataSource customizado')
  .action(async (options) => {
    console.log('🚀 Configurando banco de dados...');
    await runMigrations(options);
    await runSeeds(options);
    console.log('✅ Banco de dados configurado com sucesso!');
  });

program.parse();