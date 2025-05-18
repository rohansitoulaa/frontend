import { motion } from "framer-motion";
import { useModalStore } from "../../stores/useModalStore";
import Button from "../../components/common/Button/Button";

interface Step4Props {
  onFinish: () => void;
}

const Step5 = ({ onFinish }: Step4Props) => {
  const { close } = useModalStore();
  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div className="flex justify-center items-center w-full fixed">
        <div className="bg-linear-65 p-4 from-[#d4e9fa] to-[#a1c6e3] dark:bg-linear-65 dark:from-[#2d2b2b] dark:to-[#171c20] dark:text-[#f2f2f2] border-black w-100 h-100 rounded-2xl items-center text-center flex flex-col  gap-5">
          <div className="flex justify-end w-full p-3 ">
            <motion.img
              onClick={close}
              whileHover={{ rotate: 180, scale: 1.45 }}
              className="w-5 items-center cursor-pointer"
              src="images/cross.png"
              alt=""
            />
          </div>
          <h1 className="text-3xl">Your submit is now being reviewed</h1>
          <h2 className="text-2xl">Please bear with us</h2>

          <p className="text-xl text-[#116c23]">Thank you</p>
          <Button
            btnTheme="borderBlack"
            chevronPosition="right"
            value="View Approval Status"
          />
        </div>
      </div>
    </div>
  );
};

export default Step5;
