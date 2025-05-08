import { motion } from "framer-motion";
import { useThemeStore } from "../../../stores/useThemeStore";
interface ToggleProps {
    isOn?: boolean;
    setIsOn: (value: boolean) => void;
}


const Toggle = ({isOn, setIsOn}:ToggleProps) => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  const handleToggleOnClick = () =>{
    setIsOn(!isOn)
    toggleTheme()
  }

  return (
      <motion.div
        className="w-16 h-8 flex items-center bg-gray-300 dark:bg-[#2a2a2a] rounded-full p-1 cursor-pointer"
        data-ison={isOn}
        onClick={handleToggleOnClick}
        animate={{ backgroundColor: isOn ? "#2a2a2a" : "#e5e7eb" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          animate={{ x: isOn ? 33 : 0 }}
        />
      </motion.div>
  );
};

export default Toggle;