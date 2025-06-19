import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

interface MigrationOptions {
  dir: string;
}

export async function createMigration(name: string, options: MigrationOptions): Promise<void> {
  console.log(`🔄 Criando migration: ${name}`);
  
  try {
    // Garantir que o diretório existe
    if (!(await exists(options.dir))) {
      await mkdir(options.dir, { recursive: true });
      console.log(`📁 Criado diretório: ${options.dir}`);
    }

    // Gerar timestamp
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const fileName = `${timestamp}-${name}.ts`;
    const filePath = path.join(options.dir, fileName);

    // Gerar conteúdo da migration
    const migrationContent = generateMigrationTemplate(className, timestamp);
    
    await writeFile(filePath, migrationContent);
    console.log(`✅ Migration criada: ${filePath}`);
    
    console.log('\n📋 Próximos passos:');
    console.log('1. Edite a migration para definir as mudanças no banco');
    console.log('2. Execute: npm run migration:run');
    
  } catch (error) {
    console.error('❌ Erro ao criar migration:', error);
    process.exit(1);
  }
}

function generateMigrationTemplate(className: string, timestamp: string): string {
  return `import { MigrationInterface, QueryRunner, Table, Index, ForeignKey } from 'typeorm';

export class ${className}${timestamp} implements MigrationInterface {
  name = '${className}${timestamp}';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Exemplo: Criar uma tabela
    /*
    await queryRunner.createTable(
      new Table({
        name: 'example_table',
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
            length: '255',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      }),
      true
    );
    */

    // Exemplo: Criar índice
    /*
    await queryRunner.createIndex(
      'example_table',
      new Index({
        name: 'IDX_EXAMPLE_EMAIL',
        columnNames: ['email']
      })
    );
    */

    // Exemplo: Adicionar coluna
    /*
    await queryRunner.addColumn(
      'example_table',
      new TableColumn({
        name: 'new_column',
        type: 'varchar',
        length: '100',
        isNullable: true
      })
    );
    */

    // Exemplo: Criar foreign key
    /*
    await queryRunner.createForeignKey(
      'example_table',
      new ForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    );
    */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter as mudanças feitas no método up()
    // Exemplo: Remover tabela
    /*
    await queryRunner.dropTable('example_table');
    */

    // Exemplo: Remover índice
    /*
    await queryRunner.dropIndex('example_table', 'IDX_EXAMPLE_EMAIL');
    */

    // Exemplo: Remover coluna
    /*
    await queryRunner.dropColumn('example_table', 'new_column');
    */

    // Exemplo: Remover foreign key
    /*
    await queryRunner.dropForeignKey('example_table', 'FK_EXAMPLE_USER');
    */
  }
}
`;
}