import React, { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import io from "socket.io-client";

// Backend se connect karo
const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{user: string, msg: string}[]>([]);
  const username = "Hacker_" + Math.floor(Math.random() * 100); // Temporary name

  useEffect(() => {
    // Message receive karne ka logic
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    return () => { socket.off("receive_message"); };
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message !== "") {
      const msgData = { user: username, msg: message };
      socket.emit("send_message", msgData); // Backend ko bhejo
      setMessage(""); // Input saaf karo
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] pt-24 px-6 flex justify-center font-sans">
      <div className="w-full max-w-4xl h-[75vh] bg-white/5 border border-white/10 rounded-[40px] flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-white/10 flex justify-between bg-blue-600/10">
          <h3 className="font-black italic uppercase tracking-widest text-blue-400">Live Comms: Sector-7</h3>
          <span className="text-[10px] font-bold text-green-500 animate-pulse">● ENCRYPTED</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {chat.map((c, i) => (
            <div key={i} className={`flex flex-col ${c.user === username ? "items-end" : "items-start"}`}>
              <span className="text-[8px] text-gray-500 mb-1 uppercase font-bold">{c.user}</span>
              <div className={`max-w-xs p-4 rounded-2xl ${c.user === username ? "bg-blue-600 rounded-tr-none" : "bg-white/10 rounded-tl-none border border-white/5"}`}>
                <p className="text-sm font-medium">{c.msg}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-6 border-t border-white/10 flex gap-4 bg-black/40">
          <input 
            type="text" 
            value={message}
            placeholder="Broadcast message..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-blue-500 text-white"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="p-4 bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all">
            <Lucide.Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;