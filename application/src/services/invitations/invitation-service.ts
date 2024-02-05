import * as exceptions from '../../common/exceptions/exceptions';

import * as projectService from '../projects/project-service';
import * as userService from '../users/user-service';

export const inviteUsers = async (projectId: number, users: string[]): Promise<any> => {
  const existantProject = await projectService.existsProject(projectId);
  if (!existantProject) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  users.forEach(async (user) => {
    const existantUser = await userService.existsUserByEmail(user);
    if (!existantUser) {
      throw new exceptions.ElementNotFoundException(`User with email ${user} not found`);
    }
  });

  return await invitationRepository.inviteUsers(projectId, users);
};

export const acceptInvitation = async (invitationId: number) => {
  const invitation = await invitationRepository.getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return await invitationRepository.acceptInvitation(invitationId);
};

export const rejectInvitation = async (invitationId: number) => {
  const invitation = await invitationRepository.getInvitation(invitationId);
  if (!invitation) {
    throw new exceptions.ElementNotFoundException(`Invitation with id ${invitationId} not found`);
  }

  return await invitationRepository.rejectInvitation(invitationId);
};

export const removeInvitation = async (invitationId: number) => {
  const invitation = await invitationRepository.getInvitation(invitationId);
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
  const invitations = await invitationRepository.getUserInvitations(ownerEmail);
  return invitations;
};

export const getProjectInvitations = async (projectId: number) => {
  const invitations = await invitationRepository.getProjectInvitations(projectId);
  return invitations;
};
