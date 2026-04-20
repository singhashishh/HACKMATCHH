import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import API from "../services/api";

// TypeScript structure for Hackathon data
interface Hackathon {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const Hackathons = () => {
  const [hacks, setHacks] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se data fetch karne ka logic
    API.get("/hackathons")
      .then((res) => {
        setHacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Grid Connection Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 px-6 pb-20 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter"
          >
            Mission <span className="text-blue-500 text-6xl md:text-8xl">Board</span>
          </motion.h2>
          <p className="text-gray-500 font-bold mt-2 tracking-[0.2em] uppercase text-xs">
            Scanning active frequencies for elite hackathons...
          </p>
        </div>

        {/* Conditional Rendering: Loading vs Grid */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Lucide.Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-gray-500 font-black uppercase tracking-widest text-sm">Synchronizing with Data Center...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hacks.map((h) => (
              <motion.div 
                key={h._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl group hover:border-blue-500/50 transition-all relative overflow-hidden shadow-2xl"
              >
                {/* Decorative Icon */}
                <div className="bg-blue-600/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10">
                  <Lucide.Trophy className="text-blue-500" size={28} />
                </div>

                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                  {h.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium line-clamp-3">
                  {h.description}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</span>
                      <span className="text-[10px] font-black text-green-500 uppercase flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Open
                      </span>
                   </div>
                   <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-[10px] hover:bg-blue-600 hover:text-white transition-all uppercase shadow-lg">
                     Find Partners
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && hacks.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
            <p className="text-gray-500 font-bold uppercase">No Missions Found in this Sector.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Hackathons;