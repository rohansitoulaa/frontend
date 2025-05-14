import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQsItemProps {
  title: string;
  description: string;
}

const FAQsItem: React.FC<FAQsItemProps> = ({ title, description }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={() => setIsActive(!isActive)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-2xl  dark:text-white">{title}</h3>
        <ChevronDown
          className={`transition-transform duration-300 dark:text-white ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>
      {isActive && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-xl">{description}</p>
      )}
    </div>
  );
};

export default FAQsItem;
