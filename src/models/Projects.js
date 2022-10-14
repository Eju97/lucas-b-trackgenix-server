import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  employees: [{
    rate: { type: Number, required: true },
    role: { type: String, required: true },
  }],
});

export default mongoose.model('Projects', projectSchema);
