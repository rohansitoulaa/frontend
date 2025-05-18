import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { topCategories } from "../../services/adminServices";

interface Category {
  _id: string;
  totalNews: number;
}

const TopCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await topCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching top categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const repeated = [...categories, ...categories];

  return (
    <div className="flex flex-col gap-10 w-full h-50 bg-gradient-to-bl from-[#f2eee2] via-[#E1EBF5] to-[#FAE8E7] rounded-2xl  p-4 relative overflow-hidden">
      <h1>Top Categories</h1>
      <div className="">
        {categories.length === 0 ? (
          <div className="text-gray-500 text-sm italic px-2">
            No top categories to display.
          </div>
        ) : (
          <motion.div
            className="flex gap-6 absolute left-0"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {repeated.map((cat, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 whitespace-nowrap"
              >
                {cat._id}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TopCategories;
