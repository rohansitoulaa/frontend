import weatherData from "./browser/weatherLocal";
import HomePage from "./components/home/HomePage";
import { useThemeStore } from "./stores/useThemeStore";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";

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
    <div
      className={` h-[100vh]  dark:bg-[linear-gradient(to_right,_#111,_#222,_#111)] dark:!bg-black dark:!text-white `}
    >
      <HomePage />
    </div>
  );
};

export default App;
