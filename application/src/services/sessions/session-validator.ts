import * as stringValidator from '../../common/validations/string-validator';

export const validateLogin = (loginRequest: any): void => {
  validateEmail(loginRequest.email);
  validatePassword(loginRequest.password);
};

const validateEmail = (email: string): void => {
  stringValidator.throwExeptionIfEmptyString(email, 'Email is required');
};

const validatePassword = (password: string): void => {
  stringValidator.throwExeptionIfEmptyString(password, 'Password is required');
};
