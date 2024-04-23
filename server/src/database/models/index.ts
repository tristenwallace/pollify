import { Sequelize } from 'sequelize';
import sequelizeConfig from '../../config/config'; // adjust the path as necessary
import UserModel from './user';
import PollModel from './poll';
import VoteModel from './vote';

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
);

// Import models
const User = UserModel(sequelize);
const Poll = PollModel(sequelize);
const Vote = VoteModel(sequelize);

// Set up relationships
User.belongsToMany(Poll, {
  through: Vote,
  as: 'polls',
  foreignKey: 'userId',
  otherKey: 'pollId',
});
Poll.belongsToMany(User, {
  through: Vote,
  as: 'users',
  foreignKey: 'pollId',
  otherKey: 'userId',
});

// Additional direct relationships as needed
Vote.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Vote.belongsTo(Poll, { foreignKey: 'pollId', as: 'poll' });

export default {
  User,
  Poll,
  Vote,
};
