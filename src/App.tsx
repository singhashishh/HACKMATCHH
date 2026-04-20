import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hackathons from "./pages/Hackathons";
import Discover from "./pages/Discover";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Vault from "./pages/Vault";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030406] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
        </div>
        
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/welcome" element={<div className="pt-44 text-center"><h1 className="text-8xl font-black italic text-white">THE GRID</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;