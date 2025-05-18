import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type AccountDeletedProps = {
  onClose: () => void;
};

const AccountDeleted = ({ onClose }: AccountDeletedProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-linear-65 from-[#f2f2f2] to-[#b2d1e8] dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Account Deleted
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your account has been permanently deleted.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded"
          >
            Go to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountDeleted;
