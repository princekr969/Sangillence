import { useState, useEffect } from 'react';
import {
  LogoAnimation,
  Hero,
  About,
  Benefits,
  Skills,
  Results,
  Awards,
  Timeline,
  CTA
} from '../components/index.js';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const cleanup = setTimeout(() => {
        setHidden(true);
      }, 800); 
      return () => clearTimeout(cleanup);
    }
  }, [loading]);

  // Prevent scrolling when animation is visible
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hidden]);

  return (
    <>
      {!hidden && <LogoAnimation loading={loading} />}
      <div className="relative z-0">
        <Hero />
        <About />
        <Benefits />
        <Skills />
        <Results />
        <Awards />
        <Timeline />
        <CTA />
      </div>
    </>
  );
}

export default HomePage;
