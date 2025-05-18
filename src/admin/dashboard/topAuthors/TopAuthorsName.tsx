import React, { useEffect, useRef, useState } from "react";
import { topAuthors } from "../../services/adminServices";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Author {
  authorId: string;
  authorName: string;
  totalPublishedNews: number;
}

const TopAuthorsName: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTopAuthors = async () => {
      try {
        const data = await topAuthors();
        setAuthors(data);
      } catch (error) {
        console.error("Failed to fetch top authors:", error);
      }
    };

    fetchTopAuthors();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-r from-[#f2eee2] via-[#E1EBF5] to-[#FAE8E7] p-4 rounded-2xl h-50 ">
      <h2 className="text-xl font-semibold mb-4">Top Authors</h2>

      <div className="flex items-center">
        <button onClick={() => scroll("left")}>
          <ChevronLeft className="w-10 h-10" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-10 scroll-smooth"
        >
          {authors.length === 0 ? (
            <div className="text-gray-500 text-sm ">
              No top authors to display.
            </div>
          ) : (
            authors.map((author) => (
              <div
                key={author.authorId}
                className="flex flex-col items-center min-w-[80px]"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-2" />
                <span className="text-sm text-center whitespace-nowrap">
                  {author.authorName}
                </span>
              </div>
            ))
          )}
        </div>

        <button onClick={() => scroll("right")}>
          <ChevronRight className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default TopAuthorsName;
