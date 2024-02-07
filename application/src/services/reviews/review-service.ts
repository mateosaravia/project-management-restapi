import * as projectService from '../projects/project-service';
import * as userService from '../users/user-service';
import * as exceptions from '../../common/exceptions/exceptions';
import * as reviewRepository from '../../data-access/repositories/reviews/review-repository';

import { validateReview } from './review-validator';

export const createReview = async (
  projectId: number,
  reviewerEmail: string,
  review: ReviewInput,
): Promise<ReviewOutput> => {
  validateReview(review);

  const exists = await projectService.existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const user = await userService.getUser(reviewerEmail);
  if (!user) {
    throw new exceptions.ElementNotFoundException(`User with email ${reviewerEmail} not found`);
  }
  review.qualifierId = user.id;

  const newReview = await reviewRepository.createReview(projectId, review);
  return newReview;
};

export const updateReview = async (reviewId: number, reviewUpdate: ReviewInput): Promise<ReviewOutput> => {
  validateReview(reviewUpdate);

  const exists = await reviewRepository.existsReview(reviewId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Review with id ${reviewId} not found`);
  }

  const updatedReview = await reviewRepository.updateReview(reviewId, reviewUpdate);
  return updatedReview;
};

export const deleteReview = async (reviewId: number): Promise<string> => {
  const exists = await reviewRepository.existsReview(reviewId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Review with id ${reviewId} not found`);
  }

  const deleteResult = await reviewRepository.deleteReview(reviewId);
  return deleteResult;
};

export const getProjectReviews = async (projectId: number): Promise<ReviewOutput[]> => {
  const exists = await projectService.existsProject(projectId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`Project with id ${projectId} not found`);
  }

  const reviews = await reviewRepository.getProjectReviews(projectId);
  return reviews;
};
