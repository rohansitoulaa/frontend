import React, { useState } from "react";
import { X } from "lucide-react";

interface ConfirmDeleteProps {
  author: {
    fullName: string;
    email: string;
    userId: string;
  };
  onCancel: () => void;
  onConfirm: (userId: string) => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  author,
  onCancel,
  onConfirm,
}) => {
  const [notifyByEmail, setNotifyByEmail] = useState(true); // purely UI-based

  return (
    <div className="fixed inset-0 bg-black/2 backdrop-blur-[5px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md relative text-gray-800 dark:text-gray-200">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>

        <p className="mb-4">
          Are you sure you want to{" "}
          <span className="text-red-600 font-bold">delete</span>{" "}
          <strong>{author.fullName}</strong> (<span>{author.email}</span>)?
        </p>

        <label className="flex items-center space-x-2 text-sm mb-4">
          <input
            type="checkbox"
            checked={notifyByEmail}
            onChange={() => setNotifyByEmail(!notifyByEmail)}
            className="form-checkbox accent-blue-600"
          />
          <span>Notify the author via email</span>
        </label>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border dark:border-zinc-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(author.userId)}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
