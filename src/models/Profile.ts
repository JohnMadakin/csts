import mongoose from 'mongoose';
import timeStamps from './hooks/timestamps';

const profileSchema = new mongoose.Schema({
  location: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  imageUrl: String,
  age: Number,
});

profileSchema.plugin(timeStamps);

export default profileSchema;
