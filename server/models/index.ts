import { Sequelize } from 'sequelize';
import dbConfig from '../dbConfig/dbConfig'; // Adjust the path as necessary
import UserModel from './user';
import PollModel from './poll';
import VoteModel from './vote';

// Initialize sequelize with connection parameters
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    logging: false, // Toggle based on your preference
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// Initialize models
export const User = UserModel(sequelize);
export const Poll = PollModel(sequelize);
export const Vote = VoteModel(sequelize);

// Define associations
User.hasMany(Poll, { foreignKey: 'authorId', as: 'polls' });
Poll.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.belongsToMany(Poll, {
  through: Vote,
  foreignKey: 'userId',
  otherKey: 'pollId',
});
Poll.belongsToMany(User, {
  through: Vote,
  foreignKey: 'pollId',
  otherKey: 'userId',
});

export default {
  User,
  Poll,
  Vote,
};
