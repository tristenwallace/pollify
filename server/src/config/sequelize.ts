import { Sequelize } from 'sequelize';
import Config from './config';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  },
);

export default sequelize;
