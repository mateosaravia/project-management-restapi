import express from 'express';
export const router = express.Router();

import * as sessionService from '../../services/sessions/session-service';

router.post('/login', async (req, res, next) => {
  try {
    let loginInfo = await sessionService.loginUser(req.body);
    return res.status(200).send(loginInfo);
  } catch (err) {
    return next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send('User not logged in');
    }
    await sessionService.logoutUser(token);
    res.clearCookie('token');
    
    return res.status(200).send('User logged out');
  } catch (err) {
    return next(err);
  }
});