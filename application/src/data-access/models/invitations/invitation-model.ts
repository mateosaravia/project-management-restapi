import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../common/config/database-config';

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
    },
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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

sequelize
  .sync({ force: false })
  .then(() => console.log('Invitations table created'))
  .catch((error: Error) => console.log('Unable to create invitations table: ', error));
