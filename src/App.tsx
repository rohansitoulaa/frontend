import weatherData from "./browser/weatherLocal";
import HomePage from "./components/home/HomePage";
import { useThemeStore } from "./stores/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
weatherData();

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) fetchUser();
  }, [token, fetchUser]);

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ParallaxProvider>
      <div
        className={` h-[100vh]  dark:bg-[linear-gradient(to_right,_#111,_#222,_#111)] dark:!bg-black dark:!text-white `}
      >
        <NavBar />
        <Outlet />
      </div>
    </ParallaxProvider>
  );
};

export default App;
