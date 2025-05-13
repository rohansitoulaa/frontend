import NavBar from "../NavBar/NavBar";
import Create from "../../pages/createArticle/Create";
import { useModalStore } from "../../stores/useModalStore";
import Categories from "../NavBar/Categories";
import HomeArticle from "../../pages/allArticles/HomeArticle";
import { useState } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { isOpen } = useModalStore();

  return (
    <div>
      <NavBar />
      {isOpen && <Create />}
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <HomeArticle selectedCategory={selectedCategory} />
    </div>
  );
};

export default HomePage;
