import { useState, useEffect, useRef } from "react";
import Toggle from "../../components/common/toggle/Toggle";
import LayoutBtn from "../../components/common/Button/LayoutBtn";
import { useModalStore } from '../../stores/useModalStore'
import useMovingShadow from "../../animations/useMovingShadow";
import useBorderColorAnimation from "../../animations/useBorderColorAnimation";
import { useAuthStore } from "../../stores/authStore";
const Profile = () => {
    const { user } = useAuthStore();
    
    const shadowRef = useRef<HTMLDivElement>(null);
    useMovingShadow(shadowRef);
    const {open, close} = useModalStore();
    const [isOn, setIsOn] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);
    useBorderColorAnimation(ref);
    
    const handleCreateOnClick = () =>{
        open()
        // console.log("Modal isOpen state changed:", isOpen);

    }

  return (
    <div className='flex justify-center items-center  '>
    <div 
    // ref={shadowRef}
    // ref={ref}
    className='  relative flex flex-col gap-3 w-90 min-h-max p-5 bg-[] shadow-2xl shadow-emerald-50   rounded-4xl  '>
        <div className='flex justify-end cursor-cell'>
            <img 
            className="w-5"
            src="images/expand.png" alt="" />
        </div>
        <div className='flex justify-between'>

        <div
        className='w-10 h-10 bg-black rounded-full'/>
        <button
        onClick={handleCreateOnClick}
        className='px-6 cursor-pointer  bg-[#fbfbfb] rounded-xl'>Create +</button>
        </div>

        <div className=''>
            Hello, <br /> {user?.fullName ?? "Guest"}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 ">
  {user?.preferences.map((item, index) => (
    <div
      key={index}
      className="text-sm text-gray-700 py-1 "
    >
      {item}
    </div>
  ))}
</div>

        <div className="flex justify-between">
            {isOn ? (
                <div className="flex gap-10 items-center">
                    <img src="images/night.png" alt="" />
                    <div>Dark mode </div>
                </div>
            ):(
                <div className="flex gap-10 items-center">
                    <img src="images/morning.png" alt="" />
                    <p>Light mode </p>
                </div>
            )}
            <Toggle isOn={isOn} setIsOn={setIsOn}/>
        </div>
        <div className="flex flex-col gap-3">
            <LayoutBtn 
            url="images/bookmark.png"
            value="Saved"/>

            <LayoutBtn 
            url="images/archive.png"
            value="Archive"/>

            <LayoutBtn 
            url="images/sand_watch.png"
            value="Activity"/>

            <LayoutBtn 
            url="images/settings.png"
            value="Settings"/>
        </div>
        <div className="flex justify-between">
        <div className="border-b-1 rounded-[2px]">
            Help
        </div>
        <div className="border-b-1 rounded-[2px]">
            Privicy Policy
        </div>
        <div className="border-b-1 rounded-[2px]">
            Faqs
        </div>
        </div>
    </div>
    </div>
  )
}

export default Profile