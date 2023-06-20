import * as path from 'path';
import { DataSource } from 'typeorm';

export const migrationDS = new DataSource({
  type: 'postgres' as const,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USER,
  password: process.env.PSW,
  database: process.env.DATABASE,
  migrations: [path.resolve(__dirname, 'migrations', '*')],
});
