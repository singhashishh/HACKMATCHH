import React, { useState } from "react";
import * as Lucide from "lucide-react";

const Profile = () => {
  const [skills] = useState(["React", "Node.js", "AI", "TypeScript"]);
  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-12 rounded-[50px] backdrop-blur-3xl text-center">
        <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl font-black shadow-[0_0_50px_rgba(37,99,235,0.4)]">A</div>
        <h2 className="text-4xl font-black uppercase tracking-tighter">Ashish Singh</h2>
        <p className="text-gray-500 mt-4 max-w-md mx-auto">Full-stack architect building the next generation of decentralized hackathon platforms.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {skills.map(s => <span key={s} className="px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest">{s}</span>)}
        </div>
      </div>
    </div>
  );
};
export default Profile;