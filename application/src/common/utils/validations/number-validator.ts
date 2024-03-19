import { ElementInvalidException } from '../../exceptions/exceptions';

export const throwExceptionIfNumberLessThan = (val: number, min: number, message: string): void => {
  if (val < min) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNumberGreaterThan = (val: number, max: number, message: string): void => {
  if (val > max) {
    throw new ElementInvalidException(message);
  }
};

export const throwExceptionIfNotNumber = (val: any, message: string): void => {
  if (!val || isNaN(val)) {
    throw new ElementInvalidException(message);
  }
};
