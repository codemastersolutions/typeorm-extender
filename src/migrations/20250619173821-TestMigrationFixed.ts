import { MigrationInterface, QueryRunner, Table, Index, ForeignKey } from 'typeorm';

export class TestMigrationFixed20250619173821 implements MigrationInterface {
  name = 'TestMigrationFixed20250619173821';

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
