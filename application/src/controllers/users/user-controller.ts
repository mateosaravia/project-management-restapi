import express, { NextFunction, Response } from 'express';
export const router = express.Router();

import * as userService from '../../services/users/user-service';
import { CustomRequest } from '../../common/middlewares/auth-middlware';

router.post('/signup', async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let user = await userService.createUser(req.body);
    return res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
});

router.delete(
  '/users/:userId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      let deleteResult = await userService.deleteUser(parseInt(userId));

      return res.status(200).send(deleteResult);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/users/:userId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      let user = await userService.getUserById(parseInt(userId));

      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  },
);

router.patch(
  '/users/:userId/password',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;

      let updateResult = await userService.updatePassword(parseInt(userId), oldPassword, newPassword);
      return res.status(200).send(updateResult);
    } catch (err) {
      return next(err);
    }
  },
);

router.patch(
  '/users/:userId/username',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { userId } = req.params;
      const { newUsername } = req.body;

      let updateResult = await userService.updateUsername(parseInt(userId), newUsername);
      return res.status(200).send(updateResult);
    } catch (err) {
      return next(err);
    }
  },
);
