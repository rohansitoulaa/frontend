import { getPendingArticles } from "../../services/adminServices";
import { useEffect, useState } from "react";
import ArticlePage from "../../../components/features/articlePage/ArticlePage";
import { approveArticle, rejectArticle } from "../../services/adminServices";
import { CheckCircle, XCircle } from "lucide-react";

interface Article {
  newsId: string;
  title: string;
  tags: string[];
  image: string;
  content: string;
  authorId: string;
  authorName: string;
  status: "pending" | "published" | "rejected";
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

const PendingArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getPendingArticles();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pending articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className=" rounded-4xl shadow-xl w-1/2  relative bg-[#FEF4EC]">
      <p className="text-2xl p-5">Pending Articles</p>

      {loading && <p className="p-5">Loading...</p>}

      <div className="p-5   overflow-y-auto">
        {articles.length === 0 && !loading && (
          <img
            className="w-85 mx-auto rounded-4xl"
            src="images/noPendingArticles.png"
            alt="No Data"
          />
        )}
        {articles.map((article) => (
          <div key={article.newsId} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-600">By {article.authorName}</p>
            <p className="text-sm text-gray-500">Status: {article.status}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                View Article
              </button>

              <button
                onClick={async () => {
                  await approveArticle(article.newsId);
                  setArticles((prev) =>
                    prev.filter((a) => a.newsId !== article.newsId)
                  );
                }}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </button>

              <button
                onClick={async () => {
                  await rejectArticle(article.newsId);
                  setArticles((prev) =>
                    prev.filter((a) => a.newsId !== article.newsId)
                  );
                }}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <ArticlePage
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default PendingArticles;
