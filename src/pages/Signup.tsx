import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({ 
    username: "", email: "", password: "", bio: "", skills: "", github: "" 
  });
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/signup", form);
      alert("Welcome to the Grid, Hacker! 🚀");
      navigate("/login");
    } catch (err) {
      alert("Registration Error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030406] text-white flex items-center justify-center p-6 pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl bg-[#0B0E14] border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Hacker Onboarding</h2>
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Initialize your global identity</p>
        </div>

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" required placeholder="Hacker Name" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" 
            onChange={(e) => setForm({...form, username: e.target.value})} />
          
          <input type="email" required placeholder="Grid Email" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" 
            onChange={(e) => setForm({...form, email: e.target.value})} />
          
          <input type="password" required placeholder="Secure Key" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" 
            onChange={(e) => setForm({...form, password: e.target.value})} />

          <input type="text" placeholder="GitHub URL (Optional)" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" 
            onChange={(e) => setForm({...form, github: e.target.value})} />

          <div className="md:col-span-2">
            <input type="text" placeholder="Skills (e.g. React, Python, AI)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" 
              onChange={(e) => setForm({...form, skills: e.target.value})} />
          </div>

          <div className="md:col-span-2">
            <textarea placeholder="Tell the grid about yourself..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all h-24 resize-none" 
              onChange={(e) => setForm({...form, bio: e.target.value})} />
          </div>

          <button className="md:col-span-2 py-4 bg-blue-600 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
            JOIN THE GRID
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          In the grid already? <Link to="/login" className="text-white hover:text-blue-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;