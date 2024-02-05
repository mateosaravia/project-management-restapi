import { evalException } from '../exceptions/exceptions';

export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  let evalResult = evalException(err, res);
  return evalResult;
};
