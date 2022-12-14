import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
  description: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('Tasks', taskSchema);
