import mongoose from 'mongoose';

import timeStamps from './hooks/timestamps';
import { CatDocument } from './documents/CatDocuments';


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    }
  ]
});

categorySchema.plugin(timeStamps);

export default mongoose.model<CatDocument>('Category', categorySchema);
