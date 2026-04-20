import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";

const Dashboard = () => {
  const userName = localStorage.getItem("userEmail")?.split('@')[0] || "Hacker";

  return (
    <div className="min-h-screen pt-28 px-6 pb-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">
              Terminal <span className="text-blue-500">v2.0</span>
            </h2>
            <p className="text-slate-500 font-bold mt-2 tracking-widest text-[10px] uppercase">
              Welcome back, {userName}. System operational.
            </p>
          </div>
          <div className="flex gap-3">
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-blue-400">
               Rank: #42 Global
             </div>
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-green-500">
               Reputation: 100%
             </div>
          </div>
        </div>

        {/* BENTO GRID START */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. MISSIONS PORTAL (Large Card) */}
          <div className="lg:col-span-8 group">
            <Link to="/hackathons">
              <motion.div whileHover={{ y: -5 }} className="bg-[#0B0E14] border border-white/5 p-10 rounded-[40px] h-full relative overflow-hidden transition-all hover:border-blue-500/30 shadow-2xl">
                <div className="z-10 relative">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Active Missions</span>
                  <h3 className="text-4xl font-black text-white mt-4 italic uppercase">Mission Board</h3>
                  <p className="text-slate-500 mt-4 max-w-md font-medium">Join 120+ active hackathons currently streaming in the global grid.</p>
                  <button className="mt-8 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase">Launch Board</button>
                </div>
                <Lucide.Trophy size={200} className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] rotate-12 group-hover:opacity-10 transition-all" />
              </motion.div>
            </Link>
          </div>

          {/* 2. SQUAD FINDER (Right Vertical) */}
          <div className="lg:col-span-4 group">
            <Link to="/discover">
              <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[40px] h-full shadow-2xl relative overflow-hidden">
                <Lucide.Users size={32} className="text-white mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic">Squad Finder</h3>
                <p className="text-white/70 text-sm mt-2 font-medium">Find elite hackers to complete your squad.</p>
                <div className="mt-10 flex -space-x-4">
                   {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-700 bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">H</div>)}
                </div>
              </motion.div>
            </Link>
          </div>

          {/* 3. VAULT (Left) */}
          <div className="lg:col-span-4 group">
            <Link to="/vault">
              <motion.div whileHover={{ y: -5 }} className="bg-[#0B0E14] border border-white/5 p-10 rounded-[40px] transition-all hover:border-purple-500/30">
                <Lucide.Lock size={28} className="text-purple-500 mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic">Project Vault</h3>
                <p className="text-slate-500 text-sm mt-2">Access elite open-source repositories.</p>
              </motion.div>
            </Link>
          </div>

          {/* 4. CHAT (Middle) */}
          <div className="lg:col-span-4 group">
            <Link to="/chat">
              <motion.div whileHover={{ y: -5 }} className="bg-[#0B0E14] border border-white/5 p-10 rounded-[40px] transition-all hover:border-green-500/30">
                <Lucide.MessageSquare size={28} className="text-green-500 mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic">Secure Comms</h3>
                <p className="text-slate-500 text-sm mt-2">Real-time encrypted communication.</p>
              </motion.div>
            </Link>
          </div>

          {/* 5. RANKING (Right) */}
          <div className="lg:col-span-4 group">
            <Link to="/leaderboard">
              <motion.div whileHover={{ y: -5 }} className="bg-[#0B0E14] border border-white/5 p-10 rounded-[40px] transition-all hover:border-yellow-500/30">
                <Lucide.Award size={28} className="text-yellow-500 mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic">Hall of Fame</h3>
                <p className="text-slate-500 text-sm mt-2">View global hacker standings.</p>
              </motion.div>
            </Link>
          </div>

        </div>
        {/* BENTO GRID END */}

      </div>
    </div>
  );
};

export default Dashboard;