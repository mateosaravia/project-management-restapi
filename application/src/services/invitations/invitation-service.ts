import * as exceptions from '../../common/exceptions/exceptions';
import { InvitationInput } from '../../data-access/models/invitations/invitation-model';

import * as projectService from '../projects/project-service';
import * as userService from '../users/user-service';
import * as invitationRepository from '../../data-access/repositories/invitations/invitation-repository';

export const inviteUsers = async (projectId: number, users: string[], customMessage: string): Promise<any> => {
  const existantProject = await projectService.existsProject(projectId);
  if (!existantProject) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const invitations: InvitationInput[] = [];

  users.forEach(async (userId) => {
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
  });

  return await invitationRepository.inviteUsers(invitations);
};

export const acceptInvitation = async (invitationId: number) => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return await invitationRepository.acceptInvitation(invitationId);
};

export const rejectInvitation = async (invitationId: number) => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return await invitationRepository.rejectInvitation(invitationId);
};

export const removeInvitation = async (invitationId: number) => {
  const invitation = await getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return await invitationRepository.removeInvitation(invitationId);
};

export const getInvitation = async (invitationId: number) => {
  const invitation = await invitationRepository.getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return invitation;
};

export const getUserInvitations = async (ownerEmail: string) => {
  const user = await userService.getUser(ownerEmail);

  if (!user) {
    throw new exceptions.ElementNotFoundException(`User with email ${ownerEmail} not found`);
  }
  
  const invitations = await invitationRepository.getUserInvitations(user);
  return invitations;
};

export const getProjectInvitations = async (projectId: number) => {
  const existantProject = await projectService.existsProject(projectId);
  if (!existantProject) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const invitations = await invitationRepository.getProjectInvitations(projectId);
  return invitations;
};
