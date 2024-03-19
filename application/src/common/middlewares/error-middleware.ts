import { NextFunction, Request, Response } from 'express';
import { evalException } from '../exceptions/exceptions';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let evalResult = evalException(err, res);
  return evalResult;
};
