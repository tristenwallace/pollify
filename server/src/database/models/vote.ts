// src/models/vote.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

export class Vote extends Model {
  declare userId: string;
  declare pollId: string;
  declare optionChosen: string;
}

export default (sequelize: Sequelize) => {
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

  return Vote;
};
