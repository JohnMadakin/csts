import mongoose from "mongoose";
import { ObjectID } from 'mongodb';

export type CatDocument = mongoose.Document & {
  name: string;
};
