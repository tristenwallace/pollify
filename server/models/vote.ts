import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface VoteAttributes {
  userId: number;
  pollId: number;
  optionChosen: string; // 'optionOne' or 'optionTwo'
}

interface VoteCreationAttributes
  extends Optional<VoteAttributes, 'optionChosen'> {}

class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public userId!: number;
  public pollId!: number;
  public optionChosen!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Vote.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      optionChosen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'votes',
      sequelize,
    },
  );

  return Vote;
};
