import express, { NextFunction, Response } from 'express';
export const router = express.Router();

import * as profileService from '../../services/profiles/profile-service';
import { CustomRequest } from '../../common/middlewares/auth-middlware';

router.post(
  '/users/:userId/profiles',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      let profile = await profileService.createProfile(parseInt(userId), req.body);
      return res.status(201).send(profile);
    } catch (err) {
      return next(err);
    }
  },
);

router.patch(
  '/users/:userId/profiles',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      let updatedProfile = await profileService.updateProfile(parseInt(userId), req.body);
      return res.status(200).send(updatedProfile);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/users/:userId/profiles',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      let profile = await profileService.getProfileById(parseInt(userId));
      return res.status(200).send(profile);
    } catch (err) {
      return next(err);
    }
  },
);
