import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1602701539598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'user',
      columns: [
        {
          name: 'facebookId',
          type: 'bigint',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`DROP TABLE bucket`);
  }
}
