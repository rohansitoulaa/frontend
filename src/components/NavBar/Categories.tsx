import { motion } from "framer-motion";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const categories: string[] = [
    "All",
    "Technology",
    "Health",
    "Science",
    "Sports",
    "Entertainment",
    "Business",
    "Lifestyle",
    "Travel",
    "Education",
    "Food",
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex flex-col gap-[1px] w-full items-center">
        <hr className="w-full border-t-2" />
        <hr className="w-full border-t-2" />
      </div>

      <ul className="flex flex-wrap gap-4 p-4 justify-evenly rounded-lg">
        {categories.map((category) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer ${
              selectedCategory === category
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-white"
            }`}
          >
            {category}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col gap-[1px] w-full items-center">
        <hr className="w-full border-t-2" />
      </div>
    </div>
  );
};

export default Categories;
