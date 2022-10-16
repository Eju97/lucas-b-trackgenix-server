import mongoose from 'mongoose';

const { Schema } = mongoose;
const superAdminsSchema = new Schema({
  name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

export default mongoose.model('SuperAdmins', superAdminsSchema);
