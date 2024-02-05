import { DatabaseException } from '../../../common/exceptions/exceptions';
import { Project, ProjectInput, ProjectOutput } from '../../models/projects/project-model';
import { ProjectUser } from '../../models/projects/project-user-model';
import { User } from '../../models/users/user-model';

export const createProject = async (userEmail: string, newProject: ProjectInput): Promise<ProjectOutput> => {
  try {
    const project = await Project.create(newProject);

    const projectOwner = await User.findOne({ where: { email: userEmail } });
    await ProjectUser.create({ projectId: project.id, userId: projectOwner!.id });
    
    return project;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getProject = async (projectId: number): Promise<ProjectOutput | null> => {
  try {
    const project = await Project.findByPk(projectId);
    return project || null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getAllProjects = async (): Promise<ProjectOutput[]> => {
  try {
    const projects = await Project.findAll();
    return projects;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const updateProject = async (projectId: number, projectUpdate: ProjectInput): Promise<any> => {
  try {
    await Project.update(projectUpdate, { where: { id: projectId } });
    return await Project.findByPk(projectId);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const deleteProject = async (projectId: number): Promise<string> => {
  try {
    const deleteResult = await Project.destroy({ where: { id: projectId } });
    if (deleteResult === 0) {
      return 'Project not deleted';
    }
    return 'Project deleted correctly';
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};
