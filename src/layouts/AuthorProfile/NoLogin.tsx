import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/common/toggle/Toggle";
import { useThemeStore } from "../../stores/useThemeStore";

const NoLogin = () => {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const handleLoginOnClick = () => {
    navigate("authorRegistration");
  };

  return (
    <div
      className="rounded-4xl shadow-2xl p-5 
                bg-gradient-to-r from-[#f2f2f2] to-[#b2d1e8] 
                dark:bg-black dark:bg-none"
    >
      <div className="flex justify-between">
        {theme === "dark" ? (
          <div className="flex gap-10 items-center">
            <img src="images/night.png" alt="Dark mode" />
            <div>Dark mode</div>
          </div>
        ) : (
          <div className="flex gap-10 items-center">
            <img src="images/morning.png" alt="Light mode" />
            <p>Light mode</p>
          </div>
        )}
        <Toggle isOn={theme === "dark"} setIsOn={toggleTheme} />
      </div>

      <div className="flex flex-col gap-20 justify-center items-center  w-90 min-h-max rounded-xl p-10">
        <Button
          btnTheme="borderBlack"
          value="Login/Signup"
          onClick={handleLoginOnClick}
        />
      </div>

      <div className="flex justify-between">
        <div className="rounded-[2px] cursor-pointer">Help</div>
        <div
          onClick={() => navigate("privacy")}
          className="rounded-[2px] cursor-pointer"
        >
          Privacy Policy
        </div>
        <div
          onClick={() => navigate("/faqs")}
          className="rounded-[2px] cursoe-pointer"
        >
          FAQs
        </div>
      </div>
    </div>
  );
};

export default NoLogin;
