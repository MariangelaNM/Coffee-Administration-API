import { SqlReader } from 'node-sql-reader';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeMigration1687103657625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sqlFile = SqlReader.readSqlFile(
      './src/infrastructure/db/migrations/sql/CoffeeInitialMigration.sql',
    );

    sqlFile.forEach(async (query) => {
      await queryRunner.query(query);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
