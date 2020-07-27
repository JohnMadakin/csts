import { Request, Response, NextFunction } from "express";

import { findByEmail } from '../services/User.service';
import { sendErrorResponse } from '../utils/util';
import { verifyToken } from '../helpers/jwthelper';

export const permissionAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { useremail } } = req;

  const userFound = await findByEmail(useremail);
  if (!userFound || userFound.isBlocked) {
    return sendErrorResponse({
      name: 'permission_error',
      message: 'Permission denied.',
      statusCode: 403
    }, res);
  }
  if (!userFound.verified) {
    return sendErrorResponse({
      name: 'permission_error',
      message: 'Permission denied. please verify you email address',
      statusCode: 403
    }, res);
  }
  next();
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { userRole } } = req;

  if (!userRole || !['admin', 'agent'].includes(userRole)) {
    return sendErrorResponse({
      name: 'permission_error',
      message: 'Permission denied.',
      statusCode: 403
    }, res);
  }
  next();
}


export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  let message = 'Missing token';
  const name = 'auth_error';
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendErrorResponse({ name, message, statusCode: 401 }, res);
    }

    const [bearer, userToken] = token.split(' ');
    const checkToken = verifyToken(userToken);

    if (checkToken.name === 'TokenExpiredError') {
      message = 'Token TimedOut';
      return sendErrorResponse({ name, message, statusCode: 400 }, res);
    }
    if (!checkToken.user || checkToken.name === 'JsonWebTokenError') {
      message = 'Invalid Token';
      return sendErrorResponse({ name, message, statusCode: 400 }, res);
    }

    req.body.userId = checkToken.user.id;
    req.body.useremail = checkToken.user.email;
    req.body.userRole = checkToken.user.role && checkToken.user.role.name;

    return next();
  } catch (error) {
    message = 'Invalid Token';
    return sendErrorResponse({ name, message, statusCode: 401 }, res);
  }
}
