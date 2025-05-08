import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  items: string[];
  value: string;
  onChange: (item: string) => void;
}

const Dropdown = ({ items, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    onChange(item); // Controlled
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-100">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex py-3 items-center justify-between gap-1 px-2 text-md text-black bg-[#f2f2f2]   rounded-xl shadow-md w-full"
      >
        {value || "Select one"}
        <ChevronDown className={`w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className={`absolute left-0 w-full mt-1 border border-white rounded-md overflow-hidden bg-white z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="px-2 py-2 text-md text-black hover:bg-gray-200 cursor-pointer"
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Dropdown;
