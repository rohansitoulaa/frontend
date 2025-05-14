import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LayoutBtnProps {
  Icon: LucideIcon;
  value?: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const LayoutBtn = ({ Icon, value, className, onClick }: LayoutBtnProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-4 cursor-pointer px-4 py-3 w-full rounded-xl bg-[#f5efef] dark:bg-black dark:text-white text-black ${className}`}
    >
      <Icon className="opacity-50 w-6 h-6" />
      <button className="text-[18px]">{value}</button>
    </motion.div>
  );
};

export default LayoutBtn;
