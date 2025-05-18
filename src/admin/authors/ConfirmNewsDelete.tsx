import React, { useState } from "react";

interface ConfirmNewsDeleteProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmNewsDelete: React.FC<ConfirmNewsDeleteProps> = ({
  title,
  onConfirm,
  onCancel,
}) => {
  const [notify, setNotify] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/2 backdrop-blur-[4px] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-xl font-semibold mb-3">
          Are you sure you want to delete{" "}
          <span className="text-red-500">{title}</span>?
        </h2>
        <div className="flex items-center justify-center gap-2 my-3">
          <input
            type="checkbox"
            id="notifyAuthor"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
          <label htmlFor="notifyAuthor" className="text-sm">
            Notify the author about this
          </label>
        </div>
        <div className="flex justify-center gap-4 mt-5">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmNewsDelete;
