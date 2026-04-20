import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  sender: String,   // Kisne bheja
  receiver: String, // Kise milega (Email)
  message: String,  // Kya message hai
  type: { type: String, default: "invite" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);