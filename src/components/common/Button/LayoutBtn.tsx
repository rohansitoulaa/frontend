import { motion } from "framer-motion";
interface UrlProps {
  url?: string;
  value?: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const LayoutBtn = ({ url, value, className, onClick }: UrlProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`flex gap-5 cursor-pointer px-4 py-3 w-full  rounded-xl bg-[#f5efef] text-black ${className}`}
    >
      <img className="opacity-40" src={url} alt="icons" />
      <button className="text-[18px]">{value}</button>
    </motion.div>
  );
};

export default LayoutBtn;
