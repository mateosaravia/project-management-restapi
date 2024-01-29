import * as hasher from '../../common/utils/hasher';
import * as exceptions from '../../common/exceptions/exceptions';
import * as userRepository from '../../data-access/repositories/users/user-repository';

import { validateUser } from './user-validator';
import { User, UserOutput } from '../../data-access/models/users/user-model';

export const createUser = async (newUser: User): Promise<UserOutput> => {
  validateUser(newUser);

  const existsUser: boolean = await userRepository.existsUserByEmail(newUser.email);

  if (existsUser) {
    throw new exceptions.ElementAlreadyExists(`User with email ${newUser.email} already exists`);
  }

  newUser.password = await hasher.hashPassword(newUser.password);
  return await userRepository.createUser(newUser);
};

export const deleteUser = async (userId: string): Promise<string> => {
  const existsUser: boolean = await userRepository.existsUserById(userId);

  if (!existsUser) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  return await userRepository.deleteUser(userId);
};

export const updateUser = async (userId: string, updatedUser: User): Promise<User> => {
  validateUser(updatedUser);

  const existsUser: boolean = await userRepository.existsUserById(userId);

  if (!existsUser) {
    throw new exceptions.ElementNotFoundException(`User with id ${userId} not found`);
  }

  return await userRepository.updateUser(userId, updatedUser);
};

export const getUser = async (email: string): Promise<UserOutput | null> => {
  const user = await userRepository.getUser(email);
  return user;
};

export const getUserById = async (userId: string): Promise<UserOutput | null> => {
  const user = await userRepository.getUserById(userId);
  return user;
};
