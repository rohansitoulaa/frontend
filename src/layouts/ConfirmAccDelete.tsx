import { useState } from "react";
import { deleteAuthor } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AccountDeleted from "./AuthorProfile/AccountDeleted";
import Button from "../components/common/Button/Button";

type ConfirmAccDeleteProps = {
  onCancel: () => void;
};

const ConfirmAccDelete = ({ onCancel }: ConfirmAccDeleteProps) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!password) {
      setErrorMsg("Password is required");
      return;
    }

    setLoading(true);
    const result = await deleteAuthor(password);
    setLoading(false);

    if (result) {
      localStorage.clear();
      setShowSuccess(true);
    } else {
      setErrorMsg("Failed to delete account. Check your password.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="
    bg-gradient-to-br from-[#f2f2f2] to-[#b2d1e8]
    dark:from-gray-900 dark:to-[#434343]
    p-6 rounded-xl shadow-xl w-full max-w-md
  "
      >
        <h2 className="text-xl font-bold mb-4 ">
          !! Confirm Account Deletion !!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This will permanently delete your account and all articles you’ve
          posted.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-700"
        />

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

        <div className="flex justify-end mt-6 space-x-3">
          <Button
            value="Cancel"
            btnTheme="borderBlack"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
          />
          <Button
            value={loading ? "Deleting..." : "Delete Account"}
            btnTheme="blackBtn"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2  text-white rounded"
          />
        </div>
      </motion.div>
      {showSuccess && <AccountDeleted onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default ConfirmAccDelete;
