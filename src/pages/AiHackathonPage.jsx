import { useEffect } from "react";
import { AiHackathon, Navbar } from "../components";

function AiHackathonPage() {
  useEffect(() => {
    document.title = "Sangillence";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Join the Gwalior AI Summit and AI Synergy Hackathon 2026 in Gwalior. Build innovative AI solutions and network with tech leaders.");
    }
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100svh",
      overflow: "hidden",
      background: "#020b1a"
    }}>
      <Navbar />
      <AiHackathon />
    </div>
  );
}

export default AiHackathonPage;
