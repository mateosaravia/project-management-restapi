import { ProjectInput, ProjectOutput } from '../../data-access/models/projects/project-model';
import { validateProject } from './project-validator';

import * as userService from '../users/user-service';
import * as projectRepository from '../../data-access/repositories/projects/project-repository';
import * as exceptions from '../../common/exceptions/exceptions';
import { UserOutput } from '../../data-access/models/users/user-model';

export const createProject = async (userEmail: string, newProject: ProjectInput): Promise<ProjectOutput> => {
  validateProject(newProject);

  let project = await projectRepository.createProject(userEmail, newProject);
  return project;
};

export const existsProject = async (projectId: number): Promise<boolean> => {
  const project = await projectRepository.getProject(projectId);
  return !!project;
};

export const getProject = async (projectId: number): Promise<ProjectOutput | null> => {
  const exists: boolean = await existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id: ${projectId} not found`);
  }

  const project = await projectRepository.getProject(projectId);
  return project;
};

export const getAllProjects = async (): Promise<ProjectOutput[]> => {
  const projects = await projectRepository.getAllProjects();
  return projects;
};

export const updateProject = async (projectId: number, projectUpdate: ProjectInput): Promise<ProjectOutput> => {
  validateProject(projectUpdate);

  const exists = await existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id: ${projectId} not found`);
  }

  const updatedProject = await projectRepository.updateProject(projectId, projectUpdate);
  return updatedProject;
};

export const deleteProject = async (projectId: number): Promise<string> => {
  const exists = await existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id: ${projectId} not found`);
  }

  const deleteResult = await projectRepository.deleteProject(projectId);
  return deleteResult;
};

export const leaveProject = async (projectId: number, userEmail: string): Promise<string> => {
  const exists = await existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id: ${projectId} not found`);
  }

  const user = await userService.getUser(userEmail);

  const deleteResult = await projectRepository.leaveProject(projectId, user!);
  return deleteResult;
};

export const removeUsers = async (projectId: number, usersEmails: string[]): Promise<string> => {
  const exists = await existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id: ${projectId} not found`);
  }

  const users: UserOutput[] = [];
  usersEmails.forEach(async (userEmail) => {
    const user = await userService.getUser(userEmail);
    if (!user) {
      throw new exceptions.ElementNotFoundException(`User with email ${userEmail} not found`);
    }

    users.push(user);
  });

  const deleteResult = await projectRepository.removeUsers(projectId, users);
  return deleteResult;
};
