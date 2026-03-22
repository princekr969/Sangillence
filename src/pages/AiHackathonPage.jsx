import React, { useEffect } from "react";
import { AiHackathon, Navbar, Footer } from "../components";

function AiHackathonPage() {
  useEffect(() => {
    document.title = "AI Synergy Hackathon 2026 | Gwalior's Premier AI Event";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Join the AI Synergy Hackathon 2026 in Gwalior. Build innovative AI solutions, compete for top prizes, and network with tech leaders.");
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020b1a]">
      <Navbar />
      <AiHackathon />
      <Footer />
    </div>
  );
}

export default AiHackathonPage;

