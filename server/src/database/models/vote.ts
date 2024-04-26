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
    optionChosen: {
      type: DataTypes.ENUM(1, 2),
      allowNull: false,
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
