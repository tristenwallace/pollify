import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface PollAttributes {
  id: number;
  authorId: number;
  question: string;
}

interface PollCreationAttributes extends Optional<PollAttributes, 'id'> {}

class Poll
  extends Model<PollAttributes, PollCreationAttributes>
  implements PollAttributes
{
  public id!: number;
  public authorId!: number;
  public question!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Poll.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'polls',
      sequelize,
    },
  );

  return Poll;
};
