import React, { useEffect } from "react";
import {
  Hero,
  About,
  Awards,
  Skills,
  Results,
  Timeline,
  Testimonial,
  ScrollToTop,
} from "../components";

function SoboLandingPage() {
  useEffect(() => {
    document.title = "Sangillence | Sobo Results 2026";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "View the results for Sobo and join the Gwalior AI Summit & Hackathon 2026 in Gwalior. Building the future of AI together.");
    }
  }, []);

  return (
    <div className="relative z-0 cursor-default">
      <Hero />
      <About />
      <Awards />
      <Skills />
      <Results />
      <Timeline />
      <Testimonial />
      <ScrollToTop />
    </div>
  );
}

export default SoboLandingPage;

