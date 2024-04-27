// src/models/vote.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

export class Vote extends Model {
  declare userId: string;
  declare pollId: string;
  declare chosenOption: number;
}

Vote.init(
  {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      primaryKey: true,
    },
    pollId: {
      type: DataTypes.UUID,
      references: {
        model: 'Polls',
        key: 'id',
      },
      primaryKey: true,
    },
    chosenOption: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]]  // Only allow 1 or 2 as valid integers
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
  },
);

export default Vote;
