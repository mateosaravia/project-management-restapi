import * as stringValidator from '../../common/utils/validations/string-validator';
import { LoginInput } from './session-service';

export const validateLogin = (loginRequest: LoginInput): void => {
  validateEmail(loginRequest.email);
  validatePassword(loginRequest.password);
};

const validateEmail = (email: string): void => {
  stringValidator.throwExeptionIfEmptyString(email, 'Email is required');
};

const validatePassword = (password: string): void => {
  stringValidator.throwExeptionIfEmptyString(password, 'Password is required');
};
