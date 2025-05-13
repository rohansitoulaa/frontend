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
    users: "Users",
    authors: "Authors",
    stats: "Stats",
    logout: "Logout",
  };

  const currentSection = sectionMap[normalizedSection] || "";

  const handleClick = (section: string) => {
    if (section === "Logout") {
      setShowLogout(true);
    }
  };

  return (
    <div className="flex flex-col justify-evenly gap-5 p-5 shadow-xl rounded-4xl w-1/3 bg-linear-90 from-[#FFF4EC] to-[#ebe5e1]">
      <div>
        <img className="w-40" src="images/logo.png" alt="Logo" />
      </div>
      {navItems.map((item, index) => {
        const isActive = item.value === currentSection;
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
