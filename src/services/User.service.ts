import models from '../models';
import { IUser } from '../models/common/IUser';

const { UserModel } = models;


/**
 * @description finds a user by email
 * @param {string} email
 * @return {Promise} user
 */
export const findByEmail = (email: string) => {
  return UserModel.findOne({ email });
}

/**
 * @description finds a user by email/hash
 * @param {string} email
 * @param {string} verify
 * @return {Promise} user
 */
export const findByEmailHash = (email: string, hash: string, verified:boolean) => {
  return UserModel.findOne({ email, accountVerifyToken: hash, verified });
}

/**
 * @description update verified column of a user model
 * @param {integer} _id
 * @param {boolean} verify
 * @return {array} user
 */

export const update = async (_id: number, verified: boolean) => {
  return UserModel.findOneAndUpdate({ _id }, { verified }, { new: true });
}


  /**
   * @description update verified column of a user model
   * @param {object} userObject - { email, password, name, }
   * @return {Promise} user
   */
export const create = async (user: IUser ) => {
  try {
    const createdUser = new UserModel(user);
    return createdUser.save();
  } catch (err) {
    return err;
  }
}
