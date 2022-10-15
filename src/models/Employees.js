import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeesSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: Number, required: true },
});

export default mongoose.model('Employess', employeesSchema);
