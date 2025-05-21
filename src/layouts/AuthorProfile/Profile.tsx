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
import Activity from "./Activity";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ArchiveComponent from "./ArchiveComponent";
const Profile = () => {
  const { user } = useAuthStore();
  const { open } = useModalStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const shadowRef = useRef<HTMLDivElement>(null);
  useMovingShadow(shadowRef);

  const ref = useRef<HTMLDivElement>(null);
  useBorderColorAnimation(ref);

  const theme = useThemeStore((state) => state.theme);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleActivity = () => {
    setShowActivityModal(true);
  };
  const handleArchive = () => {
    setShowArchiveModal(true);
  };

  useEffect(() => {
    if (user?.fullName === undefined) {
      localStorage.removeItem("auth token");
      navigate("/login");
    }
  }, [user, navigate]);
  // #F6EED5
  // #E1EBF5
  // #FAE8E7
  return (
    <div className="flex justify-center items-center">
      <div
        ref={shadowRef}
        className="relative flex flex-col gap-3 w-90 min-h-max max-w-150 shadow-2xl shadow-emerald-50 bg-gradient-to-br from-[#defbd8] via-[#e2e0f2] to-[#d4f8d0]
 dark:bg-gradient-to-br dark:from-[#31273a] dark:via-[#0d1d29] dark:to-[#162835] dark:text-white rounded-4xl"
      >
        {showActivityModal ? (
          <TooltipProvider delayDuration={100}>
            <div className="h-[600px]">
              {" "}
              <Activity setShowActivityModal={setShowActivityModal} />
            </div>
          </TooltipProvider>
        ) : (
          // --- PROFILE VIEW ---
          <>
            <div className="flex justify-between p-5">
              <div
                onClick={() => navigate("/profile")}
                className="w-10 h-10 bg-black rounded-full"
              />
              <button
                onClick={open}
                className="px-6 cursor-pointer bg-[#fbfbfb] dark:bg-[#4d2d2d]  rounded-xl"
              >
                Create +
              </button>
            </div>

            <div className="px-5">
              Hello, <br /> {user?.fullName ?? "Guest"}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 px-5">
              {user?.preferences.map((item, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 dark:text-[#f2f2f2] py-1"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex justify-between px-5">
              <div className="flex gap-10 items-center">
                <img
                  src={
                    theme === "dark" ? "images/night.png" : "images/morning.png"
                  }
                  alt="Theme icon"
                />
                <div>{theme === "dark" ? "Dark mode" : "Light mode"}</div>
              </div>
              <Toggle />
            </div>

            <div className="flex flex-col gap-3 px-5">
              <LayoutBtn
                onClick={handleArchive}
                Icon={Archive}
                value="Archive"
              />
              <LayoutBtn
                onClick={handleActivity}
                Icon={Hourglass}
                value="Activity"
              />
              <LayoutBtn
                onClick={handleLogoutClick}
                Icon={LogOut}
                value="Log out"
              />
            </div>

            <div className="flex justify-between px-5">
              <div
                onClick={() => navigate("/chat")}
                className="  cursor-pointer"
              >
                Help
              </div>
              <div
                onClick={() => navigate("/aboutus")}
                className="  cursor-pointer"
              >
                About
              </div>
              <div
                onClick={() => navigate("privacy")}
                className=" cursor-pointer"
              >
                Privacy
              </div>
              <div onClick={() => navigate("/faqs")} className="cursor-pointer">
                Faqs
              </div>
            </div>
          </>
        )}

        {showLogoutModal && (
          <SureLogout
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={() => {
              localStorage.removeItem("auth token");
              navigate("/login");
            }}
          />
        )}

        {showArchiveModal && (
          <TooltipProvider delayDuration={100}>
            <ArchiveComponent onClose={() => setShowArchiveModal(false)} />
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default Profile;
