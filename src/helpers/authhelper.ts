import bcrypt from 'bcryptjs';

/**
 * @description hashes a string
 * @param {string} password
 * @returns {string} hash
 */
export const hashPassword = (password: string) => {
  const salt =  bcrypt.genSaltSync(13);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

/**
 * @description compares password and hash
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export const checkHashedPassword = async (password: string, hashedPassword: string) => {
  const checkedhashed = await bcrypt.compare(password, hashedPassword);
  return checkedhashed;
}

  // /**
  //  * @description strips the password, createdAt and updatedAt fields
  //  * @param {object} password
  //  * @returns {object} user object without password
  //  */
  // static stripPassword(userData) {
  //   const {
  //     password,
  //     createdAt,
  //     updatedAt,
  //     ...newUserObject
  //   } = userData;
  //   return newUserObject;
  // }
