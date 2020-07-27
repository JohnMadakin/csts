import mongoose from 'mongoose';

import { RoleDocument } from './documents/RoleDocument';


const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'admin',
      'public_user',
      'agent'
    ],
    default: 'public_user'
  },
});

export default mongoose.model<RoleDocument>('Role', roleSchema);
