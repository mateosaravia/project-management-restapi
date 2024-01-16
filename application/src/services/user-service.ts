import * as hasher from "../common/utils/hasher";
import * as exceptions from "../common/exceptions/exceptions";

import { validateUser } from "./user-validator";

export const createUser = async (newUser: User): Promise<User> => {
    validateUser(newUser);

    const existsUser: boolean = await userRepository.existsUserByEmail(newUser.email);

    if (existsUser) {
        throw new exceptions.ElementAlreadyExists(`User with email ${newUser.email} already exists`);
    }
    
    newUser.password = await hasher.hashPassword(newUser.password);
    return await userRepository.addUser(newUser);
};

export const deleteUser = async (userId: string): Promise<boolean> => {
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
