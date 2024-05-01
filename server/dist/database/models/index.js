"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const poll_1 = __importDefault(require("./poll"));
const vote_1 = __importDefault(require("./vote"));
// Poll relationships
console.log('Defining association between Poll and Users');
poll_1.default.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'author',
});
poll_1.default.belongsToMany(user_1.default, {
    through: vote_1.default,
    as: 'voters',
    foreignKey: 'pollId',
    otherKey: 'userId',
});
console.log('Defining association between Poll and Vote');
poll_1.default.hasMany(vote_1.default, { foreignKey: 'pollId', as: 'votes' });
console.log('Association defined:', poll_1.default.associations);
// User Relationships
user_1.default.belongsToMany(poll_1.default, {
    through: vote_1.default,
    as: 'votedPolls',
    foreignKey: 'userId',
    otherKey: 'pollId',
});
user_1.default.hasMany(poll_1.default, {
    foreignKey: 'userId',
    as: 'authoredPolls',
});
// Vote Relationships
vote_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'voter' });
vote_1.default.belongsTo(poll_1.default, { foreignKey: 'pollId', as: 'votedPoll' });
exports.default = {
    User: user_1.default,
    Poll: poll_1.default,
    Vote: vote_1.default,
};
