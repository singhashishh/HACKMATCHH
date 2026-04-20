import React from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";

const Leaderboard = () => {
  const topHackers = [
    { rank: 1, name: "Ashish Singh", points: 2500, badges: 12, level: "Grandmaster" },
    { rank: 2, name: "Rahul Sharma", points: 2100, badges: 8, level: "Elite" },
    { rank: 3, name: "Sanya Roy", points: 1900, badges: 5, level: "Pro" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] pt-32 px-6 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-black italic uppercase mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
          Hall of Fame
        </h2>
        
        <div className="space-y-4">
          {topHackers.map((h) => (
            <motion.div 
              key={h.rank} 
              whileHover={{ x: 10 }}
              className="bg-white/5 border border-white/10 p-6 rounded-[30px] flex items-center justify-between backdrop-blur-xl group hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center gap-6">
                <span className={`text-3xl font-black ${h.rank === 1 ? "text-yellow-400" : "text-gray-500"}`}>#0{h.rank}</span>
                <div>
                  <h4 className="text-xl font-bold uppercase">{h.name}</h4>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{h.level}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">{h.points} XP</div>
                <div className="flex gap-1 justify-end text-yellow-500">
                   {[...Array(3)].map((_, i) => <Lucide.Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;