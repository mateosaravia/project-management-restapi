import * as hasher from '../../common/utils/hasher/hasher';
import * as exceptions from '../../common/exceptions/exceptions';
import * as userRepository from '../../data-access/repositories/users/user-repository';

import { validatePassword, validateUser, validateUsername } from './user-validator';
import { User, UserOutput } from '../../data-access/models/users/user-model';

export const createUser = async (newUser: User): Promise<UserOutput> => {
  validateUser(newUser);

  const existsUser: boolean = await userRepository.existsUserByEmail(newUser.email);
  if (existsUser) {
    throw new exceptions.ElementAlreadyExists(`User with email ${newUser.email} already exists`);
  }

  const alreadyUsedUsername = await userRepository.existsUserByUsername(newUser.username);
  if (alreadyUsedUsername) {
    throw new exceptions.ElementInvalidException('Username is already used');
  }

  newUser.password = await hasher.hashPassword(newUser.password);
  return await userRepository.createUser(newUser);
};

export const deleteUser = async (userId: number): Promise<string> => {
  const existsUser: boolean = await userRepository.existsUserById(userId);
  if (!existsUser) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  return await userRepository.deleteUser(userId);
};

export const updatePassword = async (userId: number, oldPassword: string, newPassword: string): Promise<User> => {
  const existsUser: boolean = await userRepository.existsUserById(userId);
  if (!existsUser) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  validatePassword(newPassword);

  const user = await userRepository.getUserById(userId);
  const isPasswordValid: boolean = await hasher.comparePassword(oldPassword, user!.password);
  if (!isPasswordValid) {
    throw new exceptions.ElementInvalidException('Old password is invalid');
  }

  return await userRepository.updatePassword(userId, newPassword);
};

export const updateUsername = async (userId: number, newUsername: string): Promise<UserOutput> => {
  const existsUser: boolean = await userRepository.existsUserById(userId);
  if (!existsUser) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  validateUsername(newUsername);
  const alreadyUsedUsername = await userRepository.existsUserByUsername(newUsername);
  if (alreadyUsedUsername) {
    throw new exceptions.ElementInvalidException('New username is already used');
  }

  return await userRepository.updateUsername(userId, newUsername);
};

export const getUser = async (email: string): Promise<UserOutput | null> => {
  const user = await userRepository.getUser(email);
  return user;
};

export const getUserById = async (userId: number): Promise<UserOutput | null> => {
  const exists = await userRepository.existsUserById(userId);
  if (!exists) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  const user = await userRepository.getUserById(userId);
  return user;
};

export const existsUserById = async (userId: number): Promise<boolean> => {
  return await userRepository.existsUserById(userId);
};
