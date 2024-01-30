import { ProjectInput, ProjectOutput } from '../../data-access/models/projects/project-model';
import { validateProject } from './project-validator';

import * as exceptions from '../../common/exceptions/exceptions';
import * as projectRepository from '../../data-access/repositories/projects/project-repository';

export const createProject = async (newProject: ProjectInput): Promise<ProjectOutput> => {
  validateProject(newProject);

  let project = await projectRepository.createProject(newProject);
  return project;
};

export const getProject = async (projectId: number): Promise<ProjectOutput | null> => {
  const project = await projectRepository.getProject(projectId);
  return project;
};

export const existsProject = async (projectId: number): Promise<boolean> => {
  const project = await projectRepository.getProject(projectId);
  return !!project;
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

export const getAllProjects = async (): Promise<ProjectOutput[]> => {
  const projects = await projectRepository.getAllProjects();
  return projects;
};
