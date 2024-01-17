import { DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';

export const User = sequelize.define(
  'User',
  {
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
