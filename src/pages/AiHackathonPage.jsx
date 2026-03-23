import React, { useEffect } from "react";
import { AiHackathon, Navbar, Footer } from "../components";

function AiHackathonPage() {
  useEffect(() => {
    document.title = "Sangillence";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Join the Gwalior AI Summit and AI Synergy Hackathon 2026 in Gwalior. Build innovative AI solutions and network with tech leaders.");
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

