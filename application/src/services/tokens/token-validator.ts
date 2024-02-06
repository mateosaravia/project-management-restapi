import e from 'express';
import { getClient } from '../../common/config/redis-config';
import { InvalidCredentials } from '../../common/exceptions/exceptions';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

interface DecodedToken {
  email: string;
  userId: number;
  role: string;
}

export const verifyJWT = async (token: string | null): Promise<DecodedToken> => {
  token = token ? token.replace('Bearer ', '') : null;
  if (!token) {
    throw new InvalidCredentials('Invalid token');
  }
  await blacklistedToken(token);
  try {
    let decoded = jwt.verify(token, SECRET_KEY!) as DecodedToken;
    return decoded;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new InvalidCredentials('Token expired');
    } else {
      throw new InvalidCredentials('Invalid token');
    }
  }
};

export const blacklistedToken = async (token: string) => {
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
