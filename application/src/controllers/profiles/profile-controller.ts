import express from 'express';
export const router = express.Router();

router.post('/users/:userId/profiles', async (req, res, next) => {
  try {
    let profile = profileService.createProfile(req.body);
    return res.status(201).send(profile);
  } catch (err) {
    return next(err);
  }
});

router.patch('/users/:userId/profiles', async (req, res, next) => {
  try {
    let updatedProfile = profileService.updateProfile(req.body);
  } catch (err) {
    return next(err);
  }
});

router.get('/users/:userId/profiles', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let profile = profileService.getProfileById(userId);
    return res.status(200).send(profile);
  } catch (err) {
    return next(err);
  }
});
