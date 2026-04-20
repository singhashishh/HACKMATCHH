import { Router, Request, Response } from 'express'; // Fixed Line 1
import User from '../models/User';

const router = Router();

// SIGNUP: /api/signup
router.post('/signup', async (req: Request, res: Response) => { // Fixed Line 10
  try {
    const { username, email, password, bio, skills, github } = req.body;

    // Skills ko string se array mein convert karna
    const skillsArray = typeof skills === 'string' 
      ? skills.split(',').map((s: string) => s.trim()) 
      : skills;

    const newUser = new (User as any)({
      username,
      email,
      password,
      bio,
      skills: skillsArray,
      github
    });

    await newUser.save();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Registration failed" });
  }
});

// LOGIN: /api/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await (User as any).findOne({ email, password });
    if (user) {
      res.json({ message: "Ok", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;