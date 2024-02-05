import { verifyJWT } from '../../services/tokens/token-validator';
import { evalException } from '../exceptions/exceptions';

import { Request as ExpressRequest } from 'express';

export interface CustomRequest extends ExpressRequest {
  userEmail: string;
}

export const verifyToken = async (req: CustomRequest, res: any, next: any) => {
  const authorization = req.header('Authorization');
  const token = authorization ? authorization.replace('Bearer ', '') : null;

  try {
    let decodedToken = await verifyJWT(token);
    req.userEmail = decodedToken.email;
    next();
  } catch (err: any) {
    return evalException(err, res);
  }
};

export const verifyPermissions = (permitedRoles: [String]) => {
  return async (req: any, res: any, next: any) => {
    const authorization = req.header('Authorization');
    const token = authorization ? authorization.replace('Bearer ', '') : null;

    try {
      let decodedToken = await verifyJWT(token);
      if (permitedRoles.includes(decodedToken.role)) {
        next();
      } else {
        return res.status(403).send('User is not authorized to perform this action');
      }
    } catch (err: any) {
      return evalException(err, res);
    }
  };
};
