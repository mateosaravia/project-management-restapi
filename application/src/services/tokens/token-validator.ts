import { getClient } from '../../common/config/redis-config';
import { InvalidCredentials } from '../../common/exceptions/exceptions';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjX';

export const verifyJWT = async function (token: string | null) {
  token = token ? token.replace('Bearer ', '') : null;
  if (!token) {
    throw new InvalidCredentials('Invalid token');
  }
  await blacklistedToken(token);
  let decoded = jwt.verify(token, SECRET_KEY, function (err, decodedToken) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        throw new InvalidCredentials('Token expired');
      } else {
        throw new InvalidCredentials('Invalid token');
      }
    }
    return decodedToken;
  });
  return decoded;
};

export const blacklistedToken = async function (token: string) {
  let reply;
  try {
    const redisClient = getClient();
    reply = await redisClient?.get(token);
  } catch (err) {
    throw new Error('Error accessing redis database');
  }
  if (reply === 'loggedOutToken') {
    throw new InvalidCredentials('Token expired');
  }
};
