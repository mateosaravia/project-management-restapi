import { DatabaseException } from '../../../common/exceptions/exceptions';
import { User } from '../../models/users/user-model';

export const createUser = async (newUser: User): Promise<User> => {
  try {
    return await User.create(newUser);
  } catch (error) {
    throw new DatabaseException(error.message);
  }
};

export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const deleteResult = await User.destroy({ where: { id: userId } });
    if (deleteResult === 0) {
      return 'User not deleted';
    }
    return 'User deleted correctly';
  } catch (error) {
    throw new DatabaseException(error.message);
  }
};

export const updateUser = async (userId: string, updatedUser: User): Promise<User> => {
  try {
    await User.update(updatedUser, { where: { id: userId } });
    return await User.findByPk(userId);
  } catch (error) {
    throw new DatabaseException(error.message);
  }
};
