import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/common/toggle/Toggle";
import { useState } from "react";

const NoLogin = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const navigate = useNavigate();
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
        {isOn ? (
          <div className="flex gap-10 items-center">
            <img src="images/night.png" alt="" />
            <div>Dark mode </div>
          </div>
        ) : (
          <div className="flex gap-10 items-center">
            <img src="images/morning.png" alt="" />
            <p>Light mode </p>
          </div>
        )}
        <Toggle isOn={isOn} setIsOn={setIsOn} />
      </div>
      <div className="flex flex-col gap-20 justify-center items-center  w-90 min-h-max rounded-xl p-10">
        <Button
          btnTheme="borderBlack"
          value="Login/Signup"
          onClick={handleLoginOnClick}
        />
      </div>
      <div className="flex justify-between">
        <div className="rounded-[2px]">Help</div>
        <div className="rounded-[2px]">Privicy Policy</div>
        <div className="rounded-[2px]">Faqs</div>
      </div>
    </div>
  );
};

export default NoLogin;
