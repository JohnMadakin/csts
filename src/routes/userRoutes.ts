import { Router } from 'express';

import { signup, verifyEmail, login } from '../controllers/UsersController';

// import UserAuthMiddleware from '../middleware/UserAuth';
import { validateSignupData, validationChains, validateEmailExists } from '../middlewares/validators';

const router = Router();
// const auth = new AuthController(process.env.VERIFYEMAIL_URL);
// const user = new UsersController(process.env.VERIFYEMAIL_URL);


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


// /**
//  * @description search user
//  * @param {string}
//  * @param {function}
//  */
// router.get('/user/search', user.search);


export default router;
