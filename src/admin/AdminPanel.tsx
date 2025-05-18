import { useLocation } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./navbar/Navbar";
import Categories from "./categories/Categories"; // Uncomment when implemented
import News from "./authors/News";
import Stats from "./stats/Stats"; // Uncomment when implemented
import Authors from "./users/Authors";

const AdminPanel = () => {
  const location = useLocation();
  const section = location.pathname.split("/")[2]?.toLowerCase() || "dashboard";

  return (
    <div className="w-full h-screen flex bg-white">
      {/* Sidebar Navbar */}
      <div className="w-[220px] h-full shadow-md ">
        <Navbar />
      </div>

      {/* Dynamic Main Panel */}
      <div className="flex-1 ">
        {section === "dashboard" && <Dashboard />}
        {section === "authors" && <Authors />}
        {section === "categories" && <Categories />}
        {section === "news" && <News />}
        {section === "stats" && <Stats />}
      </div>
    </div>
  );
};

export default AdminPanel;
