import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  email: string;
  name: string;
  password: string;
  accountVerifyToken: string,
  accountVerifyTokenExpires: Date,
  passwordResetToken: string;
  passwordResetExpires: Date;
  verified: boolean;
  profile: {
    name: string;
    gender: string;
    location: string;
    imageUrl: string;
    age: number;
  };
};
