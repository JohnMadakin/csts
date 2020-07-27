import mongoose from 'mongoose';

import timeStamps from './hooks/timestamps';
import { RequestDocument } from './documents/RequestDocument';
import normalizerequest from './hooks/nomarlizerequest';

const requestSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },

  description: String,
  status: {
    type: String,
    required: true,
    enum: [
      'new',
      'closed',
      'canceled',
      'pending',
      'responded',
      'processing'
    ],
    default: 'new'
  },
  ticketType: {
    type: String,
    required: true,
    enum: [
      'request',
      'incident',
      'task',
      'problem'
    ]
  },
  ticketCategory: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    index: true
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  }]

});

requestSchema.plugin(timeStamps);
requestSchema.plugin(normalizerequest);


export default mongoose.model<RequestDocument>('Request', requestSchema);
