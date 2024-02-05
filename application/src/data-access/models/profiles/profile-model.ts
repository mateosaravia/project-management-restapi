import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';

interface ProfileAttributes {
  id?: number;
  userId?: number;
  name: string;
  lastname: string;
  biography: string;
  location: string;
  website?: string;
  linkedin?: string;
  company?: string;
}

export interface ProfileInput extends ProfileAttributes {}
export interface ProfileOutput extends Model<ProfileAttributes>, ProfileAttributes {}

export class Profile extends Model<ProfileAttributes, ProfileInput> implements ProfileAttributes {
  public id?: number;
  public userId?: number;
  public name!: string;
  public lastname!: string;
  public biography!: string;
  public location!: string;
  public website?: string;
  public linkedin?: string;
  public company?: string;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'profiles',
    timestamps: false,
    sequelize,
  },
);

sequelize
  .sync({ force: false })
  .then(() => console.log('Profiles table created'))
  .catch((error: Error) => console.log('Unable to create profiles table: ', error));
