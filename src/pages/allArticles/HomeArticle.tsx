import { useEffect, useState } from "react";
import { getAllArticle, getNewsByTag } from "../../services/authService";
import { motion } from "framer-motion";
import ArticlePage from "../../components/features/articlePage/ArticlePage";

interface Article {
  id: string;
  title: string;
  authorName: string;
  category: string;
  createdAt: string;
  content: any;
  image: string;
  tags?: string;
}

interface HomeArticleProps {
  selectedCategory: string;
}

declare const pdfjsLib: any;

const HomeArticle: React.FC<HomeArticleProps> = ({ selectedCategory }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [snippets, setSnippets] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    setArticles([]); // Clear previous content early
    setSnippets([]);

    try {
      let fetchedArticles: Article[] | null;

      if (selectedCategory.toLowerCase() === "all") {
        fetchedArticles = await getAllArticle();
      } else {
        fetchedArticles = await getNewsByTag(selectedCategory);
      }

      if (!fetchedArticles || fetchedArticles.length === 0) {
        throw new Error("No articles received.");
      }

      const snippetsData = await Promise.all(
        fetchedArticles.map(async (article) => {
          try {
            const loadingTask = pdfjsLib.getDocument(article.content);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map((item: any) => item.str);
            return textItems.join(" ");
          } catch (e) {
            console.warn(
              `Failed to extract content for article ${article.id}:`,
              e
            );
            return "Failed to extract content.";
          }
        })
      );

      setArticles(fetchedArticles);
      setSnippets(snippetsData);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Oops! We couldn't load articles for this category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="p-4">
        {loading && <p>Loading articles...</p>}

        {!loading && error && (
          <div className="flex flex-col items-center text-center text-red-600 mt-10">
            <img 
            className="w-100 shadow-2xl rounded-4xl"
            src="images/oops.png" alt="" />
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-gray-500">No articles found for this category.</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => {
              const date = new Date(article.createdAt);
              const readable = date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <motion.div
                  key={article.id}
                  className="bg-white dark:bg-black p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p>by {article.authorName}</p>
                  <p className="text-[12px]">{readable}</p>
                  <p>{article.tags}</p>
                  <img
                    src={article.image}
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
    </>
  );
};
export default HomeArticle;
