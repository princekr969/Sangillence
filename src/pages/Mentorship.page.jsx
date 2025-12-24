import About from "../components/Mentorship/About";
import Hero from "../components/Mentorship/Hero";
import MentorshipDeliverables from "../components/Mentorship/MentorshipDeliverables";
import Courses from "../components/Mentorship/Courses";

function MentorShipPage() {

  return (
    <div className="cursor-default">
    <Hero />
    <About />
    <MentorshipDeliverables />
    <Courses/>
    </div>
  );
}

export default MentorShipPage;