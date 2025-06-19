import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { i18n } from '../i18n';

const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);

interface RunSeedsOptions {
  config?: string;
  seed?: string;
  datasource?: string;
}

export async function runSeeds(options: RunSeedsOptions = {}): Promise<void> {
  console.log(i18n.t('seed.run.messages.running'));
  
  let dataSource: DataSource | undefined;
  
  try {
    if (options.datasource) {
      // Usar DataSource customizado
      console.log(i18n.t('seed.run.messages.loadingDatasource', { path: options.datasource }));
      const { AppDataSource } = await import(path.resolve(options.datasource));
      dataSource = AppDataSource;
    } else {
      // Carregar configuração do arquivo
      const configPath = options.config || 'ormconfig.json';
      
      if (!fs.existsSync(configPath)) {
        throw new Error(`Arquivo de configuração não encontrado: ${configPath}`);
      }
      
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      dataSource = new DataSource(config);
    }

    if (!dataSource) {
      throw new Error('Falha ao carregar configuração do DataSource');
    }

    // Inicializar conexão
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log(i18n.t('seed.run.messages.connected'));
    }

    // Encontrar arquivos de seed
    const seedFiles = await findSeedFiles(options.seed);
    
    if (seedFiles.length === 0) {
      if (options.seed) {
        console.log(i18n.t('seed.run.messages.seedNotFound', { name: options.seed }));
      } else {
        console.log(i18n.t('seed.run.messages.noSeedsFound'));
      }
      return;
    }

    console.log(i18n.t('seed.run.messages.foundSeeds', { count: seedFiles.length }));

    // Executar seeds em ordem
    for (const seedFile of seedFiles) {
      await executeSeedFile(seedFile, dataSource!);
    }

    console.log(i18n.t('seed.run.messages.success'));

  } catch (error) {
    console.error(i18n.t('seed.run.messages.error'), error);
    
    if (error instanceof Error) {
      console.error(i18n.t('common.errors.details'), error.message);
      
      // Sugestões de solução baseadas no tipo de erro
      if (error.message.includes('ECONNREFUSED')) {
        console.log(i18n.t('seed.run.messages.suggestions'));
        console.log(i18n.t('seed.run.messages.checkDatabase'));
        console.log(i18n.t('seed.run.messages.checkConnection'));
      } else if (error.message.includes('Cannot find module')) {
        console.log(i18n.t('seed.run.messages.suggestions'));
        console.log(i18n.t('seed.run.messages.checkFiles'));
        console.log(i18n.t('seed.run.messages.checkImports'));
      }
    }
    
    process.exit(1);
  } finally {
    // Fechar conexão
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Conexão com banco de dados fechada');
    }
  }
}

async function findSeedFiles(specificSeed?: string): Promise<string[]> {
  const seedDirectories = [
    'src/seeds',
    'src/seed',
    'seeds',
    'seed'
  ];

  for (const dir of seedDirectories) {
    if (await exists(dir)) {
      try {
        const files = await readdir(dir);
        let seedFiles = files
          .filter(file => file.endsWith('.seed.ts') || file.endsWith('.seed.js'))
          .filter(file => file !== 'base.seed.ts' && file !== 'base.seed.js')
          .map(file => path.join(dir, file));

        // Filtrar por seed específico se fornecido
        if (specificSeed) {
          seedFiles = seedFiles.filter(file => {
            const fileName = path.basename(file, path.extname(file));
            return fileName.toLowerCase().includes(specificSeed.toLowerCase());
          });
        }

        // Ordenar arquivos para execução consistente
        seedFiles.sort();
        
        return seedFiles;
      } catch (error) {
        console.error(`Erro ao ler diretório ${dir}:`, error);
      }
    }
  }

  return [];
}

async function executeSeedFile(seedFile: string, dataSource: DataSource): Promise<void> {
  const fileName = path.basename(seedFile);
  console.log(`🌱 Executando: ${fileName}`);
  
  try {
    // Importar dinamicamente o arquivo de seed
    const seedModule = await import(path.resolve(seedFile));
    
    // Encontrar a classe de seed exportada
    const SeedClass = findSeedClass(seedModule);
    
    if (!SeedClass) {
      throw new Error(`Nenhuma classe de seed encontrada em ${fileName}`);
    }

    // Instanciar e executar o seed
    const seedInstance = new SeedClass();
    
    // Verificar se tem o método run
    if (typeof seedInstance.run !== 'function') {
      throw new Error(`Classe de seed em ${fileName} deve ter um método 'run'`);
    }

    // Injetar dataSource se necessário
    if (seedInstance.dataSource) {
      seedInstance.dataSource = dataSource;
    }

    // Executar o seed
    await seedInstance.run();
    
    console.log(`  ✅ ${fileName} executado com sucesso`);
    
  } catch (error) {
    console.error(`  ❌ Erro ao executar ${fileName}:`, error);
    throw error;
  }
}

function findSeedClass(seedModule: any): any {
  // Procurar por classe exportada que termine com 'Seed'
  for (const key in seedModule) {
    const exportedItem = seedModule[key];
    
    if (typeof exportedItem === 'function' && 
        exportedItem.prototype && 
        key.endsWith('Seed')) {
      return exportedItem;
    }
  }

  // Se não encontrar, tentar export default
  if (seedModule.default && typeof seedModule.default === 'function') {
    return seedModule.default;
  }

  return null;
}

// Função para listar seeds disponíveis
export async function listSeeds(): Promise<void> {
  console.log('📋 Listando seeds disponíveis...');
  
  try {
    const seedFiles = await findSeedFiles();
    
    if (seedFiles.length === 0) {
      console.log('ℹ️ Nenhum seed encontrado');
      return;
    }

    console.log(`\n📁 Encontrados ${seedFiles.length} seed(s):`);
    seedFiles.forEach((file, index) => {
      const fileName = path.basename(file, path.extname(file));
      console.log(`  ${index + 1}. ${fileName}`);
    });

    console.log('\n💡 Para executar um seed específico:');
    console.log('npm run seed:run -- --seed <nome-do-seed>');
    
  } catch (error) {
    console.error('❌ Erro ao listar seeds:', error);
  }
}

// Função para executar seeds em modo de desenvolvimento
export async function runSeedsDev(options: RunSeedsOptions = {}): Promise<void> {
  console.log('🔧 Executando seeds em modo desenvolvimento...');
  
  // Adicionar variáveis de ambiente para desenvolvimento
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.CLEAR_DATA = process.env.CLEAR_DATA || 'false';
  
  await runSeeds(options);
}