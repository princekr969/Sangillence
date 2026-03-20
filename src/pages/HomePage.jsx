import { useLocation } from "react-router-dom";
import { Navbar } from "../components";

function HomePage() {
  const { pathname } = useLocation();
  const showTopBar = pathname === "/";

  return (
    <div className="min-h-screen bg-white">
      {showTopBar && <Navbar />}
      {/* Empty home/landing page — ready for new design */}
    </div>
  );
}

export default HomePage;
