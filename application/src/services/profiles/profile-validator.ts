import * as stringValidators from '../../common/utils/validations/string-validator';
import { ProfileInput } from '../../data-access/models/profiles/profile-model';

export const validateProfile = (profile: ProfileInput): void => {
  validateName(profile.name);
  validateLastname(profile.lastname);
  validateBiography(profile.biography);
  validateLocation(profile.location);
};

export const validateName = (name: string): void => {
  stringValidators.throwExeptionIfEmptyString(name, 'Name cannot be empty');
};

export const validateLastname = (lastname: string): void => {
  stringValidators.throwExeptionIfEmptyString(lastname, 'Lastname cannot be empty');
};

export const validateBiography = (biography: string): void => {
  stringValidators.throwExeptionIfEmptyString(biography, 'Biography cannot be empty');
};

export const validateLocation = (location: string): void => {
  stringValidators.throwExeptionIfEmptyString(location, 'Location cannot be empty');
};
