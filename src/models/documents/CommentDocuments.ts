import mongoose from "mongoose";
import { ObjectID } from 'mongodb';

export type CommentDocuments = mongoose.Document & {
  text: string;
  user: ObjectID;
  requestId: ObjectID;
};
