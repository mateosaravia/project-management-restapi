import express, { NextFunction, Response } from 'express';
export const router = express.Router();

import * as projectService from '../../services/projects/project-service';
import { CustomRequest, verifyToken } from '../../common/middlewares/auth-middlware';

router.post(
  '/projects',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userEmail = req.userEmail;
      let project = await projectService.createProject(userEmail, req.body);
      return res.status(201).send(project);
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/projects/:projectId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      let projectUpdated = await projectService.updateProject(parseInt(projectId), req.body);
      return res.status(200).send(projectUpdated);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/projects/:projectId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      let project = await projectService.getProject(parseInt(projectId));
      return res.status(200).send(project);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/projects', async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let projects = await projectService.getAllProjects();
    return res.status(200).send(projects);
  } catch (err) {
    return next(err);
  }
});

router.delete(
  '/projects/:projectId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      let response = await projectService.deleteProject(parseInt(projectId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/projects/:projectId/leave',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      const userEmail = req.userEmail;

      let response = await projectService.leaveProject(parseInt(projectId), userEmail);
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/projects/:projectId/remove',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      const { users } = req.body;

      let response = await projectService.removeUsers(parseInt(projectId), users);
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);
