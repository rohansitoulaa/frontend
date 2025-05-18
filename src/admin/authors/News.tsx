import React, { useEffect, useState } from "react";
import ArticlePage from "../../components/features/articlePage/ArticlePage";
import { deleteNews, getAllArticle } from "../services/adminServices";
import { FaTrash } from "react-icons/fa";
import ConfirmNewsDelete from "./ConfirmNewsDelete";

type Author = {
  _id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

type Article = {
  newsId: string;
  title: string;
  image: string;
  content: string;
  author: Author;
  createdAt: string;
  tags?: string[];
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticle();
        if (data) {
          const normalized = data.map((item: any) => ({
            ...item,
            _id: item.newsId,
            author: {
              _id: item.authorId || "",
              fullName: item.authorName || "Unknown",
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            },
            createdAt: item.createdAt,
          }));
          setArticles(normalized);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!toDeleteId) return;
    try {
      await deleteNews(toDeleteId);
      setArticles((prev) => prev.filter((a) => a.newsId !== toDeleteId));
      setShowDeletePopup(false);
      setToastMessage("Article deleted successfully!");

      // Clear the toast after 3 seconds
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gradient-to-r from-[#F6EED5] via-[#E1EBF5] to-[#FAE8E7] px-6 py-10">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.newsId}
                className="bg-white rounded-2xl shadow-md p-5 relative hover:shadow-xl transition cursor-pointer"
              >
                <button
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setToDeleteId(article.newsId);
                    setShowDeletePopup(true);
                  }}
                >
                  <FaTrash />
                </button>

                <div onClick={() => setSelectedArticle(article)}>
                  <h3 className="text-xl font-bold mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    by{" "}
                    <span className="font-medium">
                      {article.author.fullName}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Tags:{" "}
                    <span className="italic text-gray-700">
                      {article.tags?.join(", ") || "None"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="/images/empty.png"
              alt="No articles"
              className="w-40 h-40 mb-6 opacity-80"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Articles Found
            </h2>
            <p className="text-gray-500 max-w-md">
              Looks like there are no articles at the moment. You can add new
              content or check back later.
            </p>
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticlePage
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {showDeletePopup && toDeleteId && (
        <ConfirmNewsDelete
          title={
            articles.find((a) => a.newsId === toDeleteId)?.title ||
            "this article"
          }
          onCancel={() => {
            setShowDeletePopup(false);
            setToDeleteId(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* ✅ Custom Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
