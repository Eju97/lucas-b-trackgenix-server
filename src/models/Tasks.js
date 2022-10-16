import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
  description: { type: String, required: true },
});
export default mongoose.model('Tasks', taskSchema);
