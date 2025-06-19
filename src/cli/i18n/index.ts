import { config } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
const packageVersion = require('../../../package.json').version;

// Load environment variables
config();

export type SupportedLanguage = 'en' | 'pt-BR' | 'es';

interface Messages {
  [key: string]: string | Messages;
}

interface LanguageConfig {
  [language: string]: Messages;
}

const messages: LanguageConfig = {
  en: {
    cli: {
      name: 'typeorm-extender',
      description: 'CLI for TypeORM with extended functionalities',
      version: packageVersion,
      options: {
        language: 'Set language (en, pt-BR, es)',
        confirmSet: 'Language set to',
      },
    },
    commands: {
      init: {
        description: 'Initialize project structure with default configurations',
        options: {
          database: 'Database type (postgres, mysql, sqlite)',
          datasource: 'Path to custom DataSource configuration file',
        },
        messages: {
          success: '✅ Project initialized successfully!',
          usingCustomDatasource: '🔧 Using custom DataSource: {{path}}',
          creatingStructure: '📁 Creating project structure...',
          creatingConfig: '⚙️ Creating configuration files...',
        },
      },
      migration: {
        create: {
          description: 'Create a new migration',
          options: {
            dir: 'Migrations directory',
          },
          messages: {
            success: '✅ Migration {{name}} created successfully!',
            creating: '📝 Creating migration {{name}}...',
            directoryCreated: '📁 Directory created: {{dir}}',
            nextSteps: '📋 Next steps:',
            editMigration: '1. Edit the migration to define database changes',
            runMigration: '2. Run: npm run migration:run',
            error: '❌ Error creating migration:',
          },
        },
        run: {
          description: 'Run all pending migrations',
          options: {
            config: 'Path to configuration file',
            datasource: 'Path to custom DataSource configuration file',
          },
          messages: {
            success: '✅ All migrations executed successfully!',
            noPending: 'ℹ️ No pending migrations found',
            connecting: '🔌 Establishing database connection...',
            connectionSuccess: '✅ Database connection established',
            executing: '⚡ Executing migrations...',
            executed: '✅ Executed {{count}} migration(s)',
          },
        },
      },
      factory: {
        create: {
          description: 'Create a new factory',
          options: {
            dir: 'Factories directory',
            entity: 'Related entity name',
          },
          messages: {
            success: '✅ Factory {{name}} created successfully!',
            creating: '🏭 Creating factory {{name}}...',
            directoryCreated: '📁 Directory created: {{dir}}',
            nameRecommendation:
              '⚠️ Recommendation: Factory name should end with "Factory"',
            nextSteps: '📋 Next steps:',
            editFactory: '1. Edit the factory to define default data',
            useFactory: '2. Use the factory in your seeds or tests',
            exampleUsage:
              '3. Example: const user = await new {{className}}().create();',
            error: '❌ Error creating factory:',
          },
        },
      },
      seed: {
        create: {
          description: 'Create a new seed',
          options: {
            dir: 'Seeds directory',
            factory: 'Factory to be used in the seed',
          },
          messages: {
            success: '✅ Seed {{name}} created successfully!',
            creating: '🌱 Creating seed {{name}}...',
            directoryCreated: '📁 Directory created: {{dir}}',
            factoryNotFound:
              "⚠️ Factory '{{factory}}' not found, but seed will be created anyway",
            nameRecommendation:
              '⚠️ Recommendation: Seed name should end with "Seed"',
            nextSteps: '📋 Next steps:',
            editSeed: '1. Edit the seed to define data to insert',
            runSeed: '2. Run: npm run seed:run',
            runSpecificSeed:
              '3. Or run only this seed: npm run seed:run -- --seed {{name}}',
            error: '❌ Error creating seed:',
          },
        },
        run: {
          description: 'Run all seeds',
          options: {
            config: 'Path to configuration file',
            datasource: 'Path to custom DataSource configuration file',
            seed: 'Run a specific seed',
          },
          messages: {
            success: '✅ All seeds executed successfully!',
            noSeeds: 'ℹ️ No seeds found',
            connecting: '🔌 Establishing database connection...',
            connectionSuccess: '✅ Database connection established',
            executing: '🌱 Executing seeds...',
            executingSeed: '🌱 Executing seed: {{name}}',
          },
        },
      },
      db: {
        setup: {
          description: 'Run migrations and seeds in sequence',
          options: {
            config: 'Path to configuration file',
            datasource: 'Path to custom DataSource configuration file',
          },
          messages: {
            start: '🚀 Setting up database...',
            success: '✅ Database setup completed successfully!',
          },
        },
      },
    },
    errors: {
      datasourceNotFound: '❌ DataSource file not found: {{path}}',
      datasourceLoadFailed: '❌ Failed to load DataSource configuration',
      configNotFound: '❌ Configuration file not found: {{path}}',
      connectionFailed: '❌ Database connection failed',
      migrationFailed: '❌ Migration execution failed',
      seedFailed: '❌ Seed execution failed',
    },
  },
  'pt-BR': {
    cli: {
      name: 'typeorm-extender',
      description: 'CLI para TypeORM com funcionalidades estendidas',
      version: packageVersion,
      options: {
        language: 'Define o idioma (en, pt-BR, es)',
        confirmSet: 'Idioma alterado para',
      },
    },
    commands: {
      init: {
        description:
          'Inicializa a estrutura do projeto com configurações padrão',
        options: {
          database: 'Tipo de banco de dados (postgres, mysql, sqlite)',
          datasource:
            'Caminho para arquivo de configuração do DataSource customizado',
        },
        messages: {
          success: '✅ Projeto inicializado com sucesso!',
          usingCustomDatasource: '🔧 Usando DataSource customizado: {{path}}',
          creatingStructure: '📁 Criando estrutura do projeto...',
          creatingConfig: '⚙️ Criando arquivos de configuração...',
          initializing: '🚀 Inicializando projeto TypeORM Extender...',
          configCreated: '⚙️ Criado arquivo de configuração: ormconfig.json',
          datasourceCreated: '⚙️ Criado DataSource: src/config/data-source.ts',
          entityCreated: '📄 Criada entidade exemplo: src/entities/User.ts',
          factoryBaseCreated:
            '🏭 Criada base para factories: src/factories/base.factory.ts',
          seedBaseCreated: '🌱 Criada base para seeds: src/seeds/base.seed.ts',
          nextSteps: '\n📋 Próximos passos:',
          configureEnv: '1. Configure suas variáveis de ambiente',
          createMigration:
            '2. Execute: npm run migration:create CreateUsersTable',
          runMigration: '3. Execute: npm run migration:run',
          createFactory: '4. Execute: npm run factory:create UserFactory',
          createSeed: '5. Execute: npm run seed:create UserSeed',
          error: '❌ Erro ao inicializar projeto:',
        },
      },
      config: {
        description: 'Gerencia configurações do CLI',
        options: {
          language: 'Define o idioma (en, pt-BR, es)s',
          show: 'Mostra a configuração atual',
          list: 'Lista idiomas suportados',
          reset: 'Reseta para configuração padrão',
        },
        messages: {
          currentConfig: '\n📋 Configuração Atual:',
          separator: '─'.repeat(40),
          directories: 'Diretórios:',
          supportedLanguages: '\n🌍 Idiomas Suportados:',
          languageSeparator: '─'.repeat(30),
          usage: '\n💡 Uso:',
          usageConfig: '  typeorm-extender config --language <idioma>',
          usageGlobal: '  typeorm-extender --language <idioma> <comando>',
          usageEnv: '  export TYPEORM_EXTENDER_LANG=<idioma>',
          unsupportedLanguage: '❌ Idioma não suportado: {{language}}',
          supportedList: 'Idiomas suportados: {{languages}}',
          languageSet:
            '✅ Idioma definido para: {{language}} ({{languageName}})',
          configSaved: '📁 Configuração salva em: {{path}}',
          configReset: '✅ Configuração resetada para padrão',
          configFileCreated:
            '📁 Arquivo de configuração criado: typeorm-extender.config.json',
          configManagement: '\n⚙️  Gerenciamento de Configuração',
          availableOptions: 'Opções disponíveis:',
          showOption: '  --show      Mostra configuração atual',
          listOption: '  --list      Lista idiomas suportados',
          languageOption: '  --language  Define idioma (en, pt-BR, es)',
          resetOption: '  --reset     Reseta para configuração padrão',
          examples: '\nExemplos:',
          exampleShow: '  typeorm-extender config --show',
          exampleLanguage: '  typeorm-extender config --language pt-BR',
          exampleList: '  typeorm-extender config --list',
          error: '❌ Erro ao gerenciar configuração:',
        },
      },
      migration: {
        create: {
          description: 'Cria uma nova migration',
          options: {
            dir: 'Diretório das migrations',
          },
          messages: {
            success: '✅ Migration {{name}} criada com sucesso!',
            creating: '📝 Criando migration {{name}}...',
            directoryCreated: '📁 Criado diretório: {{dir}}',
            nextSteps: '📋 Próximos passos:',
            editMigration:
              '1. Edite a migration para definir as mudanças no banco',
            runMigration: '2. Execute: npm run migration:run',
            error: '❌ Erro ao criar migration:',
          },
        },
        run: {
          description: 'Executa todas as migrations pendentes',
          options: {
            config: 'Caminho para o arquivo de configuração',
            datasource:
              'Caminho para arquivo de configuração do DataSource customizado',
          },
          messages: {
            success: '✅ Todas as migrations executadas com sucesso!',
            noPending: 'ℹ️ Nenhuma migration pendente encontrada',
            connecting: '🔌 Estabelecendo conexão com banco de dados...',
            connectionSuccess: '✅ Conexão com banco de dados estabelecida',
            executing: '🔄 Executando migrations...',
            executed: '✅ Executadas {{count}} migration(s)',
            noExecuted:
              'ℹ️ Nenhuma migration foi executada - banco já está atualizado',
            error: '❌ Erro ao executar migrations:',
            errorDetails: 'Detalhes do erro:',
            suggestions: '\n💡 Sugestões:',
            checkDatabase: '- Verifique se o banco de dados está rodando',
            checkConnection: '- Confirme as configurações de conexão',
            checkCredentials: '- Verifique as credenciais do banco de dados',
            checkEnvironment:
              '- Confirme usuário e senha nas variáveis de ambiente',
            createDatabase: '- Crie o banco de dados manualmente',
            checkDatabaseName: '- Verifique o nome do banco nas configurações',
            connectionClosed: '🔌 Conexão com banco de dados fechada',
          },
        },
        revert: {
          description: 'Reverte a última migration executada',
          options: {
            config: 'Caminho para o arquivo de configuração',
            datasource:
              'Caminho para arquivo de configuração do DataSource customizado',
          },
          messages: {
            executing: '⏪ Revertendo migrations...',
            connectionSuccess: '✅ Conexão com banco de dados estabelecida',
            error: '❌ Erro ao reverter migrations:',
            connectionClosed: '🔌 Conexão com banco de dados fechada',
          },
        },
        status: {
          description: 'Verifica o status das migrations',
          options: {
            config: 'Caminho para o arquivo de configuração',
            datasource:
              'Caminho para arquivo de configuração do DataSource customizado',
          },
          messages: {
            checking: '📊 Verificando status das migrations...',
            statusTitle: '\n📋 Status das Migrations:',
            separator: '========================',
            executedTitle: '\n✅ Migrations Executadas:',
            noExecuted: '\nℹ️ Nenhuma migration executada ainda',
            pendingExists: '\n⏳ Existem migrations pendentes',
            runCommand: 'Execute: npm run migration:run',
            allUpdated: '\n✅ Todas as migrations estão atualizadas',
            error: '❌ Erro ao verificar status das migrations:',
          },
        },
      },
      factory: {
        description: 'Gerencia factories para geração de dados de teste',
        options: {
          name: 'Nome da factory a ser criada',
          entity: 'Nome da entidade associada à factory',
          count: 'Número de registros a serem criados',
          save: 'Salva os dados no banco de dados',
        },
        messages: {
          creating: '🏭 Criando factory: {{name}}...',
          success: '✅ Factory {{name}} criada com sucesso!',
          generating: '🔄 Gerando {{count}} registro(s) usando {{factory}}...',
          generated: '✅ {{count}} registro(s) gerado(s) com sucesso!',
          saved: '💾 Dados salvos no banco de dados',
          notSaved: '📝 Dados gerados (não salvos no banco)',
          error: '❌ Erro ao processar factory:',
          noFactoriesFound:
            '❌ Nenhuma factory encontrada no diretório: {{directory}}',
          factoryNotFound: '❌ Factory não encontrada: {{name}}',
          factoryExists: '❌ Factory já existe: {{path}}',
          invalidName:
            '❌ Nome da factory inválido. Use PascalCase (ex: UserFactory)',
          creatingFile: '📄 Criando arquivo: {{path}}',
          loadingFactories:
            '🔍 Carregando factories do diretório: {{directory}}',
          availableFactories: '📋 Factories disponíveis:',
          noFactoriesAvailable:
            '❌ Nenhuma factory disponível. Crie uma primeiro com: factory:create <nome>',
          suggestions: '\n💡 Sugestões:',
          checkPath: '• Verifique se o caminho da factory está correto',
          checkSyntax: '• Verifique a sintaxe do arquivo da factory',
          checkExport:
            '• Certifique-se de que a factory está sendo exportada corretamente',
        },
        create: {
          description: 'Cria uma nova factory',
          options: {
            dir: 'Diretório das factories',
            entity: 'Nome da entidade relacionada',
          },
          messages: {
            success: '✅ Factory {{name}} criada com sucesso!',
            creating: '🏭 Criando factory {{name}}...',
            directoryCreated: '📁 Criado diretório: {{dir}}',
            nameRecommendation:
              '⚠️ Recomendação: Nome da factory deve terminar com "Factory"',
            nextSteps: '📋 Próximos passos:',
            editFactory: '1. Edite a factory para definir os dados padrão',
            useFactory: '2. Use a factory em seus seeds ou testes',
            exampleUsage:
              '3. Exemplo: const user = await new {{className}}().create();',
            error: '❌ Erro ao criar factory:',
          },
        },
      },
      seed: {
        create: {
          description: 'Cria um novo seed',
          options: {
            dir: 'Diretório dos seeds',
            factory: 'Factory a ser utilizada no seed',
          },
          messages: {
            success: '✅ Seed {{name}} criado com sucesso!',
            creating: '🌱 Criando seed {{name}}...',
            directoryCreated: '📁 Criado diretório: {{dir}}',
            factoryNotFound:
              "⚠️ Factory '{{factory}}' não encontrada, mas o seed será criado mesmo assim",
            nameRecommendation:
              '⚠️ Recomendação: Nome do seed deve terminar com "Seed"',
            nextSteps: '📋 Próximos passos:',
            editSeed: '1. Edite o seed para definir os dados a serem inseridos',
            runSeed: '2. Execute: npm run seed:run',
            runSpecificSeed:
              '3. Ou execute apenas este seed: npm run seed:run -- --seed {{name}}',
            error: '❌ Erro ao criar seed:',
            executingClass: '🌱 Executando {{className}}...',
            classSuccess: '✅ {{className}} executado com sucesso',
            classError: '❌ Erro ao executar {{className}}:',
            dataCleared: '🧹 Dados limpos',
            dataExists: 'ℹ️ Dados já existem, pulando seed',
            notInProduction: '⚠️ Seed não executado em produção',
          },
        },
        run: {
          description: 'Executa todos os seeds',
          options: {
            config: 'Caminho para o arquivo de configuração',
            datasource:
              'Caminho para arquivo de configuração do DataSource customizado',
            seed: 'Executa um seed específico',
          },
          messages: {
            success: '✅ Todos os seeds executados com sucesso!',
            noSeeds: 'ℹ️ Nenhum seed encontrado',
            connecting: '🔌 Estabelecendo conexão com banco de dados...',
            connectionSuccess: '✅ Conexão com banco de dados estabelecida',
            executing: '🌱 Executando seeds...',
            executingSeed: '🌱 Executando seed: {{name}}',
            error: '❌ Erro ao executar seeds:',
            errorDetails: 'Detalhes do erro:',
            suggestions: '\n💡 Sugestões:',
            checkDatabase: '- Verifique se o banco de dados está rodando',
            checkConnection: '- Confirme as configurações de conexão',
            checkCredentials: '- Verifique as credenciais do banco de dados',
            checkEnvironment:
              '- Confirme usuário e senha nas variáveis de ambiente',
            checkFiles: '- Verifique se os arquivos de seed existem',
            checkImports: '- Confirme se as importações estão corretas',
            connectionClosed: '🔌 Conexão com banco de dados fechada',
            listing: '📋 Listando seeds disponíveis...',
            listEmpty: 'ℹ️ Nenhum seed encontrado',
            listUsage: '\n💡 Para executar um seed específico:',
            listCommand: 'npm run seed:run -- --seed <nome-do-seed>',
            listError: '❌ Erro ao listar seeds:',
            devMode: '🔧 Executando seeds em modo desenvolvimento...',
          },
        },
      },
      db: {
        description: 'Comandos relacionados ao banco de dados',
        setup: {
          description:
            'Configura o banco de dados executando migrações e seeds',
          options: {
            config: 'Caminho para o arquivo de configuração',
            datasource:
              'Caminho para arquivo de configuração do DataSource customizado',
            reset: 'Reseta o banco antes de configurar',
            seedsOnly: 'Executa apenas os seeds',
            migrationsOnly: 'Executa apenas as migrações',
          },
          messages: {
            start: '🚀 Configurando banco de dados...',
            success: '✅ Banco de dados configurado com sucesso!',
            starting: '🚀 Iniciando configuração do banco de dados...',
            resetting: '🔄 Resetando banco de dados...',
            runningMigrations: '📊 Executando migrações...',
            runningSeeds: '🌱 Executando seeds...',
            error: '❌ Erro ao configurar banco de dados:',
            resetComplete: '✅ Reset do banco de dados concluído',
            migrationsComplete: '✅ Migrações executadas com sucesso',
            seedsComplete: '✅ Seeds executados com sucesso',
            skippingMigrations:
              '⏭️ Pulando migrações (--seeds-only especificado)',
            skippingSeeds: '⏭️ Pulando seeds (--migrations-only especificado)',
            noMigrationsFound: '⚠️ Nenhuma migração encontrada',
            noSeedsFound: '⚠️ Nenhum seed encontrado',
            setupComplete: '🎉 Configuração do banco de dados concluída!',
            suggestions: '\n💡 Sugestões:',
            checkConnection: '• Verifique a conexão com o banco de dados',
            checkMigrations:
              '• Certifique-se de que as migrações estão corretas',
            checkSeeds:
              '• Verifique se os seeds estão funcionando corretamente',
          },
        },
      },
    },
    errors: {
      datasourceNotFound: '❌ Arquivo DataSource não encontrado: {{path}}',
      datasourceLoadFailed: '❌ Falha ao carregar configuração do DataSource',
      configNotFound: '❌ Arquivo de configuração não encontrado: {{path}}',
      connectionFailed: '❌ Falha na conexão com banco de dados',
      migrationFailed: '❌ Falha na execução da migration',
      seedFailed: '❌ Falha na execução do seed',
    },
  },
  es: {
    cli: {
      name: 'typeorm-extender',
      description: 'CLI para TypeORM con funcionalidades extendidas',
      version: packageVersion,
      options: {
        language: 'Define el idioma (en, pt-BR, es)',
        confirmSet: 'Idioma configurado en',
      },
    },
    commands: {
      init: {
        description:
          'Inicializa la estructura del proyecto con configuraciones por defecto',
        options: {
          database: 'Tipo de base de datos (postgres, mysql, sqlite)',
          datasource:
            'Ruta al archivo de configuración del DataSource personalizado',
        },
        messages: {
          success: '✅ ¡Proyecto inicializado con éxito!',
          usingCustomDatasource: '🔧 Usando DataSource personalizado: {{path}}',
          creatingStructure: '📁 Creando estructura del proyecto...',
          creatingConfig: '⚙️ Creando archivos de configuración...',
          initializing: '🚀 Inicializando proyecto TypeORM Extender...',
          configCreated: '⚙️ Creado archivo de configuración: ormconfig.json',
          datasourceCreated: '⚙️ Creado DataSource: src/config/data-source.ts',
          entityCreated: '📄 Creada entidad de ejemplo: src/entities/User.ts',
          factoryBaseCreated:
            '🏭 Creada base para factories: src/factories/base.factory.ts',
          seedBaseCreated: '🌱 Creada base para seeds: src/seeds/base.seed.ts',
          nextSteps: '\n📋 Próximos pasos:',
          configureEnv: '1. Configure sus variables de entorno',
          createMigration:
            '2. Ejecute: npm run migration:create CreateUsersTable',
          runMigration: '3. Ejecute: npm run migration:run',
          createFactory: '4. Ejecute: npm run factory:create UserFactory',
          createSeed: '5. Ejecute: npm run seed:create UserSeed',
          error: '❌ Error al inicializar proyecto:',
        },
      },
      config: {
        description: 'Gestiona configuraciones del CLI',
        options: {
          language: 'Define el idioma (en, pt-BR, es)',
          show: 'Muestra la configuración actual',
          list: 'Lista idiomas soportados',
          reset: 'Resetea a configuración por defecto',
        },
        messages: {
          currentConfig: '\n📋 Configuración Actual:',
          separator: '─'.repeat(40),
          directories: 'Directorios:',
          supportedLanguages: '\n🌍 Idiomas Soportados:',
          languageSeparator: '─'.repeat(30),
          usage: '\n💡 Uso:',
          usageConfig: '  typeorm-extender config --language <idioma>',
          usageGlobal: '  typeorm-extender --language <idioma> <comando>',
          usageEnv: '  export TYPEORM_EXTENDER_LANG=<idioma>',
          unsupportedLanguage: '❌ Idioma no soportado: {{language}}',
          supportedList: 'Idiomas soportados: {{languages}}',
          languageSet:
            '✅ Idioma definido para: {{language}} ({{languageName}})',
          configSaved: '📁 Configuración guardada en: {{path}}',
          configReset: '✅ Configuración reseteada a por defecto',
          configFileCreated:
            '📁 Archivo de configuración creado: typeorm-extender.config.json',
          configManagement: '\n⚙️  Gestión de Configuración',
          availableOptions: 'Opciones disponibles:',
          showOption: '  --show      Muestra configuración actual',
          listOption: '  --list      Lista idiomas soportados',
          languageOption: '  --language  Define idioma (en, pt-BR, es)',
          resetOption: '  --reset     Resetea a configuración por defecto',
          examples: '\nEjemplos:',
          exampleShow: '  typeorm-extender config --show',
          exampleLanguage: '  typeorm-extender config --language es',
          exampleList: '  typeorm-extender config --list',
          error: '❌ Error al gestionar configuración:',
        },
      },
      migration: {
        create: {
          description: 'Crear una nueva migración',
          options: {
            dir: 'Directorio de migraciones',
          },
          messages: {
            success: '✅ ¡Migración {{name}} creada exitosamente!',
            creating: '📝 Creando migración {{name}}...',
            directoryCreated: '📁 Directorio creado: {{dir}}',
            nextSteps: '📋 Próximos pasos:',
            editMigration:
              '1. Edita la migración para definir los cambios en la base de datos',
            runMigration: '2. Ejecuta: npm run migration:run',
            error: '❌ Error al crear migración:',
          },
        },
        run: {
          description: 'Ejecutar todas las migraciones pendientes',
          options: {
            config: 'Ruta al archivo de configuración',
            datasource:
              'Ruta al archivo de configuración del DataSource personalizado',
          },
          messages: {
            success: '✅ ¡Todas las migraciones ejecutadas exitosamente!',
            noPending: 'ℹ️ No se encontraron migraciones pendientes',
            connecting: '🔌 Estableciendo conexión con la base de datos...',
            connectionSuccess: '✅ Conexión con la base de datos establecida',
            executing: '⚡ Ejecutando migraciones...',
            executed: '✅ Ejecutadas {{count}} migración(es)',
          },
        },
      },
      factory: {
        description: 'Gestiona factories para generación de datos de prueba',
        options: {
          name: 'Nombre de la factory a crear',
          entity: 'Nombre de la entidad asociada a la factory',
          count: 'Número de registros a crear',
          save: 'Guarda los datos en la base de datos',
        },
        messages: {
          creating: '🏭 Creando factory: {{name}}...',
          success: '✅ ¡Factory {{name}} creada exitosamente!',
          generating:
            '🔄 Generando {{count}} registro(s) usando {{factory}}...',
          generated: '✅ ¡{{count}} registro(s) generado(s) exitosamente!',
          saved: '💾 Datos guardados en la base de datos',
          notSaved: '📝 Datos generados (no guardados en la base)',
          error: '❌ Error al procesar factory:',
          noFactoriesFound:
            '❌ Ninguna factory encontrada en el directorio: {{directory}}',
          factoryNotFound: '❌ Factory no encontrada: {{name}}',
          factoryExists: '❌ Factory ya existe: {{path}}',
          invalidName:
            '❌ Nombre de factory inválido. Use PascalCase (ej: UserFactory)',
          creatingFile: '📄 Creando archivo: {{path}}',
          loadingFactories:
            '🔍 Cargando factories del directorio: {{directory}}',
          availableFactories: '📋 Factories disponibles:',
          noFactoriesAvailable:
            '❌ Ninguna factory disponible. Cree una primero con: factory:create <nombre>',
          suggestions: '\n💡 Sugerencias:',
          checkPath: '• Verifique que la ruta de la factory sea correcta',
          checkSyntax: '• Verifique la sintaxis del archivo de la factory',
          checkExport:
            '• Asegúrese de que la factory esté siendo exportada correctamente',
        },
        create: {
          description: 'Crear una nueva factory',
          options: {
            dir: 'Directorio de factories',
            entity: 'Nombre de la entidad relacionada',
          },
          messages: {
            success: '✅ ¡Factory {{name}} creada exitosamente!',
            creating: '🏭 Creando factory {{name}}...',
            directoryCreated: '📁 Directorio creado: {{dir}}',
            nameRecommendation:
              '⚠️ Recomendación: El nombre de la factory debe terminar con "Factory"',
            nextSteps: '📋 Próximos pasos:',
            editFactory:
              '1. Edita la factory para definir los datos predeterminados',
            useFactory: '2. Usa la factory en tus seeds o pruebas',
            exampleUsage:
              '3. Ejemplo: const user = await new {{className}}().create();',
            error: '❌ Error al crear factory:',
          },
        },
      },
      seed: {
        create: {
          description: 'Crear un nuevo seed',
          options: {
            dir: 'Directorio de seeds',
            factory: 'Factory a utilizar en el seed',
          },
          messages: {
            success: '✅ ¡Seed {{name}} creado exitosamente!',
            creating: '🌱 Creando seed {{name}}...',
            directoryCreated: '📁 Directorio creado: {{dir}}',
            factoryNotFound:
              "⚠️ Factory '{{factory}}' no encontrada, pero el seed será creado de todos modos",
            nameRecommendation:
              '⚠️ Recomendación: El nombre del seed debe terminar con "Seed"',
            nextSteps: '📋 Próximos pasos:',
            editSeed: '1. Edita el seed para definir los datos a insertar',
            runSeed: '2. Ejecuta: npm run seed:run',
            runSpecificSeed:
              '3. O ejecuta solo este seed: npm run seed:run -- --seed {{name}}',
            error: '❌ Error al crear seed:',
          },
        },
        run: {
          description: 'Ejecutar todos los seeds',
          options: {
            config: 'Ruta al archivo de configuración',
            datasource:
              'Ruta al archivo de configuración del DataSource personalizado',
            seed: 'Ejecutar un seed específico',
          },
          messages: {
            success: '✅ ¡Todos los seeds ejecutados exitosamente!',
            noSeeds: 'ℹ️ No se encontraron seeds',
            connecting: '🔌 Estableciendo conexión con la base de datos...',
            connectionSuccess: '✅ Conexión con la base de datos establecida',
            executing: '🌱 Ejecutando seeds...',
            executingSeed: '🌱 Ejecutando seed: {{name}}',
          },
        },
      },
      db: {
        description: 'Comandos relacionados con la base de datos',
        setup: {
          description:
            'Configura la base de datos ejecutando migraciones y seeds',
          options: {
            config: 'Ruta al archivo de configuración',
            datasource:
              'Ruta al archivo de configuración del DataSource personalizado',
            reset: 'Resetea la base antes de configurar',
            seedsOnly: 'Ejecuta solo los seeds',
            migrationsOnly: 'Ejecuta solo las migraciones',
          },
          messages: {
            start: '🚀 Configurando base de datos...',
            success: '✅ ¡Base de datos configurada exitosamente!',
            starting: '🚀 Iniciando configuración de la base de datos...',
            resetting: '🔄 Reseteando base de datos...',
            runningMigrations: '📊 Ejecutando migraciones...',
            runningSeeds: '🌱 Ejecutando seeds...',
            error: '❌ Error al configurar base de datos:',
            resetComplete: '✅ Reset de la base de datos completado',
            migrationsComplete: '✅ Migraciones ejecutadas con éxito',
            seedsComplete: '✅ Seeds ejecutados con éxito',
            skippingMigrations:
              '⏭️ Saltando migraciones (--seeds-only especificado)',
            skippingSeeds: '⏭️ Saltando seeds (--migrations-only especificado)',
            noMigrationsFound: '⚠️ Ninguna migración encontrada',
            noSeedsFound: '⚠️ Ningún seed encontrado',
            setupComplete: '🎉 ¡Configuración de la base de datos completada!',
            suggestions: '\n💡 Sugerencias:',
            checkConnection: '• Verifique la conexión con la base de datos',
            checkMigrations:
              '• Asegúrese de que las migraciones sean correctas',
            checkSeeds: '• Verifique que los seeds funcionen correctamente',
          },
        },
      },
    },
    errors: {
      datasourceNotFound: '❌ Archivo DataSource no encontrado: {{path}}',
      datasourceLoadFailed: '❌ Error al cargar configuración del DataSource',
      configNotFound: '❌ Archivo de configuración no encontrado: {{path}}',
      connectionFailed: '❌ Error en la conexión con la base de datos',
      migrationFailed: '❌ Error en la ejecución de la migración',
      seedFailed: '❌ Error en la ejecución del seed',
    },
  },
};

class I18n {
  private currentLanguage: SupportedLanguage = 'en';
  private configFile: string | null = null;

  constructor() {
    this.detectLanguage();
  }

  private detectLanguage(): void {
    // Priority: CLI option > config file > environment variable > default (en)

    // 1. Check environment variable
    const envLang = process.env.TYPEORM_EXTENDER_LANG || process.env.LANG;
    if (envLang) {
      const lang = this.normalizeLanguage(envLang);
      if (this.isValidLanguage(lang)) {
        this.currentLanguage = lang;
      }
    }

    // 2. Check config file
    this.loadConfigFile();
  }

  private loadConfigFile(): void {
    const configPaths = [
      '.typeorm-extender.json',
      'typeorm-extender.config.json',
      join(process.cwd(), '.typeorm-extender.json'),
      join(process.cwd(), 'typeorm-extender.config.json'),
    ];

    for (const configPath of configPaths) {
      if (existsSync(configPath)) {
        try {
          const configContent = readFileSync(configPath, 'utf8');
          const config = JSON.parse(configContent);
          if (config.language && this.isValidLanguage(config.language)) {
            this.currentLanguage = config.language;
            this.configFile = configPath;
          }
          break;
        } catch (error) {
          // Ignore config file errors
        }
      }
    }
  }

  private normalizeLanguage(lang: string): string {
    const normalized = lang.toLowerCase();

    // Map common language codes
    const languageMap: { [key: string]: SupportedLanguage } = {
      en: 'en',
      en_us: 'en',
      'en-us': 'en',
      pt: 'pt-BR',
      pt_br: 'pt-BR',
      'pt-br': 'pt-BR',
      portuguese: 'pt-BR',
      es: 'es',
      es_es: 'es',
      'es-es': 'es',
      spanish: 'es',
      español: 'es',
    };

    return languageMap[normalized] || normalized;
  }

  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return ['en', 'pt-BR', 'es'].includes(lang);
  }

  public setLanguage(language: SupportedLanguage): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguage = language;
    }
  }

  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public t(
    key: string,
    variables?: { [key: string]: string | number }
  ): string {
    const keys = key.split('.');
    let message: any = messages[this.currentLanguage];

    for (const k of keys) {
      if (message && typeof message === 'object' && k in message) {
        message = message[k];
      } else {
        // Fallback to English if key not found
        message = messages.en;
        for (const fallbackKey of keys) {
          if (
            message &&
            typeof message === 'object' &&
            fallbackKey in message
          ) {
            message = message[fallbackKey];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }

    if (typeof message !== 'string') {
      return key;
    }

    // Replace variables
    if (variables) {
      return message.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return variables[varName]?.toString() || match;
      });
    }

    return message;
  }

  public getSupportedLanguages(): SupportedLanguage[] {
    return Object.keys(messages) as SupportedLanguage[];
    // return ['en', 'pt-BR', 'es'];
  }

  public initializeFromConfig(configLanguage?: SupportedLanguage): void {
    if (configLanguage && this.isValidLanguage(configLanguage)) {
      // Only set from config if no environment variable is set
      const envLang = process.env.TYPEORM_EXTENDER_LANG || process.env.LANG;
      if (!envLang) {
        this.currentLanguage = configLanguage;
      }
    }
  }
}

// Export singleton instance
export const i18n = new I18n();
export default i18n;
