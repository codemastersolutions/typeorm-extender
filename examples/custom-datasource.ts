import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

/**
 * Exemplo de DataSource customizado
 * Este arquivo pode ser usado como referência para criar
 * configurações personalizadas do TypeORM
 */
export const AppDataSource = new DataSource({
  type: 'postgres', // ou 'mysql', 'sqlite', etc.
  
  // Configurações de conexão
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'myapp',
  
  // Configurações de entidades e migrations
  entities: process.env.TYPEORM_ENTITIES?.split(',') || [
    'src/entities/**/*.ts',
    'dist/entities/**/*.js'
  ],
  migrations: process.env.TYPEORM_MIGRATIONS?.split(',') || [
    'src/migrations/**/*.ts',
    'dist/migrations/**/*.js'
  ],
  
  // Configurações de desenvolvimento
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false,
  logging: process.env.TYPEORM_LOGGING === 'true' || process.env.NODE_ENV === 'development',
  
  // Configurações avançadas
  maxQueryExecutionTime: parseInt(process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME || '1000'),
  dropSchema: process.env.TYPEORM_DROP_SCHEMA === 'true' || false,
  cache: process.env.TYPEORM_CACHE === 'true' || false,
  
  // Pool de conexões
  extra: {
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000'),
    timeout: parseInt(process.env.DB_TIMEOUT || '60000'),
  },
  
  // SSL para produção (PostgreSQL)
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  
  // Configurações de subscribers (opcional)
  subscribers: [
    'src/subscribers/**/*.ts',
    'dist/subscribers/**/*.js'
  ],
});

// Exemplo de configuração para múltiplos bancos
export const SecondaryDataSource = new DataSource({
  name: 'secondary',
  type: 'mysql',
  host: process.env.SECONDARY_DB_HOST || 'localhost',
  port: parseInt(process.env.SECONDARY_DB_PORT || '3306'),
  username: process.env.SECONDARY_DB_USERNAME || 'root',
  password: process.env.SECONDARY_DB_PASSWORD || 'password',
  database: process.env.SECONDARY_DB_DATABASE || 'secondary_db',
  entities: ['src/entities/secondary/**/*.ts'],
  migrations: ['src/migrations/secondary/**/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});