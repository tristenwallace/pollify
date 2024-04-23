import { Dialect } from 'sequelize/types'; // Importing Dialect type for strict typing
import dotenv from 'dotenv';

// Determine which .env file to load based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'test'
    ? './environment/.env.test'
    : './environment/.env.development';

// Load the environment variables from the specified file
dotenv.config({ path: envFile });

interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export const dbConfig: DBConfig = {
  host: process.env.POSTGRES_HOST || '',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_NAME || '',
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
};

interface SequelizeConfig {
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

const sequelizeConfig: Record<string, SequelizeConfig> = {
  development: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  },
  test: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  },
  production: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default sequelizeConfig;
module.exports = sequelizeConfig;
