import express from 'express';
export const router = express.Router();

import * as profileService from '../../services/profiles/profile-service';

router.post('/users/:userId/profiles', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let profile = await profileService.createProfile(parseInt(userId), req.body);
    return res.status(201).send(profile);
  } catch (err) {
    return next(err);
  }
});

router.patch('/users/:userId/profiles', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let updatedProfile = await profileService.updateProfile(parseInt(userId), req.body);
    return res.status(200).send(updatedProfile);
  } catch (err) {
    return next(err);
  }
});

router.get('/users/:userId/profiles', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let profile = await profileService.getProfileById(parseInt(userId));
    return res.status(200).send(profile);
  } catch (err) {
    return next(err);
  }
});
