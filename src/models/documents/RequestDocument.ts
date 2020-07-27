import mongoose from "mongoose";
import { ObjectID } from 'mongodb';

export type RequestDocument = mongoose.Document & {
  subject: string;
  user: ObjectID,
  description: string;
  status: string,
  ticketType: string,
  ticketCategory: ObjectID,
};
