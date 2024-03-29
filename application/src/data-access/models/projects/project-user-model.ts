import { sequelize } from '../../../common/config/database-config';
import { DataTypes } from 'sequelize';

import { Project } from './project-model';
import { User } from '../users/user-model';

export const ProjectUser = sequelize.define(
  'ProjectUser',
  {
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'projectUsers',
    timestamps: false,
    sequelize,
  },
);

Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'projectId', as: 'owners' });
User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'userId', as: 'projects' });

sequelize
  .sync({ force: false })
  .then(() => console.log('ProjectUsers table created'))
  .catch((error: Error) => console.log('Unable to create ProjectUsers table: ', error));
