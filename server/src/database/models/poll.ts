import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';

export class Poll extends Model {
  public id!: number;
  public authorId!: number;
  public optionOneText!: string;
  public optionOneVotes!: number;
  public optionTwoText!: string;
  public optionTwoVotes!: number;
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
    optionTwoText: {
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
