import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] }, // Array of strings
  bio: { type: String, default: "" },
  github: { type: String, default: "" }    // Naya field add kiya
});

export default mongoose.models.User || mongoose.model('User', UserSchema);