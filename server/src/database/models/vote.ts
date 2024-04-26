// src/models/vote.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

export class Vote extends Model {
  declare userId: string;
  declare pollId: string;
  declare optionChosen: number;
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
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    timestamps: false,
  },
);

export default Vote;
