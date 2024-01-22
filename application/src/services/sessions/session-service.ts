import { validateLogin } from './session-validator';
import { ElementInvalidException } from '../../common/exceptions/exceptions';
import * as userService from '../users/user-service';
import { comparePassword } from '../../common/utils/hasher';
import * as tokenService from '../tokens/tokens-service';

export const loginUser = async (loginInfo: any): Promise<string> => {
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

  return token;
};

export const logoutUser = async (token: string): Promise<void> => {
  await tokenService.blacklistToken(token);
};
