import { useEffect, useState } from "react";
import { getDraftArticles } from "../../services/authService";
import { useModalStore } from "../../stores/useModalStore";

type DraftArticle = {
  id?: string;
  _id?: string;
  title?: string;
  tags?: string[];
  authorId?: string;
  authorName?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  isDraft?: boolean;
  newsId?: string;
  status?: string;
};

type ArchiveComponentProps = {
  onClose: () => void;
};

const ArchiveComponent = ({ onClose }: ArchiveComponentProps) => {
  const [drafts, setDrafts] = useState<DraftArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { open } = useModalStore();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const data = await getDraftArticles();
        console.log(data);

        if (Array.isArray(data)) {
          setDrafts(data);
        }
      } catch (error) {
        console.error("Failed to fetch drafts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleDraftClick = (draftId?: string) => {
    const selectedDraft = drafts.find((d) => d.id === draftId);
    if (!selectedDraft) return;
    localStorage.setItem(
      "step1-preferences",
      JSON.stringify(selectedDraft.tags)
    );

    localStorage.setItem("step2-title", selectedDraft.title || "");

    localStorage.setItem(
      "uploadedImageMeta",
      JSON.stringify({
        url: selectedDraft.image,
      })
    );

    localStorage.setItem(
      "uploadedPdfMeta",
      JSON.stringify({ url: selectedDraft.content })
    );

    open();
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[5px] z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-white hover:text-red-500"
        >
          ✕
        </button>
        {loading ? (
          <div className="text-center p-4 text-gray-500 dark:text-gray-400">
            Loading drafts...
          </div>
        ) : drafts.length === 0 ? (
          <div className="text-center p-4 text-gray-500 dark:text-gray-400">
            No draft articles found.
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Your Drafts
            </h2>
            <ul className="flex flex-col gap-4">
              {drafts.map((draft, index) => (
                <li
                  key={draft.id || index}
                  onClick={() => handleDraftClick(draft.id)}
                  className="p-4 rounded-lg bg-white shadow-md dark:bg-gray-800 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {draft.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Tags: {draft.tags?.join(", ") || "None"}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ArchiveComponent;
