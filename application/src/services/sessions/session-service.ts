import { validateLogin } from './session-validator';
import { ElementInvalidException } from '../../common/exceptions/exceptions';
import { comparePassword } from '../../common/utils/hasher/hasher';

import * as userService from '../users/user-service';
import * as tokenService from '../tokens/token-service';

export interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async (loginInfo: LoginInput): Promise<{ token: string }> => {
  validateLogin(loginInfo);

  let user = await userService.getUser(loginInfo.email);
  if (!user) {
    throw new ElementInvalidException('Player credentials are invalid');
  }

  let isPasswordValid: boolean = await comparePassword(loginInfo.password, user.password);
  if (!isPasswordValid) {
    throw new ElementInvalidException('Player credentials are invalid');
  }

  let token = await tokenService.generateJWTUserPermissions(user, user.role);

  return { token };
};

export const logoutUser = async (token: string): Promise<void> => {
  await tokenService.blacklistToken(token);
};
