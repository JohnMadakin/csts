import { Router } from 'express';

import { createComment } from '../controllers/CommentController';

import { verifyAuth, permissionAuth } from '../middlewares/auth';
import { validateCommentData, commentValidationChains } from '../middlewares/validators';

const router = Router();


/**
 * @description comment on a request
 * @param {string}
 * @param {function}
 */
router.post('/request/:id/comment', verifyAuth, permissionAuth, commentValidationChains, validateCommentData, createComment);

export default router;
