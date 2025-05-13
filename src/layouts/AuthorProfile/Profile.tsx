import { useState, useRef } from "react";
import Toggle from "../../components/common/toggle/Toggle";
import LayoutBtn from "../../components/common/Button/LayoutBtn";
import useMovingShadow from "../../animations/useMovingShadow";
import useBorderColorAnimation from "../../animations/useBorderColorAnimation";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import SureLogout from "../SureLogout"; // Adjust path as needed
import { useModalStore } from "../../stores/useModalStore";

const Profile = () => {
  const { user } = useAuthStore();
  const { open } = useModalStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const shadowRef = useRef<HTMLDivElement>(null);
  useMovingShadow(shadowRef);

  const [isOn, setIsOn] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useBorderColorAnimation(ref);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex flex-col gap-3 w-90 min-h-max p-5 shadow-2xl shadow-emerald-50 bg-gradient-to-br from-[#78a6d1] to-[#b2d1e8] rounded-4xl">
        <div className="flex justify-between">
          <div className="w-10 h-10 bg-black rounded-full" />
          <button
            onClick={open}
            className="px-6 cursor-pointer bg-[#fbfbfb] rounded-xl"
          >
            Create +
          </button>
        </div>

        <div>
          Hello, <br /> {user?.fullName ?? "Guest"}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {user?.preferences.map((item, index) => (
            <div key={index} className="text-sm text-gray-700 py-1">
              {item}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-10 items-center">
            <img
              src={isOn ? "images/night.png" : "images/morning.png"}
              alt=""
            />
            <div>{isOn ? "Dark mode" : "Light mode"}</div>
          </div>
          <Toggle isOn={isOn} setIsOn={setIsOn} />
        </div>

        <div className="flex flex-col gap-3">
          <LayoutBtn
            onClick={() => {}}
            url="images/archive.png"
            value="Archive"
          />
          <LayoutBtn
            onClick={() => {}}
            url="images/sand_watch.png"
            value="Activity"
          />
          <LayoutBtn
            onClick={handleLogoutClick}
            url="images/logout.png"
            value="Log out"
          />
        </div>

        <div className="flex justify-between">
          <div className="border-b-1 rounded-[2px]">Help</div>
          <div className="border-b-1 rounded-[2px]">Privacy Policy</div>
          <div className="border-b-1 rounded-[2px]">Faqs</div>
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
