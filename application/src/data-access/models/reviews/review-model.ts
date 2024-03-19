import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';
import { Project } from '../projects/project-model';
import { User } from '../users/user-model';

interface ReviewAttributes {
  id?: number;
  projectId: number;
  qualifierId: number;
  rating: number;
  comment: string;
}

export interface ReviewInput extends ReviewAttributes {}
export interface ReviewOutput extends Model<ReviewAttributes>, ReviewAttributes {}

export class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
  public id?: number;
  public projectId!: number;
  public qualifierId!: number;
  public rating!: number;
  public comment!: string;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    qualifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'reviews',
    timestamps: false,
    sequelize,
  },
);

Review.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'qualifier' });

sequelize
  .sync({ force: false })
  .then(() => console.log('Reviews table created'))
  .catch((error: Error) => console.log('Unable to create Reviews table: ', error));
