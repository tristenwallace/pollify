"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
// src/models/vote.ts
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/sequelize"));
class Vote extends sequelize_1.Model {
}
exports.Vote = Vote;
Vote.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        },
        primaryKey: true,
    },
    pollId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'Poll',
            key: 'id',
        },
        primaryKey: true,
    },
    chosenOption: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]], // Only allow 1 or 2 as valid integers
        },
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
    modelName: 'Vote',
    tableName: 'votes',
});
exports.default = Vote;
