import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

const Discover = () => {
  const [hackers, setHackers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Current User Info (LocalStorage se utha rahe hain)
  const currentEmail = localStorage.getItem("userEmail") || "guest@grid.io";
  const currentName = currentEmail.split('@')[0]; // Temporary name logic

  useEffect(() => {
    // Database se real hackers fetch karo
    API.get("/users")
      .then(res => {
        // Khud ko list mein mat dikhao (Optional)
        setHackers(res.data.filter((h: any) => h.email !== currentEmail));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentEmail]);

  // ASLI FIX: async function add kiya yahan
  const handleInvite = async (receiverEmail: string, username: string) => {
    try {
      await API.post("/invite", {
        sender: currentName,
        senderEmail: currentEmail,
        receiver: receiverEmail,
        message: `Hacker ${currentName} wants to synchronize for a mission!`
      });
      toast.success(`SIGNAL TRANSMITTED TO ${username.toUpperCase()}`, {
        style: { background: '#0B0E14', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }
      });
    } catch (err) {
      console.error(err);
      toast.error("SIGNAL LOST: Connection failed.");
    }
  };

  const filtered = hackers.filter(h => 
    h.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.skills?.some((s:string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white">
            Squad <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-indigo-600">Finder.</span>
          </h2>
          <div className="mt-12 relative max-w-2xl mx-auto">
            <Lucide.Search className="absolute left-5 top-5 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or skills (React, Python)..."
              className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-blue-500 transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="text-center py-20 text-blue-500 font-black animate-pulse uppercase tracking-widest">Scanning Grid...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((h) => (
              <motion.div 
                key={h._id} 
                whileHover={{ y: -8 }}
                className="bg-[#0B0E14]/60 border border-white/5 p-10 rounded-[40px] backdrop-blur-xl transition-all group"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-6">
                  {h.username[0]}
                </div>
                <h3 className="text-2xl font-black text-white">{h.username}</h3>
                <p className="text-slate-500 text-sm mt-3 mb-8 line-clamp-2">{h.bio || "No mission brief available."}</p>
                
                <div className="flex gap-2 flex-wrap mb-10 h-16 overflow-hidden">
                  {h.skills?.map((s: string) => (
                    <span key={s} className="bg-white/5 text-slate-400 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleInvite(h.email, h.username)}
                  className="w-full py-4 bg-white text-black font-black text-xs rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                >
                  SEND SQUAD INVITE
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;