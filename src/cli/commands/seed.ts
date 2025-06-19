import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { i18n } from '../i18n';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);

interface SeedOptions {
  dir: string;
  factory?: string;
}

export async function createSeed(name: string, options: SeedOptions): Promise<void> {
  console.log(i18n.t('seed.create.messages.creating', { name }));
  
  try {
    // Garantir que o diretório existe
    if (!(await exists(options.dir))) {
      await mkdir(options.dir, { recursive: true });
      console.log(i18n.t('seed.create.messages.directoryCreated', { dir: options.dir }));
    }

    // Verificar se a factory existe
    let factoryPath: string | null = null;
    let factoryName = options.factory;
    
    if (factoryName) {
      factoryPath = await findFactoryFile(factoryName);
      if (!factoryPath) {
        console.log(i18n.t('seed.create.messages.factoryNotFound', { factory: factoryName }));
      }
    }

    const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    if (!className.endsWith('Seed')) {
      console.log(i18n.t('seed.create.messages.nameRecommendation'));
    }

    const fileName = `${name}.seed.ts`;
    const filePath = path.join(options.dir, fileName);

    // Gerar conteúdo do seed
    const seedContent = generateSeedTemplate(className, factoryName, factoryPath);
    
    await writeFile(filePath, seedContent);
    console.log(i18n.t('seed.create.messages.success', { name: filePath }));
    
    console.log('\n' + i18n.t('seed.create.messages.nextSteps'));
    console.log(i18n.t('seed.create.messages.editSeed'));
    console.log(i18n.t('seed.create.messages.runSeed'));
    console.log(i18n.t('seed.create.messages.runSpecificSeed', { name }));
    
  } catch (error) {
    console.error(i18n.t('seed.create.messages.error'), error);
    process.exit(1);
  }
}

async function findFactoryFile(factoryName: string): Promise<string | null> {
  const possiblePaths = [
    'src/factories',
    'src/factory',
    'factories',
    'factory'
  ];

  for (const basePath of possiblePaths) {
    if (await exists(basePath)) {
      try {
        const files = await readdir(basePath);
        const factoryFile = files.find(file => 
          file.toLowerCase().includes(factoryName.toLowerCase()) && 
          file.endsWith('.factory.ts')
        );
        
        if (factoryFile) {
          return path.join(basePath, factoryFile);
        }
      } catch (error) {
        // Continuar procurando
      }
    }
  }

  return null;
}

function generateSeedTemplate(className: string, factoryName?: string, factoryPath?: string | null): string {
  const factoryImport = factoryName && factoryPath
    ? `import { ${factoryName} } from '${getRelativeImportPath(factoryPath)}';
`
    : factoryName
    ? `// import { ${factoryName} } from '../factories/${factoryName}.factory';
`
    : '';

  const factoryUsage = factoryName
    ? `
    // Usando factory para criar dados
    const factory = new ${factoryName}();
    
    // Criar registros individuais
    await factory.create({ /* dados específicos */ });
    
    // Criar múltiplos registros
    await factory.createMany(10);
    
    // Criar com dados específicos
    await factory.create({
      // name: 'Admin User',
      // email: 'admin@example.com'
    });`
    : `
    // Exemplo de inserção direta no banco
    // const repository = this.dataSource.getRepository(EntityName);
    // 
    // await repository.save([
    //   {
    //     name: 'Exemplo 1',
    //     email: 'exemplo1@test.com'
    //   },
    //   {
    //     name: 'Exemplo 2', 
    //     email: 'exemplo2@test.com'
    //   }
    // ]);`;

  return `${factoryImport}import { BaseSeed } from './base.seed';
// import { Repository } from 'typeorm';
// import { EntityName } from '../entities/EntityName';

export class ${className} extends BaseSeed {
  async run(): Promise<void> {
    console.log('🌱 Executando ${className}...');
    
    try {
      await this.ensureConnection();
      ${factoryUsage}
      
      console.log('✅ ${className} executado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao executar ${className}:', error);
      throw error;
    }
  }

  // Método auxiliar para verificar se os dados já existem
  private async dataExists(): Promise<boolean> {
    // const repository = this.dataSource.getRepository(EntityName);
    // const count = await repository.count();
    // return count > 0;
    return false;
  }

  // Método auxiliar para limpar dados antes de inserir
  private async clearData(): Promise<void> {
    // const repository = this.dataSource.getRepository(EntityName);
    // await repository.clear();
    console.log('🧹 Dados limpos');
  }

  // Método auxiliar para inserção condicional
  private async runConditionally(): Promise<void> {
    if (await this.dataExists()) {
      console.log('ℹ️ Dados já existem, pulando seed');
      return;
    }
    
    // Executar inserção aqui
  }
}

// Exemplo de uso avançado:
/*
export class \${className} extends BaseSeed {
  async run(): Promise<void> {
    await this.ensureConnection();
    
    // Verificar se deve executar
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️ Seed não executado em produção');
      return;
    }
    
    // Limpar dados existentes se necessário
    if (process.env.CLEAR_DATA === 'true') {
      await this.clearData();
    }
    
    // Executar apenas se não existirem dados
    await this.runConditionally();
  }
}
*/
`;
}

function getRelativeImportPath(factoryPath: string): string {
  // Converter caminho absoluto para relativo
  const relativePath = path.relative('src/seeds', factoryPath);
  return relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
}