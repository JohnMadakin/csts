import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';

import { findByEmail } from '../services/User.service';
import { sendErrorResponse } from '../utils/util';
export const validateSignupData = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email } } = req;
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  const userFound = await findByEmail(email);
  if (!userFound) {
    return sendErrorResponse({
      name: 'validationError',
      message: 'Email Already Exists',
      statusCode: 422
    }, res);
  }

  if (hasErrors) {
    return res.status(422).json({ status: 'error', error: errors.array() });
  }
  next();
}

export const validationChains = [
  body('email').isEmail().normalizeEmail(),
  body('password').trim().isLength({ min: 6 }),
  body('firstName').isString().trim().escape().isLength({ min: 2 }),
  body('lastName').isString().trim().escape().isLength({ min: 2 }),
];

export const validateEmailExists = async (req: Request, res: Response, next: NextFunction)  => {
  const { body: { email } } = req;
  const userFound = await findByEmail(email);
  if (!userFound) {
    return sendErrorResponse({
      name: 'validation_error',
      message: 'Email or password is incorrect',
      statusCode: 401
    }, res);  }
  return next();
}

