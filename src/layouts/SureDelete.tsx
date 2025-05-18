// components/common/SureDelete.tsx

import React from "react";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import Button from "../components/common/Button/Button";

type SureDeleteProps = {
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const SureDelete = ({
  title = "Are you sure you want to delete this article?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}: SureDeleteProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-[90%] max-w-md rounded-3xl shadow-2xl border border-white/20 p-6 bg-gradient-to-br from-[#a591ad] via-[#7067b2] to-[#6e4e77]"
      >
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-red-100 p-4 rounded-full shadow-inner">
            <Trash2 className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-200 text-sm">{message}</p>

          <div className="flex gap-4 mt-4">
            <Button
              btnTheme="borderBlack"
              value="Cancel"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl"
            />

            <Button
              value="Delete"
              btnTheme="blackBtn"
              onClick={onConfirm}
              className="px-4 py-2 rounded-full text-white hover:bg-red-600"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SureDelete;
