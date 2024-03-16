import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';

interface ProjectAttributes {
  id?: number;
  title: string;
  description: string;
  documentation: string;
  skills: [string];
  technologies: [string];
  tags: [string];
}

export interface ProjectInput extends ProjectAttributes {}
export interface ProjectOutput extends Model<ProjectAttributes>, ProjectAttributes {}

export class Project extends Model<ProjectAttributes, ProjectInput> implements ProjectAttributes {
  public id?: number;
  public title!: string;
  public description!: string;
  public documentation!: string;
  public skills!: [string];
  public technologies!: [string];
  public tags!: [string];
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technologies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'projects',
    timestamps: false,
    sequelize,
  },
);

sequelize
  .sync({ force: false })
  .then(() => console.log('Projects table created'))
  .catch((error: Error) => console.log('Unable to create projects table: ', error));
