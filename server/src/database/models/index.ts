import User from './user';
import Poll from './poll';
import Vote from './vote';

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
