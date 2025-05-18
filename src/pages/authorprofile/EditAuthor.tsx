import React, { useState, useEffect, useRef } from "react";
import Preferences from "../../components/features/authorPreferences/Preferences";
import EditConfirm from "./EditConfirm"; // 👈 Adjust path if needed

type EditAuthorProps = {
  user: {
    fullName: string;
    bio: string;
    preferences: string[];
    email: string;
  };
  onClose: () => void;
  onSave: (updatedData: {
    fullName: string;
    bio: string;
    preferences: string[];
  }) => void;
};

const preferenceOptions: string[] = [
  "Technology",
  "Science",
  "Travel",
  "Fitness",
  "Music",
  "Movies",
  "Gaming",
  "Art",
  "Photography",
  "Business",
  "Politics",
  "Fashion",
  "Food",
  "Health",
  "Education",
  "History",
  "Nature",
  "Literature",
  "Finance",
  "Sports",
];

const EditAuthor: React.FC<EditAuthorProps> = ({ user, onClose, onSave }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio);
  const [preferences, setPreferences] = useState<string[]>(user.preferences);
  const [email, setEmail] = useState(user.email);
  const [showConfirm, setShowConfirm] = useState(false);

  const bioRef = useRef<HTMLTextAreaElement>(null);

  // Resize bio textarea dynamically
  useEffect(() => {
    if (bioRef.current) {
      bioRef.current.style.height = "auto";
      bioRef.current.style.height = bioRef.current.scrollHeight + "px";
    }
  }, [bio]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  

  // Triggered after successful EditConfirm
  const handleConfirmSuccess = () => {
    setShowConfirm(false);
    onSave({ fullName, bio, preferences });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Edit Profile
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Full Name
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Bio
          </span>
          <textarea
            ref={bioRef}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-hidden"
          />
        </label>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Content Preferences{" "}
            <span className="text-sm text-gray-400">(max 5)</span>
          </p>
          <Preferences
            tags={preferenceOptions}
            selected={preferences}
            onChange={setPreferences}
            maxSelection={5}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Confirm Edit
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <EditConfirm
          email={email}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmSuccess}
        />
      )}
    </div>
  );
};

export default EditAuthor;
