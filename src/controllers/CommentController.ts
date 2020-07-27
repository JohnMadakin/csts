import { Request, Response, NextFunction } from "express";
import { ObjectID } from 'mongodb';
import { comment } from '../services/Comment.service';
import { updateRequestStatus, findByRequestIdUserId, findRequestsByRequestId } from '../services/Request.service';

import { findByName } from '../services/TicketCategory.service';

import config from '../config/app';
import { successResponse, sendErrorResponse } from '../utils/util';

/**
 * @description customers can create a request
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { userRole, userId, text } } = req;
    let message = 'Comment created successfully';
    const requestId = new ObjectID(req.params.id);

    if (userRole === 'public_user') {
      const userRequestResult = await findByRequestIdUserId(requestId, userId);
      if (userRequestResult.status !== 'new' && userRequestResult.status !== 'closed') {
        const commentResult = await comment(text, userId, requestId);
        return successResponse(res, message, 200, { comment: commentResult });
      } else {
        message = 'Unable to comment';
        return sendErrorResponse({ name: 'REQUEST_UNPROCESS', message, statusCode: 400 }, res);
      }
    }

    const commentRes = await comment(text, userId, requestId);
    const requestsByUser = await findRequestsByRequestId(requestId);
    if (requestsByUser.status === 'new') {
      await updateRequestStatus(requestId, 'responded');
    }

    return successResponse(res, message, 200, { comment: commentRes });
  } catch (err) {
    return next(err);
  }
}
