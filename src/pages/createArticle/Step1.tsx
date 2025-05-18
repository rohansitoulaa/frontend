import { useEffect, useState } from 'react';
import Preferences from '../../components/features/authorPreferences/Preferences';
import Button from '../../components/common/Button/Button';
import { useModalStore } from '../../stores/useModalStore';

interface Step1Props {
  onNext: () => void;
}

const Step1 = ({ onNext }: Step1Props) => {
  const { close } = useModalStore();

  const [preferences, setPreferences] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const preferenceOptions: string[] = [
    "Technology", "Science", "Travel", "Fitness", "Music",
    "Movies", "Lifestyle", "Art", "Photography", "Business",
    "Politics", "Fashion", "Food", "Health", "Education",
    "History", "Nature", "Literature", "Finance", "Sports"
  ];

  useEffect(() => {
    // 🔄 Load from localStorage if available
    const stored = localStorage.getItem("step1-preferences");
    if (stored) {
      setPreferences(JSON.parse(stored));
    }

    // 🔐 Lock scroll on open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePreferenceChange = (updatedPreferences: string[]) => {
    if (updatedPreferences.length > 5) {
      setError('You can only select up to 5 preferences.');
    } else {
      setPreferences(updatedPreferences);
      setError(null);
    }
  };

  const handleNextClick = () => {
    if (preferences.length === 0) {
      setError('Please select at least one preference.');
      return;
    }

    // 💾 Save to localStorage
    localStorage.setItem("step1-preferences", JSON.stringify(preferences));

    setError(null);
    onNext();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* 🔲 Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* 🪟 Modal Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto p-6 bg-linear-65 from-[#f2f2f2] to-[#b2d1e8] dark:bg-linear-65 dark:from-[#2d2b2b] dark:to-[#171c20] dark:text-[#f2f2f2] shadow-xl rounded-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Select content type for new article
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#c8c8c8]">Page 1 of 3</p>
        </div>

        <Preferences
          maxSelection={6}
          tags={preferenceOptions}
          selected={preferences}
          onChange={handlePreferenceChange}
        />

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <div className="flex justify-end items-center gap-4 mt-6">
          <Button
            onClick={close}
            btnTheme="borderBlack"
            value="Cancel"
          />
          <Button
            btnTheme="blackBtn"
            value="Next"
            chevronPosition="right"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
