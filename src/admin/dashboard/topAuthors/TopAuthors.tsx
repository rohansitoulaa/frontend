import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { getPendingAuthors } from "../../api/admin";
import { authorsNews } from "../../services/adminServices";
import { verifiedAuthors } from "../../services/adminServices"; // Assuming this fetches verified authors
// Assuming this fetches news by author ID

interface Author {
  fullName: string;
  profilePic?: string;
  userId: string;
}

interface AuthorWithCount extends Author {
  articleCount: number;
}

const TopAuthors = () => {
  const [topAuthors, setTopAuthors] = useState<AuthorWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAuthors = async () => {
      setLoading(true);
      try {
        const vefAuth: Author[] = await verifiedAuthors(); // replace this with actual GET for verified authors
        // console.log(vefAuth); //correctly fetches verified authors

        const authorMap = new Map<string, AuthorWithCount>();

        for (const author of vefAuth) {
            // console.log("hi from top authors"); //correctly goes through the loop

          if (!authorMap.has(author.userId)) {
            // console.log(author.userId); correctly fetches userId

            const news = await authorsNews(author.userId);
            console.log(news);

            authorMap.set(author.userId, {
              ...author,
              articleCount: news.length || 0,
            });
          }
        }

        const sortedAuthors = Array.from(authorMap.values())
          .sort((a, b) => b.articleCount - a.articleCount)
          .slice(0, 10); // Top 10

        setTopAuthors(sortedAuthors);
      } catch (error) {
        console.error("Error loading top authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAuthors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <img
          src="/images/spinner.gif"
          alt="Loading..."
          className="w-10 h-10 animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Authors</h2>

      <motion.div
        className="flex overflow-x-auto gap-4 pb-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {topAuthors.map((author, idx) => (
          <motion.div
            key={author.UserId}
            className="min-w-[150px] flex flex-col items-center gap-2 bg-[#f2f2f2] rounded-xl p-4 shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={author.profilePic || "/images/default_profile.png"}
              alt={author.fullName}
              className="w-16 h-16 rounded-full object-cover border"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/default_profile.png";
              }}
            />
            <p className="font-medium text-center">{author.fullName}</p>
            <p className="text-xs text-gray-500">ID: {author.UserId}</p>
            <p className="text-sm text-emerald-700 mt-1 font-semibold">
              {author.articleCount} Articles
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TopAuthors;
