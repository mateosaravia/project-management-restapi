import { getClient } from '../../common/config/redis-config';
import { UserOutput } from '../../data-access/models/users/user-model';
import jwt from 'jsonwebtoken';

const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '12h';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateJWTUserPermissions = async (user: UserOutput, role: string | undefined) => {
  let signOptions = {
    expiresIn: EXPIRATION_TIME,
  };
  let token = jwt.sign({ email: user.email, userId: user.id, role: role }, SECRET_KEY!, signOptions);
  return token;
};

export const blacklistToken = async (token: string) => {
  try {
    const redisClient = getClient();
    const expires = 12 * 60 * 60;

    await redisClient?.set(token, 'loggedOutToken', { EX: expires });
  } catch (err) {
    throw new Error(err + 'Error accessing redis database');
  }
};
