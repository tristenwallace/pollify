// src/models/vote.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

export class Vote extends Model {
  declare userId: string;
  declare pollId: string;
  declare optionChosen: string;
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
    optionChosen: {
      type: DataTypes.ENUM('optionOne', 'optionTwo'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'Votes',
    timestamps: false,
  },
);

export default Vote;
