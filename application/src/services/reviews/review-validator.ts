import * as stringValidator from '../../common/utils/validations/string-validator';
import * as numberValidator from '../../common/utils/validations/number-validator';

import { ReviewInput } from '../../data-access/models/reviews/review-model';

export const validateReview = (review: ReviewInput): void => {
  validateComment(review.comment);
  validateRating(review.rating);
};

const validateComment = (comment: string): void => {
  stringValidator.throwExeptionIfEmptyString(comment, 'The comment should not be empty.');
  stringValidator.throwExceptionIfMinLength(comment, 10, 'The comment should be at least 10 characters long.');
};

const validateRating = (rating: number): void => {
  numberValidator.throwExceptionIfNumberLessThan(rating, 0, 'The rating should be a positive number.');
  numberValidator.throwExceptionIfNumberGreaterThan(rating, 5, 'The rating should be at most 5.');
  numberValidator.throwExceptionIfNotNumber(rating, 'The rating should be an integer.');
};
