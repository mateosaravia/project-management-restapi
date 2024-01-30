import express from 'express';
export const router = express.Router();

import * as projectService from '../../services/projects/project-service';

router.post('/projects', async (req, res, next) => {
  try {
    let project = await projectService.createProject(req.body);
    return res.status(201).send(project);
  } catch (err) {
    return next(err);
  }
});

router.put('/projects/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let projectUpdated = projectService.updateProject(parseInt(projectId), req.body);
    return res.status(200).send(projectUpdated);
  } catch (err) {
    return next(err);
  }
});

router.get('/projects/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let project = projectService.getProject(parseInt(projectId));
    return res.status(200).send(project);
  } catch (err) {
    return next(err);
  }
});

router.get('/projects', async (req, res, next) => {
  try {
    let projects = projectService.getAllProjects();
    return res.status(200).send(projects);
  } catch (err) {
    return next(err);
  }
});

router.delete('/projects/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let response = projectService.deleteProject(parseInt(projectId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});