import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';
import { User } from '../users/user-model';
import { Project } from '../projects/project-model';

interface InvitationAttributes {
  id?: number;
  invitedUserId?: number;
  projectId?: number;
  status?: string;
  customMessage: string;
}

export interface InvitationInput extends InvitationAttributes {}
export interface InvitationOutput extends Model<InvitationAttributes>, InvitationAttributes {}

export class Invitation extends Model<InvitationAttributes, InvitationInput> implements InvitationAttributes {
  public id?: number;
  public invitedUserId?: number;
  public projectId?: number;
  public status?: string;
  public customMessage!: string;
}

Invitation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    invitedUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    customMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'invitations',
    timestamps: true,
    sequelize,
  },
);

Invitation.belongsTo(User, { foreignKey: 'invitedUserId', as: 'invitedUser' });
Invitation.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

sequelize
  .sync({ force: false })
  .then(() => console.log('Invitations table created'))
  .catch((error: Error) => console.log('Unable to create invitations table: ', error));
