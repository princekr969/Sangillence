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
  Testimonial,
} from '../components/index.js';
function HomePage() {

  return (
    <> 
      <div className="relative z-0 cursor-default">
        <Navbar/>
        <Hero />
        <About />
        <Benefits />
        <Awards />
        <Skills />
        <Results />
        <Timeline />
        <Testimonial/>
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
