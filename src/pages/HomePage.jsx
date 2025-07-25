import {
  Hero,
  About,
  Benefits,
  Skills,
  Results,
  Awards,
  Timeline,
  Footer,
  CTA,
  Navbar,
} from '../components/index.js';

function HomePage() {

  return (
    <> 
      <div className="relative z-0 cursor-default">
        <Navbar/>
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
    </>
  );
}

export default HomePage;
