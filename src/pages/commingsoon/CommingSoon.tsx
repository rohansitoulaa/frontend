import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Half with gradient */}
      <div className="flex-1 bg-gradient-to-r from-[#F6EED5] via-[#E1EBF5] to-[#FAE8E7] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Great things coming soon.
          </h1>
          <p className="text-md md:text-lg text-gray-700 mb-6">
            We are a small and growing consulting firm with big ideas.
          </p>
          <button className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition">
            Learn More →
          </button>
        </div>
      </div>

      {/* Bottom Half - White Section */}
      <div className="bg-gradient-to-r from-[#f4eedc] via-[#e1e9f2] to-[#f5e7e6] py-12 px-4 flex justify-center">
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl items-start md:items-center">
          <label htmlFor="email" className="font-semibold">
            Subscribe
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
