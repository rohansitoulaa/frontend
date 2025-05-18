import React, { useEffect, useState } from "react";
import {
  verifiedAuthors,
  deleteAuthor,
  getNewsByAuthor,
} from "../services/adminServices";
import { Trash2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ConfirmDelete from "./ConfirmDelete";
import UserProfile from "./UserProfile";

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

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [authorArticles, setAuthorArticles] = useState<Article[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await verifiedAuthors();
    if (data) setAuthors(data);
  };

  const openAuthorPopup = async (author: Author) => {
    setSelectedAuthor(author);
    setPopupVisible(true);
    const articles = await getNewsByAuthor(author.userId);
    setAuthorArticles(articles || []);
  };

  const closePopup = () => {
    setSelectedAuthor(null);
    setPopupVisible(false);
    setAuthorArticles([]);
  };

  const handleDeleteClick = (author: Author) => {
    setSelectedAuthor(author);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (userId: string) => {
    try {
      await deleteAuthor(userId);
      setShowDeleteModal(false);
      const deletedAuthorName = selectedAuthor?.fullName || "Author";
      setSelectedAuthor(null);
      setToastMessage(`Deleted ${deletedAuthorName}`);
      await fetchAuthors();
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch (err) {
      console.error("Error deleting author:", err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-[#F6EED5] via-[#E1EBF5] to-[#FAE8E7] text-gray-800 dark:text-gray-200">
      {authors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <img
            src="/images/nouser.png"
            alt="No users found"
            className="w-64 h-64 object-contain mb-6 opacity-90"
          />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No verified authors found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Authors will appear here once they are verified.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Verified Authors
          </h1>

          {authors.map((author) => (
            <div
              key={author._id}
              className="flex flex-col bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-md hover:shadow-xl transition cursor-pointer relative border border-gray-200 dark:border-zinc-700"
              onClick={() => openAuthorPopup(author)}
            >
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(author);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-1">
                {author.fullName}
              </h2>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                📧 {author.email}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                🧠 <strong>Experience:</strong>{" "}
                {author.experienceLevel || "N/A"}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                🗓️ <strong>Since:</strong>{" "}
                {new Date(author.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {author.preferences?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  {author.preferences.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-700 dark:text-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {author.portfolioURL && (
                <p className="text-xs text-blue-600 dark:text-blue-300 hover:underline break-words mb-1">
                  🔗{" "}
                  <a
                    href={`https://${author.portfolioURL}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author.portfolioURL}
                  </a>
                </p>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-400">
                📬 Newsletter:{" "}
                <span
                  className={
                    author.newsletterUpdates ? "text-green-600" : "text-red-500"
                  }
                >
                  {author.newsletterUpdates ? "Subscribed" : "Not Subscribed"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Popup with author details */}
      <AnimatePresence>
        {popupVisible && selectedAuthor && (
          <UserProfile
            visible={popupVisible}
            author={selectedAuthor}
            articles={authorArticles}
            onClose={closePopup}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAuthor && (
        <ConfirmDelete
          author={{
            fullName: selectedAuthor.fullName,
            email: selectedAuthor.email,
            userId: selectedAuthor.userId,
          }}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedAuthor(null);
          }}
          onConfirm={confirmDelete}
        />
      )}

      {/* Toast Notification */}
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

export default Authors;
