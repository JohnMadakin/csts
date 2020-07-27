import { ObjectID } from 'mongodb';
import models from '../models';
import { IUserRequest } from '../models/common/IUserRequest';

const { RequestModel } = models;
const populateQuery = [{ path: 'user', select: 'email name verified blocked' }, { path: 'ticketCategory', select: 'name' }, { path: 'comments', select: 'text user' }];

/**
 * @description update verified column of a user model
 * @param {object} userObject - { email, password, name, username }
 * @return {Promise} user
 */
export const create = async (request: IUserRequest) => {
  try {
    const createdRequest = new RequestModel(request);
    return await createdRequest.save();
  } catch (err) {
    return err;
  }
}

/**
 * @description get user requests
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} requests
 */
export const findAllRequests = async (limit: number, offset: number) => {
  return RequestModel.find().populate(populateQuery)
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: 1 })
    .exec();
}

/**
 * @description get user requests by userid
 * @param {ObjectId} userId
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} requests
 */
export const findByUserId = async (userId: ObjectID) => {
  return RequestModel.find({ user: userId }).populate(populateQuery);
}

/**
 * @description get user requests by requestId
 * @param {ObjectId} requestId
 * @return {object} requests
 */
export const findRequestsByRequestId = async (requestId: ObjectID) => {
  return RequestModel.findOne({ _id: requestId }).populate(populateQuery);
}

/**
 * @description get user requests by requestId and userid
 * @param {ObjectId} requestId
 * @param {ObjectID} userId
 * @return {object} requests
 */
export const findByRequestIdUserId = async (requestId: ObjectID, userId: ObjectID) => {
  return RequestModel.findOne({ _id: requestId, user: userId }).populate(populateQuery);
}


/**
 * @description search requests
 * @param {string} search term
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} requests
 */
export const search = (searchTerm: string, limit: number, offset: number) => {
  const reg = new RegExp(`^${searchTerm}`, 'i');
  return RequestModel.find({ subject: { $regex: reg } })
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: 1 })
    .exec();
}

/**
 * @description updates requests status
 * @param {ObjectId} requestId
 * @param {string} status
 * @return {object} requests
 */
export const updateRequestStatus = async (requestId: ObjectID, status: string) => {
  const res = await RequestModel.findOne({ _id: requestId });
  res.status = status;
  return res.save();
}

/**
 * @description search requests
 * @param {string} search term
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} requests
 */
export const reports = (status: string, fromate: Date, toDate: Date) => {
  return RequestModel.find({
    status,
    updatedAt: {
      $gt: fromate,
      $lt: toDate
    }
  });
}

