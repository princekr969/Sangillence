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

