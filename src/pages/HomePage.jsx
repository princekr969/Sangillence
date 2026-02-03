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
  ScrollToTop,
  
} from '../components/index.js';

function HomePage() {

  return (
    <> 
      <div className="relative z-0 cursor-default">
        <Navbar/>
        <Hero />
        <About />
        <Awards />
        <Skills />
        <Results />
        <Timeline />
        <Testimonial/>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default HomePage;
