import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { i18n } from '../i18n';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);

interface FactoryOptions {
  dir: string;
  entity?: string;
}

export async function createFactory(name: string, options: FactoryOptions): Promise<void> {
  console.log(i18n.t('factory.create.messages.creating', { name }));
  
  try {
    // Garantir que o diretório existe
    if (!(await exists(options.dir))) {
      await mkdir(options.dir, { recursive: true });
      console.log(i18n.t('factory.create.messages.directoryCreated', { dir: options.dir }));
    }

    // Determinar nome da entidade
    let entityName = options.entity;
    if (!entityName) {
      // Tentar inferir da factory name
      entityName = name.replace(/Factory$/i, '');
    }

    // Verificar se a entidade existe
    const entityPath = await findEntityFile(entityName);
    
    const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    if (!className.endsWith('Factory')) {
      console.log(i18n.t('factory.create.messages.nameRecommendation'));
    }

    const fileName = `${name}.factory.ts`;
    const filePath = path.join(options.dir, fileName);

    // Gerar conteúdo da factory
    const factoryContent = generateFactoryTemplate(className, entityName, entityPath);
    
    await writeFile(filePath, factoryContent);
    console.log(i18n.t('factory.create.messages.success', { name: filePath }));
    
    console.log('\n' + i18n.t('factory.create.messages.nextSteps'));
    console.log(i18n.t('factory.create.messages.editFactory'));
    console.log(i18n.t('factory.create.messages.useFactory'));
    console.log(i18n.t('factory.create.messages.exampleUsage', { className }));
    
  } catch (error) {
    console.error(i18n.t('factory.create.messages.error'), error);
    process.exit(1);
  }
}

async function findEntityFile(entityName: string): Promise<string | null> {
  const possiblePaths = [
    'src/entities',
    'src/entity',
    'entities',
    'entity'
  ];

  for (const basePath of possiblePaths) {
    if (await exists(basePath)) {
      try {
        const files = await readdir(basePath);
        const entityFile = files.find(file => 
          file.toLowerCase().includes(entityName.toLowerCase()) && 
          file.endsWith('.ts')
        );
        
        if (entityFile) {
          return path.join(basePath, entityFile);
        }
      } catch (error) {
        // Continuar procurando
      }
    }
  }

  return null;
}

function generateFactoryTemplate(className: string, entityName: string, entityPath: string | null): string {
  const entityImport = entityPath 
    ? `import { ${entityName} } from '${getRelativeImportPath(entityPath)}';
`
    : `// import { ${entityName} } from '../entities/${entityName}';
`;

  return `${entityImport}import { BaseFactory } from './base.factory';
import { faker } from '@faker-js/faker';

export class ${className} extends BaseFactory<${entityName}> {
  protected getEntityClass(): new () => ${entityName} {
    return ${entityName};
  }

  make(overrides?: Partial<${entityName}>): ${entityName} {
    const entity = new ${entityName}();
    
    // Definir valores padrão usando Faker.js
    // Exemplo para uma entidade User:
    /*
    entity.name = faker.person.fullName();
    entity.email = faker.internet.email();
    entity.password = faker.internet.password();
    entity.isActive = faker.datatype.boolean();
    */
    
    // Aplicar overrides se fornecidos
    Object.assign(entity, overrides);
    
    return entity;
  }

  // Métodos auxiliares para cenários específicos
  makeActive(overrides?: Partial<${entityName}>): ${entityName} {
    return this.make({
      // isActive: true,
      ...overrides
    });
  }

  makeInactive(overrides?: Partial<${entityName}>): ${entityName} {
    return this.make({
      // isActive: false,
      ...overrides
    });
  }

  // Método para criar com dados específicos
  makeWithEmail(email: string, overrides?: Partial<${entityName}>): ${entityName} {
    return this.make({
      // email,
      ...overrides
    });
  }

  // Método para criar múltiplas instâncias com variações
  makeBatch(count: number, overrides?: Partial<${entityName}>): ${entityName}[] {
    const entities: ${entityName}[] = [];
    for (let i = 0; i < count; i++) {
      entities.push(this.make(overrides));
    }
    return entities;
  }
}

// Exemplo de uso:
/*
const factory = new ${className}();

// Criar uma instância em memória
const ${entityName.toLowerCase()} = factory.make();

// Criar e salvar no banco
const saved${entityName} = await factory.create();

// Criar múltiplas instâncias
const ${entityName.toLowerCase()}s = await factory.createMany(5);

// Criar com dados específicos
const specific${entityName} = await factory.create({
  name: 'Nome Específico',
  email: 'email@especifico.com'
});
*/
`;
}

function getRelativeImportPath(entityPath: string): string {
  // Converter caminho absoluto para relativo
  const relativePath = path.relative('src/factories', entityPath);
  return relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
}