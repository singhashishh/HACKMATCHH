import React from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react"; 

const Vault = () => {
  const projects = [
    { title: "De-Chat App", stars: 150, tags: ["React", "Node"], author: "Ashish" },
    { title: "MediChain AI", stars: 85, tags: ["Python", "Solidity"], author: "Rahul" },
    { title: "Eco-Tracker", stars: 64, tags: ["Figma", "React Native"], author: "Sanya" }
  ];

  return (
    <div className="min-h-screen bg-[#020202] pt-32 px-6 pb-20 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="text-left">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter">Project <span className="text-blue-500">Vault</span></h2>
              <p className="text-gray-500 font-bold tracking-widest text-[10px] uppercase mt-2">Elite Open Source Repository</p>
           </div>
           <button className="px-8 py-4 bg-blue-600 rounded-2xl font-black text-xs hover:bg-blue-700 transition-all uppercase">
             Ship Project
           </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex justify-between items-center group transition-all"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{p.title}</h3>
                <p className="text-gray-500 text-[10px] font-black mt-1">BY: @{p.author.toUpperCase()}</p>
                <div className="flex gap-2 mt-6">
                  {p.tags.map(t => (
                    <span key={t} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[8px] font-black uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-4">
                {/* Error-Free GitHub SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                
                <div className="flex items-center gap-1 text-yellow-500 font-black">
                   <span className="text-lg">★</span>
                   <span className="text-sm">{p.stars}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Vault;