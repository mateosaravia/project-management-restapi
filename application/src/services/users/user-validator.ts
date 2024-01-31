import * as stringValidators from '../../common/utils/validations/string-validator';
import { UserInput } from '../../data-access/models/users/user-model';

import { ROLES } from '../../common/utils/constants/constants';

export const validateUser = (newUser: UserInput): void => {
  validateUsername(newUser.username);
  validatePassword(newUser.password);
  validateEmail(newUser.email);
  validateRole(newUser.role);
};

const validateUsername = (username: string): void => {
  stringValidators.throwExeptionIfEmptyString(username, 'Username cannot be empty');
  stringValidators.throwExceptionIfMinLength(username, 3, 'Username must be at least 3 characters long');
};

const validatePassword = (password: string): void => {
  stringValidators.throwExeptionIfEmptyString(password, 'Password cannot be empty');
  stringValidators.throwExceptionIfMinLength(password, 6, 'Password must be at least 8 characters long');
  stringValidators.throwExceptionIfNotContainsLetters(password, 'Password must contain at least one letter');
  stringValidators.throwExceptionIfNotContainsNumbers(password, 'Password must contain at least one number');
  stringValidators.throwExceptionIfNotContainsSpecialCharacters(
    password,
    'Password must contain at least one special character',
  );
};

const validateEmail = (email: string): void => {
  stringValidators.throwExeptionIfEmptyString(email, 'Email cannot be empty');
  stringValidators.throwExceptionIfNotValidEmail(email, 'Email is not valid');
};

const validateRole = (role: string): void => {
  if (role) {
    if (!ROLES.includes(role)) {
      stringValidators.throwExeptionIfEmptyString('', 'Role is not valid');
    }
  } else {
    stringValidators.throwExeptionIfEmptyString('', 'Role is required');
  }
};
