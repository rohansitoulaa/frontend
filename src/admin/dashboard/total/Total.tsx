import { useEffect, useState } from "react";
import { verifiedAuthors } from "../../services/adminServices";
import { getAllArticle } from "../../../services/authService";

const Total = () => {
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authors = await verifiedAuthors();
        setTotalAuthors(authors?.length || 0);

        const articles = await getAllArticle();
        setTotalArticles(articles?.length || 0);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-w-70  px-5 py-4 bg-linear-90 from-[#ebe5e1] to-[#FFF4EC] rounded-4xl shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Dashboard Totals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="  flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Total Authors
            </h3>
            <p className="text-3xl font-bold ">{totalAuthors}</p>
          </div>
        </div>

        <div className=" p-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Total Articles
            </h3>
            <p className="text-3xl font-bold text-green-600">{totalArticles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
