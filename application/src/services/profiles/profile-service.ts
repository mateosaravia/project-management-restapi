import * as exceptions from '../../common/exceptions/exceptions';
import * as userService from '../users/user-service';
import * as profileRepository from '../../data-access/repositories/profiles/profile-repository';

import { validateProfile } from './profile-validator';
import { ProfileInput, ProfileOutput } from '../../data-access/models/profiles/profile-model';

export const createProfile = async (userId: number, newProfile: ProfileInput): Promise<ProfileOutput> => {
  validateProfile(newProfile);

  let user = await userService.getUserById(userId);
  if (!user) {
    throw new exceptions.ElementNotFoundException(`Unable to create profile, user with id ${userId} not found`);
  }

  let existsProfile: boolean = await existsProfileByUserId(userId);
  if (existsProfile) {
    throw new exceptions.ElementAlreadyExists(`Profile with userId ${userId} already exists`);
  }

  newProfile.userId = userId;
  return await profileRepository.createProfile(newProfile);
};

export const updateProfile = async (userId: number, updatedProfile: ProfileInput): Promise<ProfileOutput> => {
  validateProfile(updatedProfile);

  let existsProfile: boolean = await existsProfileByUserId(userId);
  if (!existsProfile) {
    throw new exceptions.ElementNotFoundException(`Profile with userId ${userId} not found`);
  }

  return await profileRepository.updateProfile(userId, updatedProfile);
};

export const getProfileById = async (userId: number): Promise<ProfileOutput | null> => {
  const profile = await profileRepository.getProfileByUserId(userId);
  return profile;
};

export const existsProfileByUserId = async (userId: number): Promise<boolean> => {
  const profile = await profileRepository.getProfileByUserId(userId);
  return !!profile;
};
