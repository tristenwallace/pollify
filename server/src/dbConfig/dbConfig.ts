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

const dbConfig: DBConfig = {
  host: process.env.POSTGRES_HOST || '',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_NAME || '',
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
};

export default dbConfig;
