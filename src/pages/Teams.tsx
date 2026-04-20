import React from "react";
import * as Lucide from "lucide-react";

const Teams = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 px-6 flex items-center justify-center">
      <div className="text-center">
        <Lucide.ShieldCheck size={60} className="mx-auto text-blue-500 mb-6" />
        <h2 className="text-4xl font-black uppercase italic">Your Squads</h2>
        <p className="text-gray-500 mt-2">Manage your hackathon teams here.</p>
      </div>
    </div>
  );
};
export default Teams;