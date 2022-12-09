import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Tasks' },
  employee: { type: Schema.Types.ObjectId, ref: 'Employees' },
  project: { type: Schema.Types.ObjectId, ref: 'Projects' },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('TimeSheets', timeSheetsSchema);
