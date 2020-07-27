import { Request, Response, NextFunction } from "express";
import { createReadStream, createWriteStream } from 'fs';
import { AsyncParser } from 'json2csv';
import { ObjectID } from 'mongodb';
import { create, findByUserId, findAllRequests, search, findByRequestIdUserId, findRequestsByRequestId, updateRequestStatus, reports } from '../services/Request.service';
import { findByName } from '../services/TicketCategory.service';

import config from '../config/app';
import { successResponse, sendErrorResponse, downloadReports } from '../utils/util';
import { generateVerifyHash } from "../helpers/jwthelper";

/**
 * @description customers can create a request
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject, description, status, ticketType, ticketCategory, userId } = req.body;
    let message = 'Request created successfully';
    const ticketCategoryId = await findByName(ticketCategory);

    if (!ticketCategoryId) {
      message = 'Invalid ticket category';
      return sendErrorResponse({ name: 'REQUEST-ERROR:', message, statusCode: 400 }, res);
    }
    const userRequest = await create({
      subject,
      description,
      status,
      ticketType,
      ticketCategory: new ObjectID(ticketCategoryId._id),
      user: new ObjectID(userId),
    });
    if (userRequest && userRequest.errors) {
      return sendErrorResponse({ name: '', message: userRequest.message, statusCode: 400 }, res);
    }
    return successResponse(res, message, 200, { userRequest: userRequest.toJSON() });
  } catch (err) {
    return next(err);
  }
}

export const fetchRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { userRole, userId } } = req;
    let message = 'requests found';
    const limit = Number(config.requestLimits);
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const { subject } = req.query;

    if (userRole === 'public_user') {
      const userRequestResult = await findByUserId(userId);
      message = 'Requests fetched for public user';
      return successResponse(res, message, 200, { userRequests: userRequestResult });
    }

    if (subject) {
      message = 'Requests fetched';
      const fetchSearch = await search(String(subject), limit, offset)
      return successResponse(res, message, 200, { userRequest: fetchSearch });
    }
    const result = await findAllRequests(limit, offset);
    if (!result.length) {
      message = 'No Requests found';
      return successResponse(res, message, 200, { userRequests: [] });
    }

    message = 'Requests fetched';
    return successResponse(res, message, 200, { userRequests: result });
  } catch (err) {
    return next(err);
  }
}

export const fetchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { userRole, userId } } = req;
    let message = 'Requests fetched';
    const requestId = new ObjectID(req.params.id);

    if (userRole === 'public_user') {
      const userRequestResult = await findByRequestIdUserId(requestId, userId);
      if (!userRequestResult) {
        message = 'Request not found';
        return sendErrorResponse({ name: 'NOT_FOUND', message, statusCode: 404 }, res);
      }

      return successResponse(res, message, 200, { userRequest: userRequestResult });
    }

    const result = await findRequestsByRequestId(requestId);
    if (!result) {
      message = 'No Requests found';
      return sendErrorResponse({ name: 'NOT_FOUND', message, statusCode: 404 }, res);
    }

    message = 'Request fetched';
    return successResponse(res, message, 200, { userRequest: result });
  } catch (err) {
    return next(err);
  }
}

export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { userRole, userId, status } } = req;
    let message = 'Request updated';
    const requestId = new ObjectID(req.params.id);

    const result = await findRequestsByRequestId(requestId);
    if (!result) {
      message = 'No Requests found';
      return sendErrorResponse({ name: 'NOT_FOUND', message, statusCode: 404 }, res);
    }
    if (result && result.status === 'closed') {
      message = 'Request has been closed';
      return sendErrorResponse({ name: 'CLOSED', message, statusCode: 400 }, res);
    }

    const updatedResult = await updateRequestStatus(requestId, status)
    message = 'Request staus updated';
    return successResponse(res, message, 200, { userRequest: updatedResult });
  } catch (err) {
    return next(err);
  }
}

export const requestReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query: { status, to } } = req;

    const toDate = new Date() || new Date(String(to));
    const from = new Date(toDate);
    from.setDate(from.getDate() - 30);

    const reportResult = await reports(String(status), from, toDate);

    const fields = [
      {
        value: '_id',
        label: 'Id'
      },
      {
        value: 'subject',
        label: 'Subject'
      }, {
        label: 'user',
        value: 'UserId'
      }, {
        value: 'ticketType',
        label: 'Ticket Type'
      },
      {
        value: 'ticketCategory',
        label: 'Ticket Category'
      },
      {
        value: 'status',
        label: 'Ticket Status'
      },
      {
        value: 'createdAt',
        label: 'Ticket Date'
      },
      {
        value: 'updatedAt',
        label: 'Status Date'
      },
    ];
    const filename = 'requests_' + generateVerifyHash(Date.now() + '').verifyHash + `_${Date.now()}_` + '.csv';
    return downloadReports(res, filename, fields, reportResult);
  } catch (err) {
    return next(err);
  }
}



