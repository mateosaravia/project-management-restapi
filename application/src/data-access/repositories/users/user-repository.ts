import { DatabaseException } from '../../../common/exceptions/exceptions';
import { User, UserInput, UserOutput } from '../../models/users/user-model';

export const createUser = async (newUser: UserInput): Promise<UserOutput> => {
  try {
    return await User.create(newUser);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const deleteUser = async (userId: number): Promise<string> => {
  try {
    const deleteResult = await User.destroy({ where: { id: userId } });
    if (deleteResult === 0) {
      return 'User not deleted';
    }
    return 'User deleted correctly';
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const updatePassword = async (userId: number, newPassword: string): Promise<any> => {
  try {
    await User.update({ password: newPassword }, { where: { id: userId } });
    return await User.findByPk(userId);
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const updateUsername = async (userId: number, newUsername: string): Promise<any> => {
    try {
      await User.update({ username: newUsername }, { where: { id: userId } });
      return await User.findByPk(userId);
    } catch (error: any) {
      throw new DatabaseException(error.message);
    }
  };

export const existsUserById = async (userId: number): Promise<boolean> => {
  try {
    const user = await User.findByPk(userId);
    return !!user;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const existsUserByEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const existsUserByUsername = async (username: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ where: { username } });
    return !!user;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getUser = async (email: string): Promise<UserOutput | null> => {
  try {
    const user = await User.findOne({ where: { email } });
    return user || null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getUserById = async (userId: number): Promise<UserOutput | null> => {
  try {
    const user = await User.findByPk(userId);
    return user || null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};
