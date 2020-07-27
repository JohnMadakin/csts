import { Schema, HookNextFunction } from 'mongoose';

export default function normalizerequest(schema: Schema) {
  schema.set('toJSON', {
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });
};
