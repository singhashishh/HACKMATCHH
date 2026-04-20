import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Lucide from "lucide-react";
import io from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import API from "../services/api";

const socket = io("http://localhost:5000");

const Navbar = () => {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "test@gmail.com";

  useEffect(() => {
    // 1. Fetch current pending invites
    API.get(`/notifications/${userEmail}`).then(res => setNotifs(res.data));

    // 2. Real-time Invite listener
    socket.on(`notification-${userEmail}`, (data) => {
      setNotifs(prev => [data, ...prev]);
      toast("NEW SQUAD INVITE RECEIVED", { icon: '📡', style: { background: '#0B0E14', color: '#fff' } });
    });

    return () => { socket.off(`notification-${userEmail}`); };
  }, [userEmail]);

  const handleStatus = async (id: string, status: string) => {
    try {
      await API.put('/notifications/status', { id, status });
      setNotifs(prev => prev.filter(n => n._id !== id)); // List se hatao
      if (status === "accepted") {
        toast.success("Squad Formed! Opening Comms...");
        setTimeout(() => navigate("/chat"), 1500); // 1.5 sec baad chat par le jao
      }
    } catch (err) { toast.error("Transmission Failed"); }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <Toaster position="bottom-right" />
      <div className="bg-[#0B0E14]/80 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-2xl flex justify-between items-center shadow-2xl relative">
        <Link to="/" className="text-white font-black italic uppercase text-sm">HACKMATCH</Link>

        <div className="flex items-center gap-6">
          <Link to="/discover" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase">Discover</Link>
          
          {/* NOTIFICATION SECTION */}
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="relative p-1">
              <Lucide.Bell size={18} className={notifs.length > 0 ? "text-blue-500" : "text-slate-400"} />
              {notifs.length > 0 && <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border-2 border-[#0B0E14]"></span>}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-12 right-0 w-80 bg-[#0B0E14] border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden z-50">
                <h4 className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Incoming Signals</h4>
                {notifs.length === 0 ? (
                  <p className="text-xs text-gray-600 py-4 text-center italic">No pending requests...</p>
                ) : (
                  <div className="space-y-3">
                    {notifs.map((n) => (
                      <div key={n._id} className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[11px] font-bold text-white mb-1">From: {n.sender}</p>
                        <p className="text-[10px] text-gray-400 mb-3">{n.message}</p>
                        <div className="flex gap-2">
                          <button onClick={() => handleStatus(n._id, "accepted")} className="flex-1 py-1.5 bg-blue-600 text-[10px] font-black rounded-lg hover:bg-blue-700 transition-all">ACCEPT</button>
                          <button onClick={() => handleStatus(n._id, "rejected")} className="flex-1 py-1.5 bg-white/5 text-[10px] font-black rounded-lg hover:bg-white/10 transition-all">REJECT</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/profile" className="text-slate-400 hover:text-blue-400"><Lucide.User size={20} /></Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;