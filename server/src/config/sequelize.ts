import { Sequelize } from 'sequelize';
import Config from './config';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];

console.log(`seq-env: ${env}`);
console.log(`seq-config-database: ${config.database}`);
console.log(`seq-config-username: ${config.username}`);
console.log(`seq-config-password: ${config.password}`);
console.log(`seq-config-dialect: ${config.dialect}`);
console.log(`seq-config-host: ${config.host}`);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: console.log,
  },
);

export default sequelize;
