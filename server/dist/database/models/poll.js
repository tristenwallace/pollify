"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/sequelize"));
class Poll extends sequelize_1.Model {
}
exports.Poll = Poll;
Poll.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    optionOne: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    optionTwo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Poll',
    tableName: 'polls',
});
exports.default = Poll;
