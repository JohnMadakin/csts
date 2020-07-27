import { Router } from 'express';

import { createRequest, fetchRequests, fetchById, updateRequest, requestReport } from '../controllers/RequestController';

import { verifyAuth, permissionAuth, adminAuth } from '../middlewares/auth';
import { validateRequestData, requestValidationChains } from '../middlewares/validators';

const router = Router();


/**
 * @description creates a new request
 * @param {string}
 * @param {function}
 */
router.post('/request', verifyAuth, permissionAuth, requestValidationChains, validateRequestData, createRequest);

/**
 * @description fetch all requests
 * @param {string}
 * @param {function}
 */
router.get('/request', verifyAuth, permissionAuth, fetchRequests);

/**
 * @description fetch requests report for the last one month
 * @param {string}
 * @param {function}
 */
router.get('/request/report', verifyAuth, permissionAuth, adminAuth, requestReport);

/**
 * @description fetch by request id
 * @param {string}
 * @param {function}
 */
router.get('/request/:id', verifyAuth, permissionAuth, fetchById);

/**
 * @description fetch by request id
 * @param {string}
 * @param {function}
 */
router.put('/request/:id/status', verifyAuth, permissionAuth, adminAuth, updateRequest);


export default router;
