import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

export class Poll extends Model {
  public id!: string;
  public userId!: string;
  public optionOne!: string;
  public optionTwo!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Poll.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
      allowNull: true,
    },
    optionOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionTwo: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'polls',
  },
);

export default Poll;
