import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth';
import User from './models/User';

// --- 1. SETUP & CONFIG ---
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" }
});

app.use(cors());
app.use(express.json());

// --- 2. DATABASE MODELS (Prevention of re-definition) ---
const Hackathon = mongoose.models.Hackathon || mongoose.model('Hackathon', new mongoose.Schema({
  title: String, description: String, date: String, location: String
}));

const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({
  title: String, author: String, tags: [String], stars: { type: Number, default: 0 }
}));

const Notification = mongoose.models.Notification || mongoose.model('Notification', new mongoose.Schema({
  sender: String, senderEmail: String, receiver: String, message: String, 
  status: { type: String, default: "pending" }, createdAt: { type: Date, default: Date.now }
}));

// --- 3. API ROUTES ---

app.use('/api', authRoutes);

// Get Real Users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const data = await (User as any).find({}, '-password');
    res.json(data);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// Mission Board
app.get('/api/hackathons', async (req: Request, res: Response) => {
  try {
    const data = await (Hackathon as any).find();
    res.json(data);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// Send Invite & Create Notification
app.post('/api/invite', async (req: Request, res: Response) => {
  try {
    const { sender, senderEmail, receiver, message } = req.body;
    const notif = new (Notification as any)({ sender, senderEmail, receiver, message });
    await notif.save();
    
    // Send Real-time Signal to Receiver
    io.emit(`notification-${receiver}`, notif);
    res.json({ message: "Transmitted" });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// Accept/Reject Invite Status
app.put('/api/notifications/status', async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const notif = await (Notification as any).findByIdAndUpdate(id, { status }, { new: true });
    res.json(notif);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// Get My Pending Notifications
app.get('/api/notifications/:email', async (req: Request, res: Response) => {
  try {
    const list = await (Notification as any).find({ 
      receiver: req.params.email, 
      status: "pending" 
    }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// SEED DATA (Run once: http://localhost:5000/api/seed)
app.get('/api/seed', async (req: Request, res: Response) => {
  await (Hackathon as any).deleteMany({});
  await (Hackathon as any).insertMany([
    { title: "AI Revolution 2025", description: "Build with LLMs.", date: "Feb 20", location: "Global" },
    { title: "Web3 Summit", description: "Decentralized apps.", date: "Mar 05", location: "Mumbai" }
  ]);
  res.send("Grid Refueled! 🚀");
});

// --- 4. REAL-TIME SOCKET ENGINE ---
io.on("connection", (socket) => {
  console.log("Hacker Synced:", socket.id);
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });
});

// --- 5. STARTUP ---
mongoose.connect('mongodb://127.0.0.1:27017/hackmatch')
  .then(() => console.log("GRID DATABASE CONNECTED 🛡️"))
  .catch(err => console.log("DB ERROR:", err));

httpServer.listen(5000, () => {
  console.log("SERVER BOOTED ON 5000 🚀");
});