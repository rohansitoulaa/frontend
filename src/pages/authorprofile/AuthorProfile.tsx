import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { getNewsByAuthor } from "../../services/authService";
import ArticlePage from "../../components/features/articlePage/ArticlePage";
import { motion } from "framer-motion";
import EditAuthor from "./EditAuthor";
import { AuthApi } from "../../api/auth";
import { Pencil, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

declare const pdfjsLib: any;

interface Article {
  _id: string;
  title: string;
  image?: string;
  content: any;
  createdAt: string;
  tags?: string;
}

const AuthorProfile = () => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [snippets, setSnippets] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSave = async (updatedData) => {
    try {
      await AuthApi.updateAuthor(updatedData);
      // Update the user data in your store or state
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const trimBio = (bio: string, wordLimit: number) => {
    const words = bio.trim().split(/\s+/);
    if (words.length <= wordLimit) return bio;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const fetchArticles = async () => {
    const data = await getNewsByAuthor();
    if (data) {
      setArticles(data);

      const snippetsData = await Promise.all(
        data.map(async (article: any) => {
          try {
            const loadingTask = pdfjsLib.getDocument(article.content);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map((item: any) => item.str);
            return textItems.join(" ");
          } catch (err) {
            console.warn(
              `Failed to extract content for article ${article._id}:`,
              err
            );
            return "Failed to extract content.";
          }
        })
      );
      setSnippets(snippetsData);
    }
  };

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl text-gray-700 dark:text-gray-300">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      {/* Profile Header */}
      {/* Profile Header */}
      <div className="relative">
        {/* Edit Button Top Right */}
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-0 right-0 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
        <div
          onClick={() => navigate("/")}
          className="w-fit p-2 rounded-xl dark:text-white dark:hover:text-black  cursor-pointer flex gap-2 text-xl items-center hover:bg-[#f3f3f3]"
        >
          <ChevronLeft />
          cancel
        </div>
        <div className="flex items-center gap-6 mb-10">
          <img
            alt="Author"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {user.email}
            </p>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
              Experience: {user.experienceLevel}
            </p>

            {user.bio && (
              <p className="mt-2 text-gray-700 dark:text-gray-300 italic max-w-xl">
                {showFullBio ? user.bio : trimBio(user.bio, 20)}
                {user.bio.trim().split(/\s+/).length > 20 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    {showFullBio ? "See less" : "See more"}
                  </button>
                )}
              </p>
            )}

            <div className="mt-2 flex gap-2 flex-wrap">
              {user.preferences.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-700 dark:text-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isEditing && (
          <EditAuthor
            user={user}
            onClose={() => setIsEditing(false)}
            onSave={handleSave}
          />
        )}
      </div>

      <hr className="border-gray-300 dark:border-gray-600 my-6" />

      {/* Articles Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Articles Posted</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No articles posted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              const date = new Date(article.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <motion.div
                  key={article._id}
                  className="bg-white dark:bg-black p-4 rounded-4xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-sm text-gray-500">{date}</p>
                  <p className="text-xs">{article.tags}</p>
                  <img
                    src={
                      article.image ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg my-3"
                  />
                  <p className="text-sm line-clamp-4">
                    {snippets[index] || "Loading snippet..."}
                  </p>
                  <button
                    className="text-blue-600 hover:underline mt-2"
                    onClick={() => openArticle(article)}
                  >
                    See More
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticlePage article={selectedArticle} onClose={closeArticle} />
      )}
    </div>
  );
};

export default AuthorProfile;
