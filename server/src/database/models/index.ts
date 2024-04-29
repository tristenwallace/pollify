import User from './user';
import Poll from './poll';
import Vote from './vote';

// Set up relationships for polls created by a user
User.hasMany(Poll, {
  foreignKey: 'userId',
  as: 'authoredPolls',
});
Poll.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author', // Clearly indicates the creator of the poll
});

// Set up relationships for voting
User.belongsToMany(Poll, {
  through: Vote,
  as: 'votedPolls', // Indicates polls on which the user has voted
  foreignKey: 'userId',
  otherKey: 'pollId',
});
Poll.belongsToMany(User, {
  through: Vote,
  as: 'voters', // Indicates users who have voted on this poll
  foreignKey: 'pollId',
  otherKey: 'userId',
});

// Relationships in Vote model
Vote.belongsTo(User, { foreignKey: 'userId', as: 'voter' });
Vote.belongsTo(Poll, { foreignKey: 'pollId', as: 'votedPoll' });

export default {
  User,
  Poll,
  Vote,
};
