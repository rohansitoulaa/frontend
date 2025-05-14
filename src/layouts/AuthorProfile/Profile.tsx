import { useRef, useEffect, useState } from "react";
import Toggle from "../../components/common/toggle/Toggle";
import LayoutBtn from "../../components/common/Button/LayoutBtn";
import useMovingShadow from "../../animations/useMovingShadow";
import useBorderColorAnimation from "../../animations/useBorderColorAnimation";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import SureLogout from "../SureLogout";
import { useModalStore } from "../../stores/useModalStore";
import { useThemeStore } from "../../stores/useThemeStore";
import { Archive, Hourglass, LogOut } from "lucide-react"; // <-- import icons

const Profile = () => {
  const { user } = useAuthStore();
  const { open } = useModalStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const shadowRef = useRef<HTMLDivElement>(null);
  useMovingShadow(shadowRef);

  const ref = useRef<HTMLDivElement>(null);
  useBorderColorAnimation(ref);

  const theme = useThemeStore((state) => state.theme);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  useEffect(() => {
    if (user?.fullName === undefined) {
      localStorage.removeItem("auth token");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={shadowRef}
        className="relative flex flex-col gap-3 w-90 min-h-max p-5 shadow-2xl shadow-emerald-50 bg-gradient-to-br from-[#78a6d1] to-[#b2d1e8] dark:bg-gradient-to-br dark:from-[#31273a] dark:to-[#162835] dark:text-white rounded-4xl"
      >
        <div className="flex justify-between">
          <div className="w-10 h-10 bg-black rounded-full" />
          <button
            onClick={open}
            className="px-6 cursor-pointer bg-[#fbfbfb] dark:bg-[#4d2d2d]  rounded-xl"
          >
            Create +
          </button>
        </div>

        <div>
          Hello, <br /> {user?.fullName ?? "Guest"}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3">
          {user?.preferences.map((item, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 dark:text-[#f2f2f2] py-1"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-10 items-center">
            <img
              src={theme === "dark" ? "images/night.png" : "images/morning.png"}
              alt="Theme icon"
            />
            <div>{theme === "dark" ? "Dark mode" : "Light mode"}</div>
          </div>
          <Toggle />
        </div>

        <div className="flex flex-col gap-3">
          <LayoutBtn onClick={() => {}} Icon={Archive} value="Archive" />
          <LayoutBtn onClick={() => {}} Icon={Hourglass} value="Activity" />
          <LayoutBtn
            onClick={handleLogoutClick}
            Icon={LogOut}
            value="Log out"
          />
        </div>

        <div className="flex justify-between">
          <div className="border-b-1 rounded-[2px] cursor-pointer">Help</div>
          <div 
          onClick = {() => navigate("privacy")}
          className="border-b-1 rounded-[2px] cursoe-pointer">Privacy Policy</div>
          <div
            onClick={() => navigate("/faqs")}
            className="border-b-1 rounded-[2px] cursor-pointer"
          >
            Faqs
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <SureLogout
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => {
            localStorage.removeItem("auth token");
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default Profile;
