import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import * as Lucide from "lucide-react";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend call
      const res = await API.post("/login", form);
      if (res.status === 200) {
        alert("Access Granted! Welcome to the Grid. 🛡️");
        navigate("/dashboard"); // Login ke baad Dashboard bhejo
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed: Check Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-600/20 rounded-2xl mb-4 text-blue-500">
            <Lucide.LogIn size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Identity Check</h2>
          <p className="text-gray-500 text-xs font-bold tracking-widest mt-2 uppercase">Enter the Grid</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Lucide.Mail className="absolute left-4 top-4 text-gray-500" size={18} />
            <input type="email" required placeholder="Hacker Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all font-medium" 
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="relative">
            <Lucide.Lock className="absolute left-4 top-4 text-gray-500" size={18} />
            <input type="password" required placeholder="Secure Key" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all font-medium" 
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            {loading ? "VERIFYING..." : "AUTHORIZE ACCESS"}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-500 text-[10px] font-black tracking-widest uppercase">
          New Identity? <Link to="/signup" className="text-white hover:text-blue-400 underline ml-1">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;