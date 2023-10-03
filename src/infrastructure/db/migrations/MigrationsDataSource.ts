import * as path from 'path';
import { DataSource } from 'typeorm';

export const migrationDS = new DataSource({
  type: 'postgres' as const,
  host: process.env.HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.DB_USER,
  password: process.env.PSW,
  database: process.env.DATABASE,
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  ssl: process.env.SSL === 'true',
  extra: {
    ssl: process.env.SSL === 'true' ? {
      rejectUnauthorized: false,
    }
      : null,
  },
});
