import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  firebaseUid: { type: String, required: true },
  isDeleted: { type: String, default: false },
});

export default mongoose.model('Employees', employeeSchema);
