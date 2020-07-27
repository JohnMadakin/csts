import mongoose from 'mongoose';

import timeStamps from './hooks/timestamps';
import strippassword from './hooks/strippassword';
import { UserDocument } from './documents/UserDocument';

import profileSchema from './Profile';
import roleSchema from './Role';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: roleSchema.schema,
  accountVerifyToken: String,
  accountVerifyTokenExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  profile: profileSchema,

});

userSchema.plugin(timeStamps);
userSchema.plugin(strippassword);

export default mongoose.model<UserDocument>('User', userSchema);
