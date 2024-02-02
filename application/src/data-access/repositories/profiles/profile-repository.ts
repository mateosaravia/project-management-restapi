import { DatabaseException } from '../../../common/exceptions/exceptions';
import { Profile, ProfileInput, ProfileOutput } from '../../models/profiles/profile-model';

export const createProfile = async (profile: ProfileInput): Promise<ProfileOutput> => {
  try {
    const newProfile = await Profile.create(profile);
    return newProfile;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const updateProfile = async (userId: number, updatedProfile: ProfileInput): Promise<any> => {
  try {
    await Profile.update(updatedProfile, { where: { userId } });
    return await Profile.findOne({where: { userId }});
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};

export const getProfileByUserId = async (userId: number): Promise<ProfileOutput | null> => {
  try {
    const profile = await Profile.findOne({ where: { userId } });
    return profile || null;
  } catch (error: any) {
    throw new DatabaseException(error.message);
  }
};
