import { ProjectInput } from '../../data-access/models/projects/project-model';

import * as stringValidations from '../../common/utils/validations/string-validator';

export const validateProject = (newProject: ProjectInput): void => {
  validateTitle(newProject.title);
  validateDescription(newProject.description);
  validateDocumentation(newProject.documentation);
  validateSkills(newProject.skills);
  validateTechnologies(newProject.technologies);
  validateTags(newProject.tags);
};

const validateTitle = (projectTitle: string): void => {
  stringValidations.throwExeptionIfEmptyString(projectTitle, 'The project title should not be empty.');
  stringValidations.throwExceptionIfMinLength(
    projectTitle,
    3,
    'The project title should be at least 3 characters long.',
  );
};

const validateDescription = (projectDescription: string): void => {
  stringValidations.throwExeptionIfEmptyString(projectDescription, 'The project description should not be empty.');
  stringValidations.throwExceptionIfMinLength(
    projectDescription,
    10,
    'The project description should be at least 10 characters long',
  );
};

const validateDocumentation = (projectDocumentation: string): void => {
  stringValidations.throwExeptionIfEmptyString(projectDocumentation, 'The project documentation should not be empty.');
  stringValidations.throwExceptionIfMinLength(
    projectDocumentation,
    30,
    'The project documentation should be at least 30 characters long',
  );
};

const validateSkills = (projectSkills: [string]): void => {
  if (projectSkills.length < 1) {
    throw new Error('The project should have at least one skill.');
  }
};

const validateTechnologies = (projectTechnologies: [string]): void => {
  if (projectTechnologies.length < 1) {
    throw new Error('The project should have at least one technology.');
  }
};

const validateTags = (projectTags: [string]): void => {
  if (projectTags.length < 1) {
    throw new Error('The project should have at least one tag.');
  }
};
