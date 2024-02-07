import * as exceptions from '../../common/exceptions/exceptions';
import { InvitationInput, InvitationOutput } from '../../data-access/models/invitations/invitation-model';

import * as projectService from '../projects/project-service';
import * as userService from '../users/user-service';
import * as invitationRepository from '../../data-access/repositories/invitations/invitation-repository';

export const inviteUsers = async (projectId: number, usersIds: string[], customMessage: string): Promise<InvitationOutput[]> => {
  const existantProject = await projectService.existsProject(projectId);
  if (!existantProject) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const invitations: InvitationInput[] = [];

  for (const userId of usersIds) {
    const user = await userService.getUserById(parseInt(userId));
    if (!user) {
      throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
    }

    const invitation: InvitationInput = {
      projectId,
      invitedUserId: parseInt(userId),
      customMessage,
      status: 'pending',
    };
    invitations.push(invitation);
  }

  return await invitationRepository.inviteUsers(invitations);
};

export const acceptInvitation = async (invitationId: number): Promise<InvitationOutput> => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  const existsPendingInvitation = await existsInvitationByStatus(invitationId, 'pending');
  if (!existsPendingInvitation) {
    throw new exceptions.ElementAlreadyExists(
      `Invitation for user with id ${invitation.invitedUserId} already answered`,
    );
  }

  return await invitationRepository.acceptInvitation(invitationId);
};

export const rejectInvitation = async (invitationId: number): Promise<InvitationOutput> => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  const existsPendingInvitation = await existsInvitationByStatus(invitationId, 'pending');
  if (!existsPendingInvitation) {
    throw new exceptions.ElementAlreadyExists(
      `Invitation for user with id ${invitation.invitedUserId} already answered`,
    );
  }

  return await invitationRepository.rejectInvitation(invitationId);
};

export const removeInvitation = async (invitationId: number): Promise<string> => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  const existsPendingInvitation = await existsInvitationByStatus(invitationId, 'pending');
  if (!existsPendingInvitation) {
    throw new exceptions.ElementAlreadyExists(
      `Invitation for user with id ${invitation.invitedUserId} already answered`,
    );
  }

  return await invitationRepository.removeInvitation(invitationId);
};

export const existsInvitationByStatus = async (invitationId: number, status: string): Promise<boolean> => {
  const invitation = await invitationRepository.existsInvitationByStatus(invitationId, status);
  return invitation;
};

export const getInvitation = async (invitationId: number): Promise<InvitationOutput> => {
  const invitation = await invitationRepository.getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return invitation;
};

export const getUserInvitations = async (ownerEmail: string): Promise<InvitationOutput[]> => {
  const user = await userService.getUser(ownerEmail);

  if (!user) {
    throw new exceptions.ElementNotFoundException(`User with email ${ownerEmail} not found`);
  }
  const userId = user.id;

  const invitations = await invitationRepository.getUserInvitations(userId);
  return invitations;
};

export const getProjectInvitations = async (projectId: number): Promise<InvitationOutput[]> => {
  const existantProject = await projectService.existsProject(projectId);
  if (!existantProject) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const invitations = await invitationRepository.getProjectInvitations(projectId);
  return invitations;
};
