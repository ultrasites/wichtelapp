import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Settings1603118921809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'settings',
      columns: [
        {
          name: 'key',
          type: 'text',
          isUnique: true,
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`DROP TABLE settings`);
  }
}
