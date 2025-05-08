import { useState, useEffect, useRef } from "react";
import getCurrentDate from "../../utils/getCurrentDate";
import getLiveTime from "../../utils/getLiveTime";
import { motion } from "framer-motion";
import Profile from "../../layouts/AuthorProfile/Profile";
import NoLogin from "../../layouts/AuthorProfile/NoLogin";
import weatherLocal from "../../browser/weatherLocal";


const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("auth token");
    if (token) {
      // Optional: verify token or decode it to get user
      setIsAuthenticated(true);
    }
  }, []);

  const currentDate = getCurrentDate();
  const [times, setTimes] = useState<string>("");
  // const [weather, setWeather] = useState<any>();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<boolean>(false);

  const weatherRaw = localStorage.getItem("weather")
  const weather = weatherRaw ? JSON.parse(weatherRaw) : null;

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleProfileClick = () => {
    setIsProfileActive(!isProfileActive);
  };

  useEffect(() => {
    getLiveTime((time: string) => setTimes(time));
  }, []);

  useEffect(() => {
    weatherLocal();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-4  gap-4">
      
      {/* Left Section: Date, Time, Weather */}
      <section className="flex flex-col md:w-1/3 items-start gap-2">
        <div>
          <div className="text-sm text-gray-600">{currentDate}</div>
          <div className="text-md font-semibold">{times}</div>
        </div>

        <div>
          {weather ? (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{weather.temp}°C</p>
              <motion.img
                src={weather.iconUrl}
                alt="Swinging Weather Icon"
                className="w-8 h-8"
                animate={{ rotate: [-45, 45] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading weather...</p>
          )}
        </div>
      </section>

      {/* Center Section: Logo */}
      <section className="w-full md:w-1/3 flex justify-center">
        <img
        className="w-50"
        src="images/logo.png" alt="" />
      </section>

      {/* Right Section: Search + Profile */}
      <section className="flex md:w-1/3 justify-end items-center gap-14">
        {/* Search */}
        <div
          ref={searchRef}
          className={`flex items-center gap-2  ${
            isSearchActive ? "border-b-2 border-gray-800" : ""
          }`}
        >
          <input
            placeholder={` ${isSearchActive?"eg: news/ hotnews":""}`}
            type="text"
            className={`bg-transparent outline-none transition-all duration-300 text-sm
              ${isSearchActive ? "w-40 opacity-100" : "w-0 opacity-0"}
              sm:w-40 sm:opacity-100
            `}
          />
          <img
            onClick={handleSearchClick}
            className="w-6 h-6 cursor-pointer"
            src="/images/search.png"
            alt="Search Icon"
          />
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <div
            onClick={handleProfileClick}
            className="w-10 h-10 bg-black rounded-full cursor-pointer"
          ></div>

          {isProfileActive && (
            <div className="absolute right-0 top-12 z-50">
              {isAuthenticated?<Profile />:<NoLogin />}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NavBar;
