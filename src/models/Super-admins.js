import mongoose from 'mongoose';

const { Schema } = mongoose;
const superAdminsSchema = new Schema({
  name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  firebaseUid: { type: String, required: true },
  isDeleted: { type: String, default: false },
});

export default mongoose.model('SuperAdmins', superAdminsSchema);
