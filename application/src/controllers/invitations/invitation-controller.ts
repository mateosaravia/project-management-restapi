import express, { NextFunction, Response } from 'express';
export const router = express.Router();

import { CustomRequest, verifyToken } from '../../common/middlewares/auth-middlware';
import * as invitationService from '../../services/invitations/invitation-service';

router.post(
  '/projects/:projectId/invitations',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      const { users, customMessage } = req.body;
      let response = await invitationService.inviteUsers(parseInt(projectId), users, customMessage);
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/projects/invitations/:invitationId/accept',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { invitationId } = req.params;
      let response = await invitationService.acceptInvitation(parseInt(invitationId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/projects/invitations/:invitationId/reject',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { invitationId } = req.params;
      let response = await invitationService.rejectInvitation(parseInt(invitationId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/projects/invitations/:invitationId/remove',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { invitationId } = req.params;
      let response = await invitationService.removeInvitation(parseInt(invitationId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/projects/:projectId/invitations',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      let response = await invitationService.getProjectInvitations(parseInt(projectId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/projects/invitations',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userEmail = req.userEmail;
      let response = await invitationService.getUserInvitations(userEmail);
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);
