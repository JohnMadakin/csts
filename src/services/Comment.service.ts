import { ObjectID } from 'mongodb';
import models from '../models';

const { CommentModel, RequestModel } = models;
const populateQuery = [{ path: 'user', select: 'email name verified blocked' }, { path: 'ticketCategory', select: 'name' }];

/**
 * @description comment on a request
 * @param {string} text
 * @param {objectID} userId
 * @param {objectID} requestId
 * @return {Promise} comment
 */
export const comment = async (text: string, userId: ObjectID, requestId: ObjectID) => {
  try {
    const commentOnRequest = new CommentModel({ text, user: userId, requestId });
    const re = await RequestModel.findOneAndUpdate({ _id: requestId }, { $push: { comments: { _id: commentOnRequest._id } } }, { new: true, upsert: true });

    return commentOnRequest.save();
  } catch (err) {
    return err;
  }
}
