import { useLocation } from "react-router-dom";
import NavComp from "./NavComp";
import { navItems } from "./navItem";
import { useState } from "react";
import SureLogout from "../../layouts/SureLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname; // e.g., /admin/Users, /admin/logout

  //use states
  const [showLogout, setShowLogout] = useState(false);

  // Get the path segment after /admin
  const rawSection = path.startsWith("/admin")
    ? path.split("/")[2] || "Dashboard"
    : "";

  // Special case mapping if needed (e.g. lowercase in URL but proper name in UI)
  const normalizedSection = rawSection.toLowerCase();

  const sectionMap: Record<string, string> = {
    "": "Dashboard",
    dashboard: "Dashboard",
    categories: "Categories",
    authors: "Authors",
    news: "News",
    stats: "Stats",
    logout: "Logout",
  };

  const currentSection = (sectionMap[normalizedSection] || "").toLowerCase();

  const handleClick = (section: string) => {
    if (section === "Logout") {
      setShowLogout(true);
    } else {
      navigate(`/admin/${section.toLowerCase()}`);
    }
  };

  return (
    <div className="flex flex-col justify-evenly gap-5 p-5  rounded-r-2xl min-h-[100vh] bg-gradient-to-t from-[#f2eee2] via-[#E1EBF5] to-[#FAE8E7]">
      <div>
        <img className="w-40" src="/images/logo.png" alt="Logo" />
      </div>
      {navItems.map((item, index) => {
        const isActive = item.value.toLowerCase() === currentSection;

        return (
          <NavComp
            key={index}
            onClick={() => handleClick(item.value)}
            isActive={isActive}
            className="ml-5"
            value={item.value}
            imgSrc={item.imgSrc}
          />
        );
      })}
      {showLogout && (
        <SureLogout
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            localStorage.removeItem("auth token");
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
