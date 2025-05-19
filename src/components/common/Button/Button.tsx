import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  value?: string;
  btnTheme?: keyof typeof btn;
  chevronPosition?: "left" | "right";
  disabled?: boolean;
};

const btn = {
  borderBlack:
    "border-2 border-black text-black dark:border-white  dark:text-white",
  blackBtn: "bg-black text-white",
  noBg: "bg-transparent text-black dark:text-white", // text color
};

const Button = ({
  onClick,
  className,
  value = "button",
  btnTheme = "blackBtn",
  chevronPosition,
  disabled = false,
}: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const isNoBg = btnTheme === "noBg";
  const isBorderBlack = btnTheme === "borderBlack";

  const chevronClasses = `w-5 h-5 ${
    isNoBg || isBorderBlack ? "text-black dark:text-white" : "text-white"
  }`;

  return (
    <motion.div
      onClick={handleClick}
      className={`flex gap-2 items-center text-xl rounded-md px-5 py-2 w-fit ${btn[btnTheme]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className || ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {chevronPosition === "left" && <ChevronLeft className={chevronClasses} />}
      {value}
      {chevronPosition === "right" && (
        <ChevronLeft className={`${chevronClasses} rotate-180`} />
      )}
    </motion.div>
  );
};

export default Button;
