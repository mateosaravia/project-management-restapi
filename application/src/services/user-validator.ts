import * as stringValidators from '../common/validations/string-validator';

export const validateUser = (newUser): void => { // add :User
  validateUsername(newUser.username);
  validatePassword(newUser.password);
  validateEmail(newUser.email);
};

export const validateUsername = (username: string): void => {
  stringValidators.throwExeptionIfEmptyString(username, 'Username cannot be empty');
  stringValidators.throwExceptionIfMinLength(username, 3, 'Username must be at least 3 characters long');
};

export const validatePassword = (password: string): void => {
  stringValidators.throwExeptionIfEmptyString(password, 'Password cannot be empty');
  stringValidators.throwExceptionIfMinLength(password, 6, 'Password must be at least 8 characters long');
  stringValidators.throwExceptionIfNotContainsLetters(password, 'Password must contain at least one letter');
  stringValidators.throwExceptionIfNotContainsNumbers(password, 'Password must contain at least one number');
  stringValidators.throwExceptionIfNotContainsSpecialCharacters(password, 'Password must contain at least one special character');
};

export const validateEmail = (email: string): void => {
  stringValidators.throwExeptionIfEmptyString(email, 'Email cannot be empty');
  stringValidators.throwExceptionIfNotValidEmail(email, 'Email is not valid');
};
