import { DatabaseException } from '../../../common/exceptions/exceptions';
import { Invitation, InvitationInput, InvitationOutput } from '../../models/invitations/invitation-model';
import { ProjectUser } from '../../models/projects/project-user-model';

export const inviteUsers = async (invitations: InvitationInput[]): Promise<InvitationOutput[]> => {
  try {
    return await Invitation.bulkCreate(invitations);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const acceptInvitation = async (invitationId: number): Promise<InvitationOutput | null> => {
  try {
    await Invitation.update({ status: 'accepted' }, { where: { id: invitationId } });

    const invitation = await Invitation.findByPk(invitationId);
    await ProjectUser.create({ projectId: invitation?.projectId, userId: invitation?.invitedUserId });

    return await Invitation.findByPk(invitationId);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const rejectInvitation = async (invitationId: number): Promise<InvitationOutput | null> => {
  try {
    await Invitation.update({ status: 'rejected' }, { where: { id: invitationId } });
    return await Invitation.findByPk(invitationId);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const removeInvitation = async (invitationId: number): Promise<string> => {
  try {
    const deleteResult = await Invitation.destroy({ where: { id: invitationId } });
    if (deleteResult === 0) {
      return 'Invitation not deleted';
    }
    return 'Invitation deleted correctly';
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const existsInvitationByStatus = async (invitationId: number, status: string): Promise<boolean> => {
  try {
    const invitation = await Invitation.findOne({ where: { id: invitationId, status } });
    return !!invitation;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getInvitation = async (invitationId: number): Promise<InvitationOutput | null> => {
  try {
    const invitation = await Invitation.findByPk(invitationId);
    return invitation || null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getUserInvitations = async (userId: number): Promise<InvitationOutput[]> => {
  try {
    const invitations = await Invitation.findAll({ where: { invitedUserId: userId } });
    return invitations;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getProjectInvitations = async (projectId: number): Promise<InvitationOutput[]> => {
  try {
    const invitations = await Invitation.findAll({ where: { projectId } });
    return invitations;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};
