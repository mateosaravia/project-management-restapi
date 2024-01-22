import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string
}

export interface UserInput extends UserAttributes {}
export interface UserOutput extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id?: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'developer',
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  },
);

sequelize
  .sync({ force: false })
  .then(() => console.log('Users table created'))
  .catch((error: Error) => console.log('Unable to create users table: ', error));
