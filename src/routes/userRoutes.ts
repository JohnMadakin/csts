import { Router } from 'express';

import { signup, verifyEmail, login } from '../controllers/UsersController';

import { validateSignupData, validationChains, validateEmailExists } from '../middlewares/validators';

const router = Router();


/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post('/signup', validationChains, validateSignupData, signup);

/**
 * @description verify a new user
 * @param {string}
 * @param {function}
 */
router.get('/verifyemail', verifyEmail);


/**
 * @description login a user
 * @param {string}
 * @param {function}
 */
router.post('/login', validateEmailExists, login);

export default router;
