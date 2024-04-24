import { Pool } from 'pg';
import Config from './config';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];

console.log(`pool-env: ${env}`);
console.log(`pool-config-user: ${config.database}`);

export const pool = new Pool({
  user: config.username,
  password: config.password,
  host: config.host,
  database: config.database,
  port: config.port,
});
