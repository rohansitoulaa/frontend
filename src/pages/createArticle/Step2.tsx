import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2 = ({ onNext, onBack }: Step2Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTitle = localStorage.getItem("step2-title");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  const handleNextClicked = () => {
    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }

    // 💾 Save title to localStorage
    localStorage.setItem("step2-title", title.trim());

    setError("");
    onNext();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔲 Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* 🪟 Modal Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto p-6 bg-linear-65 from-[#f2f2f2] to-[#b2d1e8] dark:bg-linear-65 dark:from-[#2d2b2b] dark:to-[#171c20] dark:text-[#f2f2f2] shadow-xl rounded-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            What is the title of your article?
          </h1>
          <p className="text-sm text-gray-500">Page 2 of 4</p>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md uppercase"
          placeholder="Enter article title"
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="flex justify-end items-center gap-4 mt-6">
          <Button onClick={onBack} btnTheme="borderBlack" value="Back" />
          <Button
            onClick={handleNextClicked}
            btnTheme="blackBtn"
            value="Next"
            chevronPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
