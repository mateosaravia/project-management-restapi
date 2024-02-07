import { DatabaseException } from '../../../common/exceptions/exceptions';
import { Review, ReviewInput, ReviewOutput } from '../../models/reviews/review-model';

export const createReview = async (review: ReviewInput): Promise<ReviewOutput> => {
  try {
    const newReview = Review.create(review);
    return newReview;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const updateReview = async (reviewId: number, reviewUpdate: ReviewInput): Promise<ReviewOutput> => {
  try {
    await Review.update(reviewUpdate, { where: { id: reviewId } });
    return await Review.findByPk(reviewId);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const deleteReview = async (reviewId: number): Promise<string> => {
  try {
    const deleteResult = await Review.destroy({ where: { id: reviewId } });
    if (deleteResult === 0) {
      return 'Review not deleted';
    }
    return 'Review deleted correctly';
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getProjectReviews = async (projectId: number): Promise<ReviewOutput[]> => {
  try {
    const reviews = await Review.findAll({ where: { projectId } });
    return reviews;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const existsReview = async (reviewId: number): Promise<boolean> => {
  try {
    const review = await Review.findByPk(reviewId);
    return !!review;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};
