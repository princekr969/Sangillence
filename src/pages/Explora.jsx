import { Navbar, Footer } from "../components";
import { ExploraAnimation } from "../components";

function Explora() {
  return (
    <div className="explora-page min-h-screen bg-black">
      <div className="explora-navbar">
        <Navbar />
      </div>
      <ExploraAnimation />
      <Footer />
    </div>
  );
}

export default Explora;

