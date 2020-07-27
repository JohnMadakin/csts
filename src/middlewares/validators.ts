import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';

import { findByEmail } from '../services/User.service';
import { sendErrorResponse } from '../utils/util';
export const validateSignupData = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email } } = req;
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  const userFound = await findByEmail(email);
  if (userFound) {
    return sendErrorResponse({
      name: 'validation_error',
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

export const requestValidationChains = [
  body('subject').isString().trim().isLength({ min: 2 }),
  body('description').isString().trim().escape().isLength({ min: 10 }),
  body('status').isString().trim().escape().isLength({ min: 2 }),
  body('ticketType').isString().trim().escape().isLength({ min: 2 }),
  body('ticketCategory').isString().trim().escape().isLength({ min: 2 }),

];

export const validateRequestData = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  if (hasErrors) {
    return res.status(422).json({ status: 'error', error: errors.array() });
  }
  next();
}

export const commentValidationChains = [
  body('text').isString().trim().isLength({ min: 2 })
];

export const validateCommentData = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  if (hasErrors) {
    return res.status(422).json({ status: 'error', error: errors.array() });
  }
  next();
}

