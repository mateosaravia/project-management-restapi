import express, { Response, NextFunction } from 'express';
export const router = express.Router();

import * as reviewService from '../../services/reviews/review-service';
import { CustomRequest, verifyToken } from '../../common/middlewares/auth-middlware';

router.post(
  '/projects/:projectId/reviews',
  verifyToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      const userEmail = req.userEmail;

      let review = await reviewService.createReview(parseInt(projectId), userEmail, req.body);
      return res.status(201).send(review);
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/projects/:projectId/reviews/:reviewId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { reviewId } = req.params;
      let reviewUpdated = await reviewService.updateReview(parseInt(reviewId), req.body);
      return res.status(200).send(reviewUpdated);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/projects/:projectId/reviews/:reviewId',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { reviewId } = req.params;
      let response = await reviewService.deleteReview(parseInt(reviewId));
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  },
);

router.get(
  '/projects/:projectId/reviews',
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { projectId } = req.params;
      let reviews = await reviewService.getProjectReviews(parseInt(projectId));
      return res.status(200).send(reviews);
    } catch (err) {
      return next(err);
    }
  },
);
