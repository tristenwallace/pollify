import User from './user';
import Poll from './poll';
import Vote from './vote';

// Poll relationships

console.log('Defining association between Poll and Users');
Poll.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author',
});
Poll.belongsToMany(User, {
  through: Vote,
  as: 'voters',
  foreignKey: 'pollId',
  otherKey: 'userId',
});
console.log('Defining association between Poll and Vote');
Poll.hasMany(Vote, { foreignKey: 'pollId', as: 'votes' });
console.log('Association defined:', Poll.associations);

// User Relationships
User.belongsToMany(Poll, {
  through: Vote,
  as: 'votedPolls',
  foreignKey: 'userId',
  otherKey: 'pollId',
});
User.hasMany(Poll, {
  foreignKey: 'userId',
  as: 'authoredPolls',
});

// Vote Relationships
Vote.belongsTo(User, { foreignKey: 'userId', as: 'voter' });
Vote.belongsTo(Poll, { foreignKey: 'pollId', as: 'votedPoll' });

export default {
  User,
  Poll,
  Vote,
};
