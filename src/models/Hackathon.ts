import mongoose from 'mongoose';
const HackathonSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  requiredSkills: [String]
});
export default mongoose.model('Hackathon', HackathonSchema);