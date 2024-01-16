import express from 'express';
export const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        let user = await createUser(req.body);
        res.status(201).send('user');
    } catch (err) {
        return next(err);
    }
});

router.delete('/users/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        let deleteResult = await deleteUser(userId);
        res.status(200).send(deleteResult);
    } catch (err) {
        return next(err);
    }
});

router.patch('/users/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        let updateResult = await updateUser(userId, req.body);
        res.status(200).send(updateResult);
    } catch (err) {
        return next(err);
    }
});
