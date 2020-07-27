import { Request, Response, NextFunction } from "express";

import { hashPassword } from '../helpers/authhelper';
import { create, findByEmailHash, update, findByEmail } from '../services/User.service';
import emailTemplate from '../helpers/emailtemplates';
import { sendNotificationEmail } from '../helpers/emailnotification';
import { successResponse, sendErrorResponse } from '../utils/util';
import { generateToken, checkHashedPassword, generateVerifyHash } from '../helpers/jwthelper';

import config from '../config/app';

/**
 * @description user signup controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        email, password: userPassword, firstName, lastName,
      },
    } = req;
    const { verifyHash, expires } = generateVerifyHash(email);
    const result = await create({
      email,
      accountVerifyToken: verifyHash,
      accountVerifyTokenExpires: expires,
      role: { name: 'public_user' },
      password: hashPassword(userPassword),
      name: `${firstName.trim()} ${lastName.trim()}`,
    });
    const user = result.toJSON();

    const message = 'Signup Successfull. Please Verify your email address';

    const token = generateToken(user, Number(config.tokenDuration));
    const verifyLink = `${config.verifyBaseURL}?token=${verifyHash}&email=${email}`;

    sendNotificationEmail(user.email, emailTemplate.verification, verifyLink);

    return successResponse(res, message, 201, { token });
  } catch (err) {
    const statusCode = 422;
    let message = '';

    if (err.code === 11000) {
      message = 'Email Address or username already Exists';
      return sendErrorResponse({ name: 'REG-ERROR:', message, statusCode }, res);
    }
    err.message = 'Some error occured';
    return next(err);
  }
}

/**
 * @description user signup controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { email, password } } = req;
    let message = '';
    const statusCode = 401;

    const userFound = await findByEmail(email);

    if (!userFound) {
      message = 'Email or Password is incorrect';
      return sendErrorResponse({ name: 'LOGIN-ERROR', message, statusCode }, res);
    }

    const { password: hashedPassword } = userFound;
    const isPasswordCorrect = checkHashedPassword(password, hashedPassword);

    if (!isPasswordCorrect) {
      message = 'Email or Password is incorrect';
      return sendErrorResponse({ name: 'LOGIN-ERROR', message, statusCode }, res);
    }
    if (userFound.isBlocked) {
      message = 'Sorry, you cannot login at this time';
      return sendErrorResponse({ name: 'PERM-ERROR', message, statusCode }, res);
    }


    const user = userFound.toJSON();

    const token = generateToken(user, Number(config.tokenDuration));
    message = 'Login Successful';

    return successResponse(res, message, 200, { token });
  } catch (err) {
    return next(err);
  }
}



/**
 * @description this function verify the email of a user
 * @param {object} req request to the sent
 * @param {object} res respond gotten form server
 * @param {object} next  callback funtion
 * @returns {object} an object when the email is successfully verified
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { query: { token: hash, email } } = req;
  const strEmail = String(email);
  const strHash = String(hash);

  let message = 'Email successfully confirmed';
  try {
    const userDoc = await findByEmailHash(strEmail, strHash, false);
    if (!userDoc){
      message = 'Account already verified or invalid token';
      return sendErrorResponse({ name: 'REG-ERROR', message, statusCode: 400 }, res);
    }
    const user = userDoc.toJSON();

    const isExpired = (new Date()).getTime() >= user.accountVerifyTokenExpires.getTime();
    if(isExpired){
      const { verifyHash } = generateVerifyHash(strEmail);
      const verifyLink = `${config.verifyBaseURL}?token=${verifyHash}&email=${email}`;

      sendNotificationEmail(user.email, emailTemplate.verification, verifyLink);
      message = 'Token has Expired. A new verification link have been sent';
      return sendErrorResponse({ name: 'REG-ERROR', message, statusCode: 400 }, res);
     }

    const verifiedUser = await update(user.id, true);
    const token = generateToken(verifiedUser, Number(config.tokenDuration));

    sendNotificationEmail(user.email, emailTemplate.confirmation);
    return successResponse(res, message, 200, {token});
  } catch (err) {
    return next(err);
  }
}
