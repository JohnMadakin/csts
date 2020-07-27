import mongoose from "mongoose";
import { RoleDocument } from './RoleDocument';

export type UserDocument = mongoose.Document & {
  email: string;
  name: string;
  password: string;
  isBlocked: boolean,
  role: RoleDocument,
  accountVerifyToken: string,
  accountVerifyTokenExpires: Date,
  passwordResetToken: string;
  passwordResetExpires: Date;
  verified: boolean;
  profile?: {
    name: string;
    gender: string;
    location: string;
    imageUrl: string;
    age: number;
  };
};
