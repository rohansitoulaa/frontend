import React from "react";

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Half with gradient */}
      <div className="flex-1 bg-gradient-to-r from-[#F6EED5] via-[#E1EBF5] to-[#FAE8E7] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Great things are coming soon.
          </h1>
          <p className="text-md md:text-lg text-gray-700 mb-6">
            Categorizing content is essential for organizing articles and
            enhancing discoverability. It helps users navigate through a sea of
            information with ease. But to build a meaningful category system, we
            need real content, real traffic, and real usage data — so once the
            website is live, the categories will evolve based on how people
            interact.
          </p>
          <button className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
