import express from 'express';
export const router = express.Router();

import { CustomRequest, verifyToken } from '../../common/middlewares/auth-middlware';
import * as invitationService from '../../services/invitations/invitation-service';

router.post('/projects/:projectId/invite', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const { users, customMessage } = req.body;
    let response = await invitationService.inviteUsers(parseInt(projectId), users, customMessage);
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.post('/projects/invite/:invitationId/accept', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { invitationId } = req.params;
    let response = await invitationService.acceptInvitation(parseInt(invitationId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.post('/projects/invite/:invitationId/reject', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { invitationId } = req.params;
    let response = await invitationService.rejectInvitation(parseInt(invitationId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.delete(
  '/projects/invite/:invitationId/remove',
  verifyToken,
  async (req: any, res: any, next: any) => {
    try {
      const { invitationId } = req.params;
      let response = await invitationService.removeInvitation(parseInt(invitationId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/projects/:projectId/invitations', verifyToken, async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    let response = await invitationService.getProjectInvitations(parseInt(projectId));
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});

router.get('/projects/invitations', verifyToken, async (req: CustomRequest, res: any, next: any) => {
  try {
    console.log('req.userEmail');
    const userEmail = req.userEmail;
    let response = await invitationService.getUserInvitations(userEmail);
    return res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
});
