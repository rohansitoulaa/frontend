import { useState, useEffect } from "react";
import { FileText, BarChart2, Trash2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNewsByAuthor } from "../../services/authService";
import ArticlePage from "../../components/features/articlePage/ArticlePage";
import { deleteNewsById } from "../../services/authService";
import SureDelete from "../SureDelete";
import ConfirmAccDelete from "../ConfirmAccDelete";

type ActivityProps = {
  setShowActivityModal?: boolean;
};

interface Article {
  newsId: string;
  title: string;
  image: string;
  content: string; // PDF URL
  createdAt: string;
}

const Activity = ({ setShowActivityModal }: ActivityProps) => {
  const [selected, setSelected] = useState("articles");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const raw = await getNewsByAuthor();
        console.log(raw);

        const mapped = raw.map((a: any) => ({
          newsId: a.newsId,
          title: a.title,
          image: a.image,
          content: a.content,
          createdAt: new Date(a.createdAt).toLocaleString(),
        }));

        setArticles(mapped);
      } catch (err) {
        console.error("❌ Failed to fetch articles", err);
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      const result = await deleteNewsById(articleToDelete.newsId);
      if (result) {
        setArticles((prev) =>
          prev.filter((article) => article.newsId !== articleToDelete.newsId)
        );
        setArticleToDelete(null);
        setShowDeleteConfirm(false);
      } else {
        alert("Failed to delete article. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const navItems = [
    { id: "articles", icon: <FileText size={20} />, label: "Articles" },
    { id: "stats", icon: <BarChart2 size={20} />, label: "Stats" },
    { id: "delete", icon: <Trash2 size={20} />, label: "Delete Account" },
  ];

  const renderContent = () => {
    switch (selected) {
      case "articles":
        return (
          <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Your Articles</h2>

            {/* Scrollable article list */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {articles.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No articles found.
                </p>
              ) : (
                articles.map((article) => (
                  <div
                    key={article.newsId}
                    onClick={() => setSelectedArticle(article)}
                    className="cursor-pointer p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created: {article.createdAt}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering setSelectedArticle
                        setArticleToDelete(article);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "stats":
        return <div className="text-lg">Stats section coming soon...</div>;
      case "delete":
        return (
          <div className="text-lg space-y-4">
            <h2 className="text-red-600 font-bold text-xl">Delete Account</h2>
            <p className="text-gray-700 dark:text-gray-300">
              ⚠️ This will permanently delete your account and all articles
              you’ve posted. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteAccount(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete My Account
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-150 overflow-hidden   rounded-3xl">
      {/* Toggle Icon */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-20 text-black dark:text-white"
      >
        {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {/* Cancel Button */}
      <button
        onClick={() => setShowActivityModal(false)}
        className="absolute top-4 right-4 z-20 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        Cancel
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 90 }}
            className="absolute inset-0 z-10 bg-gray-900 dark:bg-gray-950 text-white flex flex-col items-center justify-evenly"
          >
            {navItems.map((item) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 text-2xl border-b-2 px-6 py-3"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!sidebarOpen && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 pt-14 h-full overflow-hidden flex flex-col"
        >
          {renderContent()}
        </motion.div>
      )}
      {selectedArticle && (
        <ArticlePage
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {showDeleteConfirm && articleToDelete && (
        <SureDelete
          title={`Delete "${articleToDelete.title}"?`}
          message="This action cannot be undone."
          onCancel={() => {
            setShowDeleteConfirm(false);
            setArticleToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {showDeleteAccount && (
        <ConfirmAccDelete onCancel={() => setShowDeleteAccount(false)} />
      )}
    </div>
  );
};

export default Activity;
