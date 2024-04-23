import { Sequelize, DataTypes, Model } from 'sequelize';

export class Poll extends Model {
  public id!: number;
  public authorId!: number;
  public optionOneText!: string;
  public optionOneVotes!: number;
  public optionTwoText!: string;
  public optionTwoVotes!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
          model: 'Users',
          key: 'id',
        },
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
      modelName: 'Poll',
      tableName: 'Polls',
    },
  );

  return Poll;
};
