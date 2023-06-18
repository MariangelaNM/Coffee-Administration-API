import { DataSource } from 'typeorm';
import * as path from 'path';

export const migrationDS = new DataSource({
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'coffee1234',
  database: 'postgres',
  migrations: [path.resolve(__dirname, 'migrations', '*')],
});
