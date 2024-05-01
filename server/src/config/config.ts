import { Dialect } from 'sequelize/types';
import path from 'path';
import fs from 'fs';

// Load dotenv if environment variables are not already set
if (!process.env.POSTGRES_USER) {
  const dotenv = require('dotenv');
  const envPath = path.resolve(
    __dirname,
    `../../environment/.env.${process.env.NODE_ENV || 'development'}`,
  );
  dotenv.config({ path: envPath });
}

// Define a base configuration that applies to both Sequelize and Pool
interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  dialectOptions: {
    ssl?: {
      require: boolean;
      rejectUnauthorized: boolean;
      ca: string | Buffer;
    };
  };
}

// Configuration for all environments
const Config: Record<string, Config> = {
  development: {
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || '',
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {},
  },
  test: {
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || '',
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
    dialect: 'postgres',
    dialectOptions: {},
  },
  production: {
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || '',
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('./certs/us-east-2-bundle.pem').toString(),
      },
    },
  },
};

export default Config;
module.exports = Config;
