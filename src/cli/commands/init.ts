import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

interface InitOptions {
  database: string;
}

export async function initProject(options: InitOptions): Promise<void> {
  console.log('🚀 Inicializando projeto TypeORM Extender...');
  
  try {
    // Criar diretórios necessários
    const directories = [
      'src/entities',
      'src/migrations',
      'src/factories',
      'src/seeds',
      'src/config'
    ];

    for (const dir of directories) {
      if (!(await exists(dir))) {
        await mkdir(dir, { recursive: true });
        console.log(`📁 Criado diretório: ${dir}`);
      }
    }

    // Criar arquivo de configuração do TypeORM
    const ormConfig = generateOrmConfig(options.database);
    await writeFile('ormconfig.json', JSON.stringify(ormConfig, null, 2));
    console.log('⚙️ Criado arquivo de configuração: ormconfig.json');

    // Criar arquivo de configuração do DataSource
    const dataSourceConfig = generateDataSourceConfig(options.database);
    await writeFile('src/config/data-source.ts', dataSourceConfig);
    console.log('⚙️ Criado DataSource: src/config/data-source.ts');

    // Criar exemplo de entidade
    const exampleEntity = generateExampleEntity();
    await writeFile('src/entities/User.ts', exampleEntity);
    console.log('📄 Criada entidade exemplo: src/entities/User.ts');

    // Criar base para factories
    const factoryBase = generateFactoryBase();
    await writeFile('src/factories/base.factory.ts', factoryBase);
    console.log('🏭 Criada base para factories: src/factories/base.factory.ts');

    // Criar base para seeds
    const seedBase = generateSeedBase();
    await writeFile('src/seeds/base.seed.ts', seedBase);
    console.log('🌱 Criada base para seeds: src/seeds/base.seed.ts');

    console.log('\n✅ Projeto inicializado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Configure suas variáveis de ambiente');
    console.log('2. Execute: npm run migration:create CreateUsersTable');
    console.log('3. Execute: npm run migration:run');
    console.log('4. Execute: npm run factory:create UserFactory');
    console.log('5. Execute: npm run seed:create UserSeed');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar projeto:', error);
    process.exit(1);
  }
}

function generateOrmConfig(database: string): object {
  const baseConfig = {
    type: database,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations'
    },
    synchronize: false,
    logging: true
  };

  switch (database) {
    case 'postgres':
      return {
        ...baseConfig,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'myapp'
      };
    case 'mysql':
      return {
        ...baseConfig,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'myapp'
      };
    case 'sqlite':
      return {
        ...baseConfig,
        database: process.env.DB_PATH || 'database.sqlite'
      };
    default:
      return baseConfig;
  }
}

function generateDataSourceConfig(database: string): string {
  return `import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: '${database}' as any,
  ${database === 'sqlite' 
    ? `database: process.env.DB_PATH || 'database.sqlite',`
    : `host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '${database === 'postgres' ? '5432' : '3306'}'),
  username: process.env.DB_USERNAME || '${database === 'postgres' ? 'postgres' : 'root'}',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'myapp',`
  }
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
`;
}

function generateExampleEntity(): string {
  return `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
`;
}

function generateFactoryBase(): string {
  return `import { DataSource } from 'typeorm';

export abstract class BaseFactory<T> {
  protected dataSource: DataSource;

  constructor(dataSource?: DataSource) {
    if (!dataSource) {
      throw new Error('DataSource é obrigatório para BaseFactory');
    }
    this.dataSource = dataSource;
  }

  abstract make(overrides?: Partial<T>): T;
  
  async create(overrides?: Partial<T>): Promise<T> {
    const entity = this.make(overrides);
    const repository = this.dataSource.getRepository(this.getEntityClass());
    return await repository.save(entity);
  }

  async createMany(count: number, overrides?: Partial<T>): Promise<T[]> {
    const entities: T[] = [];
    for (let i = 0; i < count; i++) {
      entities.push(await this.create(overrides));
    }
    return entities;
  }

  protected abstract getEntityClass(): new () => T;
}
`;
}

function generateSeedBase(): string {
  return `import { DataSource } from 'typeorm';

export abstract class BaseSeed {
  protected dataSource: DataSource;

  constructor(dataSource?: DataSource) {
    if (dataSource) {
      this.dataSource = dataSource;
    }
  }

  abstract run(): Promise<void>;

  protected async ensureConnection(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }
}
`;
}