import express from 'express';
import { verifyToken } from '../../common/middlewares/auth-middlware';
export const router = express.Router();

router.post('/projects/:projectId/invite', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const { users } = req.body;
    let response = await projectService.inviteUsers(parseInt(projectId), users);
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.post('/projects/:projectId/invite/accept', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    let response = await projectService.acceptInvitation(parseInt(projectId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.post('/projects/:projectId/invite/reject', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    let response = await projectService.rejectInvitation(parseInt(projectId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.delete('/projects/:projectId/invite', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const { users } = req.body;
    let response = await projectService.removeUsers(parseInt(projectId), users);
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});
