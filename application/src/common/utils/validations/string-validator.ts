import { ElementInvalidException } from '../../exceptions/exceptions';

export const throwExeptionIfEmptyString = (val: string, message: string): void => {
  if (!val) {
    throw new ElementInvalidException(message);
  }
  if (val === '') {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfMinLength = (val: string, minLength: number, message: string): void => {
  if (val.length < minLength) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfMaxLength = (val: string, maxLength: number, message: string): void => {
  if (val.length > maxLength) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotContainsNumbers = (val: string, message: string): void => {
  var numbers = /[0-9]/g;
  if (!val.match(numbers)) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotContainsLetters = (val: string, message: string): void => {
  var letters = /[a-zA-Z]/g;
  if (!val.match(letters)) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotContainsSpecialCharacters = (val: string, message: string): void => {
  var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
  if (!val.match(specialCharacters)) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotValidEmail = (val: string, message: string): void => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!val.match(mailformat)) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotUppercaseLetters = (val: string, message: string): void => {
  var codeFormat = /^[A-Z]$/;
  for (let i = 0; i < val.length; i++) {
    if (!val[i].match(codeFormat)) {
      throw new ElementInvalidException(message);
    }
  }
};
