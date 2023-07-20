import * as path from 'path';
import { DataSource } from 'typeorm';

export const migrationDS = new DataSource({
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'coffee1234',
  database: 'postgres',
  migrations: [path.resolve(__dirname, 'migrations', '*')],
});
