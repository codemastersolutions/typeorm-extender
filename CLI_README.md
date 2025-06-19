# TypeORM Extender CLI

CLI completa para gerenciamento de migrations, factories e seeds no TypeORM.

## Instalação

### Instalação Global
```bash
npm install -g @codemastersolutions/typeorm-extender
```

### Instalação Local no Projeto
```bash
npm install @codemastersolutions/typeorm-extender
```

## Comandos Disponíveis

### Inicialização do Projeto

#### `typeorm-extender init`
Inicializa a estrutura do projeto com configurações padrão.

```bash
# Inicializar com PostgreSQL (padrão)
typeorm-extender init

# Inicializar com MySQL
typeorm-extender init --database mysql

# Inicializar with SQLite
typeorm-extender init --database sqlite
```

**Opções:**
- `-d, --database <type>`: Tipo de banco de dados (postgres, mysql, sqlite) - padrão: postgres

**O que é criado:**
- Diretórios: `src/entities`, `src/migrations`, `src/factories`, `src/seeds`, `src/config`
- Arquivo de configuração: `ormconfig.json`
- DataSource: `src/config/data-source.ts`
- Entidade exemplo: `src/entities/User.ts`
- Base para factories: `src/factories/base.factory.ts`
- Base para seeds: `src/seeds/base.seed.ts`

### Migrations

#### `typeorm-extender migration:create <name>`
Cria uma nova migration.

```bash
# Criar migration para criar tabela de usuários
typeorm-extender migration:create CreateUsersTable

# Criar migration em diretório específico
typeorm-extender migration:create AddEmailToUsers --dir src/database/migrations
```

**Opções:**
- `-d, --dir <directory>`: Diretório das migrations - padrão: `src/migrations`

#### `typeorm-extender migration:run`
Executa todas as migrations pendentes.

```bash
# Executar migrations com configuração padrão
typeorm-extender migration:run

# Executar com arquivo de configuração específico
typeorm-extender migration:run --config custom-ormconfig.json
```

**Opções:**
- `-c, --config <path>`: Caminho para o arquivo de configuração - padrão: `ormconfig.json`

### Factories

#### `typeorm-extender factory:create <name>`
Cria uma nova factory.

```bash
# Criar factory para User
typeorm-extender factory:create UserFactory

# Criar factory com entidade específica
typeorm-extender factory:create ProductFactory --entity Product

# Criar factory em diretório específico
typeorm-extender factory:create UserFactory --dir src/database/factories
```

**Opções:**
- `-d, --dir <directory>`: Diretório das factories - padrão: `src/factories`
- `-e, --entity <entity>`: Nome da entidade relacionada

### Seeds

#### `typeorm-extender seed:create <name>`
Cria um novo seed.

```bash
# Criar seed básico
typeorm-extender seed:create UserSeed

# Criar seed com factory específica
typeorm-extender seed:create UserSeed --factory UserFactory

# Criar seed em diretório específico
typeorm-extender seed:create UserSeed --dir src/database/seeds
```

**Opções:**
- `-d, --dir <directory>`: Diretório dos seeds - padrão: `src/seeds`
- `-f, --factory <factory>`: Factory a ser utilizada no seed

#### `typeorm-extender seed:run`
Executa todos os seeds ou um seed específico.

```bash
# Executar todos os seeds
typeorm-extender seed:run

# Executar seed específico
typeorm-extender seed:run --seed UserSeed

# Executar com configuração específica
typeorm-extender seed:run --config custom-ormconfig.json
```

**Opções:**
- `-c, --config <path>`: Caminho para o arquivo de configuração - padrão: `ormconfig.json`
- `-s, --seed <name>`: Executa um seed específico

### Comandos Utilitários

#### `typeorm-extender db:setup`
Executa migrations e seeds em sequência.

```bash
# Configurar banco completo
typeorm-extender db:setup

# Com configuração específica
typeorm-extender db:setup --config custom-ormconfig.json
```

**Opções:**
- `-c, --config <path>`: Caminho para o arquivo de configuração - padrão: `ormconfig.json`

## Uso com NPM Scripts

Se instalado localmente, você pode adicionar scripts ao seu `package.json`:

```json
{
  "scripts": {
    "db:init": "typeorm-extender init",
    "migration:create": "typeorm-extender migration:create",
    "migration:run": "typeorm-extender migration:run",
    "factory:create": "typeorm-extender factory:create",
    "seed:create": "typeorm-extender seed:create",
    "seed:run": "typeorm-extender seed:run",
    "db:setup": "typeorm-extender db:setup"
  }
}
```

Então use:
```bash
npm run migration:create CreateUsersTable
npm run migration:run
npm run factory:create UserFactory
npm run seed:create UserSeed
npm run seed:run
```

## Estrutura de Arquivos Gerada

```
project/
├── src/
│   ├── config/
│   │   └── data-source.ts
│   ├── entities/
│   │   └── User.ts
│   ├── migrations/
│   │   └── 20231201120000-CreateUsersTable.ts
│   ├── factories/
│   │   ├── base.factory.ts
│   │   └── User.factory.ts
│   └── seeds/
│       ├── base.seed.ts
│       └── User.seed.ts
└── ormconfig.json
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=myapp

# Para SQLite
DB_PATH=database.sqlite

# Environment
NODE_ENV=development
```

### Arquivo ormconfig.json

O comando `init` cria automaticamente este arquivo baseado no tipo de banco escolhido:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "password",
  "database": "myapp",
  "entities": ["src/entities/**/*.ts"],
  "migrations": ["src/migrations/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations"
  },
  "synchronize": false,
  "logging": true
}
```

## Exemplos de Uso

### 1. Configuração Inicial do Projeto

```bash
# 1. Inicializar projeto
typeorm-extender init --database postgres

# 2. Criar primeira migration
typeorm-extender migration:create CreateUsersTable

# 3. Editar migration e executar
typeorm-extender migration:run

# 4. Criar factory
typeorm-extender factory:create UserFactory --entity User

# 5. Criar seed
typeorm-extender seed:create UserSeed --factory UserFactory

# 6. Executar seed
typeorm-extender seed:run
```

### 2. Exemplo de Migration

```typescript
// src/migrations/20231201120000-CreateUsersTable.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable20231201120000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

### 3. Exemplo de Factory

```typescript
// src/factories/User.factory.ts
import { User } from '../entities/User';
import { BaseFactory } from './base.factory';
import { faker } from '@faker-js/faker';

export class UserFactory extends BaseFactory<User> {
  protected getEntityClass(): new () => User {
    return User;
  }

  make(overrides?: Partial<User>): User {
    const user = new User();
    
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.isActive = true;
    
    Object.assign(user, overrides);
    
    return user;
  }
}
```

### 4. Exemplo de Seed

```typescript
// src/seeds/User.seed.ts
import { UserFactory } from '../factories/User.factory';
import { BaseSeed } from './base.seed';

export class UserSeed extends BaseSeed {
  async run(): Promise<void> {
    console.log('🌱 Executando UserSeed...');
    
    await this.ensureConnection();
    
    const factory = new UserFactory();
    
    // Criar usuário admin
    await factory.create({
      name: 'Admin User',
      email: 'admin@example.com'
    });
    
    // Criar 10 usuários aleatórios
    await factory.createMany(10);
    
    console.log('✅ UserSeed executado com sucesso');
  }
}
```

## Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**
   - Verifique se o banco está rodando
   - Confirme as credenciais no `.env` ou `ormconfig.json`

2. **Migration não encontrada**
   - Verifique se o arquivo está no diretório correto
   - Confirme se o nome da classe está correto

3. **Factory/Seed não executando**
   - Verifique se as importações estão corretas
   - Confirme se a classe herda da base correta

### Logs e Debug

Para mais informações de debug, defina:
```bash
export NODE_ENV=development
```

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request no [repositório GitHub](https://github.com/codemastersolutions/typeorm-extender).

## Licença

MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.