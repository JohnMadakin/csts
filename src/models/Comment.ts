import mongoose from 'mongoose';

import timeStamps from './hooks/timestamps';
import { CommentDocuments } from './documents/CommentDocuments';


const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',//
    index: true,
  },

  requestId: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
  },

});

commentSchema.plugin(timeStamps);

export default mongoose.model<CommentDocuments>('Comment', commentSchema);
