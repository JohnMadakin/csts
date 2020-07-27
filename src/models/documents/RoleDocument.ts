import mongoose from "mongoose";

export type RoleDocument = mongoose.Document & {
  name: string;
};
