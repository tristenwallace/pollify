import { Sequelize, DataTypes, Model } from 'sequelize';

export class Poll extends Model {
  public id!: number;
  public authorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public optionOneText!: string;
  public optionOneVotes!: number;
  public optionTwoText!: string;
  public optionTwoVotes!: number;
}

export default (sequelize: Sequelize) => {
  Poll.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      authorId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      optionOneText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optionOneVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      optionTwoText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optionTwoVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Poll',
      tableName: 'polls',
    },
  );

  return Poll;
};
