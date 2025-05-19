import {
  getPendingAuthors,
  approveAuthor,
  deleteAuthor,
} from "../../services/adminServices";
import { useEffect, useState } from "react";
import { CheckCircle, User, XCircle } from "lucide-react";

interface Author {
  userId: string;
  email: string;
  experienceLevel: string;
  fullName: string;
  bio: string;
  preferences: string[];
  status: "pending" | "approved" | "rejected";
  role: "author";
  portfolioURL: string;
  createdAt: string;
  updatedAt: string;
}

const truncateBio = (bio: string, wordLimit: number) => {
  const words = bio.split(" ");
  if (words.length <= wordLimit) return bio;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const PendingAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getPendingAuthors();
        setAuthors(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pending authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await approveAuthor(userId);
      setAuthors((prev) => prev.filter((a) => a.userId !== userId));
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await deleteAuthor(userId);
      setAuthors((prev) => prev.filter((a) => a.userId !== userId));
    } catch (err) {
      console.error("Rejection (deletion) failed", err);
    }
  };

  return (
    <div className="rounded-2xl relative bg-gradient-to-tr from-[#f2eee2] via-[#E1EBF5] to-[#FAE8E7]">
      <p className="text-2xl p-5">Pending Authors</p>

      {loading && <p className="p-5">Loading...</p>}

      <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
        {!loading && authors.length === 0 && (
          <img
            src="/images/noPendinAuthors.png"
            className="w-85 mx-auto rounded-4xl"
            alt="No pending authors"
          />
        )}

        {authors.map((author) => (
          <div
            key={author.userId}
            className="p-4 rounded-4xl shadow-md space-y-2 bg-linear-90 from-[#d2d8e0] to-[#c3d4e1]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{author.fullName}</h3>
                <p className="text-gray-600 text-sm">
                  User ID: {author.userId}
                </p>
                <p className="text-gray-600 text-sm">Email: {author.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {author.preferences.map((pref, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                >
                  {pref}
                </span>
              ))}
            </div>

            <p className="text-gray-700">{truncateBio(author.bio, 50)}</p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => handleApprove(author.userId)}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </button>

              <button
                onClick={() => handleReject(author.userId)}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 p-4">{error}</p>}
    </div>
  );
};

export default PendingAuthors;
