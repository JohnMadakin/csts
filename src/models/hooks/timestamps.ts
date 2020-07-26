import { Schema, HookNextFunction } from 'mongoose';


export default function timestamp(schema: Schema) {
  // Add the two fields to the schema
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  // Create a pre-save hook
  schema.pre('save', function (next: HookNextFunction) {
    const now = Date.now();
    (this as any).updatedAt = now;
    // Set a value for createdAt only if it is null
    if (!(this as any).createdAt) {
      (this as any).createdAt = now;
    }
    // Call the next function in the pre-save chain
    next();
  });
};
