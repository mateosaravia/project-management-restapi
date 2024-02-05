import express from 'express';
export const router = express.Router();

import * as userService from '../../services/users/user-service';

router.post('/signup', async (req, res, next) => {
  try {
    let user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
});

router.delete('/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let deleteResult = await userService.deleteUser(parseInt(userId));
    res.status(200).send(deleteResult);
  } catch (err) {
    return next(err);
  }
});

router.get('/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let user = await userService.getUserById(parseInt(userId));
    res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
});

router.patch('/users/:userId/password', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    let updateResult = await userService.updatePassword(parseInt(userId), oldPassword, newPassword);
    res.status(200).send(updateResult);
  } catch (err) {
    return next(err);
  }
});

router.patch('/users/:userId/username', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;
    let updateResult = await userService.updateUsername(parseInt(userId), newUsername);
    res.status(200).send(updateResult);
  } catch (err) {
    return next(err);
  }
});
