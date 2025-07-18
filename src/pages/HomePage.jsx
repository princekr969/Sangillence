import {
  Hero1,
  Benefits1,
  About,
  Benefits,
  Skills,
  Results,
  Awards,
  Timeline,
  Footer,
  CTA,
  Timeline1
} from '../components/index.js';

function HomePage() {

  return (
    <> 

      <div className="relative z-0">
        {/* <Hero /> */}
        <Hero1/>
        <About />
        <Benefits1 />
        {/* <Benefits /> */}
        <Skills />
        <Results />
        <Awards />
        {/* <Timeline /> */}
        <Timeline1/>
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
