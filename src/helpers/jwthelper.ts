import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


import config from '../config/app';
import { IUser } from '../models/common/IUser';

const { jwtSecret, tokenDuration, hashExpiryDate } = config;

  /**
   * @description This function generates JWT tokens
   * @param {object} userObject
   * @param {string} duration time that a token has before becoming invalid
   * @returns {string} token
   */
export const generateToken = (userObject: IUser, duration: number)  =>{
    const token = jsonWebToken.sign({ user: userObject }, jwtSecret,
      { expiresIn: tokenDuration });
    return token;
  }


  /**
   * @description This function verifies and decodes JWT tokens
   * @param {string} userToken
   * @returns {Object} userObject
   */
  export const verifyToken = (userToken: string)  => {
    try {
      if (!userToken || typeof userToken !== 'string') {
        return false;
      }
      const decodedToken = jsonWebToken.verify(userToken, jwtSecret);
      return decodedToken;
    } catch (err) {
      return err;
    }
  }

  /**
   * @description compares password and hash
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  export const checkHashedPassword = (password: string, hashedPassword: string) => {
  const checkedhashed =  bcrypt.compareSync(password, hashedPassword);
  return checkedhashed;
}



/**
 * @description This function generate an md5 hash and expiry date
 * @param {string} text
 * @returns {Object} {verifyhash, expires}
 */
export const generateVerifyHash = (text: string) => {
  const hash = Math.random().toString(36).substring(7);
  const verifyHash = crypto.createHash('md5').update(text + hash).digest('hex');
  const expires = new Date();
  expires.setHours(expires.getHours() + Number(hashExpiryDate));
  return {
    verifyHash,
    expires
  }
}

