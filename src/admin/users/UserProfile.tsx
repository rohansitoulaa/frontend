// components/UserProfile.tsx
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Author = {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  bio?: string;
  preferences?: string[];
  experienceLevel?: string;
  isVerified?: boolean;
  portfolioURL?: string;
  newsletterUpdates?: boolean;
  createdAt: string;
  updatedAt: string;
};

type Article = {
  _id: string;
  title: string;
  tags?: string;
  createdAt: string;
  image?: string;
};

type Props = {
  visible: boolean;
  author: Author | null;
  articles: Article[];
  onClose: () => void;
};

const UserProfile: React.FC<Props> = ({
  visible,
  author,
  articles,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {visible && author && (
        <motion.div
          className="fixed inset-0 bg-black/3 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1e1e1e] max-w-4xl w-full p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{author.fullName}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <X />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {author.email}
            </p>

            {author.bio && <p className="mt-2 italic">{author.bio}</p>}

            {author.experienceLevel && (
              <p className="mt-2">
                <strong>Experience:</strong> {author.experienceLevel}
              </p>
            )}

            {author.portfolioURL && (
              <p className="mt-2">
                <strong>Portfolio:</strong>{" "}
                <a
                  href={`https://${author.portfolioURL}`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author.portfolioURL}
                </a>
              </p>
            )}

            <p className="mt-2">
              <strong>Newsletter Subscribed:</strong>{" "}
              {author.newsletterUpdates ? "Yes" : "No"}
            </p>

            <p className="mt-2">
              <strong>Verified:</strong> {author.isVerified ? "Yes" : "No"}
            </p>

            <p className="mt-2">
              <strong>Created At:</strong>{" "}
              {new Date(author.createdAt).toLocaleString()}
            </p>

            <p className="mt-2 mb-2">
              <strong>Last Updated:</strong>{" "}
              {new Date(author.updatedAt).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {author.preferences?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <hr className="border-gray-300 dark:border-gray-700 my-4" />

            <h3 className="text-xl font-semibold mb-2">
              Articles by {author.fullName}
            </h3>
            {articles.length === 0 ? (
              <p className="text-gray-500">No articles found.</p>
            ) : (
              <ul className="space-y-4">
                {articles.map((article) => (
                  <li key={article._id} className="border-b pb-2">
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(article.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm italic">{article.tags}</p>
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-40 object-cover mt-2 rounded-md"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
