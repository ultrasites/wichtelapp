import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Lottery1602703450590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'lottery',
      columns: [
        {
          name: 'id',
          type: 'int4',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'facebookIdFirst',
          type: 'bigint',
        },
        {
          name: 'facebookIdSecond',
          type: 'bigint',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['facebookIdFirst'],
          referencedTableName: 'user',
          referencedColumnNames: ['facebookId'],
          onDelete: 'cascade',
        },
        {
          columnNames: ['facebookIdSecond'],
          referencedTableName: 'user',
          referencedColumnNames: ['facebookId'],
          onDelete: 'cascade',
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`DROP TABLE lottery`);
  }
}
