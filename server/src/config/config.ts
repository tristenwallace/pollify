import { Dialect } from 'sequelize/types';
import dotenv from 'dotenv';
import path from 'path';

// Determine the environment and configure the .env file path
const env = process.env.NODE_ENV || 'development';

const envPath =
  env === 'test'
    ? path.resolve(__dirname, '../../environment/.env.test')
    : path.resolve(__dirname, '../../environment/.env.development');

// Load the .env file
dotenv.config({ path: envPath });

// Define a base configuration that applies to both Sequelize and Pool
interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
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
  },
  test: {
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || '',
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
    dialect: 'postgres',
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
        rejectUnauthorized: false,
      },
    },
  },
};

export default Config;
module.exports = Config;
