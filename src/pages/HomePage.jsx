import Hero from '../components/Landing/Hero';
import About from '../components/Landing/About';
import Benefits from '../components/Landing/Benefits';
import Skills from '../components/Landing/Skills';
import Results from '../components/Landing/Results';
import Awards from '../components/Landing/Awards';
import Timeline from '../components/Landing/Timeline';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Benefits />
      <Skills />
      <Results />
      <Awards />
      <Timeline />
      <CTA />
      <Footer />
    </div>
  );
}

export default HomePage;
