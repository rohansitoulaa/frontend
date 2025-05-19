import React from "react";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    localStorage.clear(); // Remove all data
    navigate(path);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#d4f1e3] via-[#e2f0fb] to-[#fbe7e6] flex items-center justify-center relative px-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl max-w-2xl w-full p-10 flex flex-col items-center text-center animate-fade-in">
        {/* Image */}
        <img
          src="/images/accessDenied.png"
          alt="Unauthorized"
          className="w-36 h-36 mb-6"
        />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-8">
          You don’t have permission to view this page. Please log in with
          appropriate access, or continue exploring as a News Nerd.
        </p>

        {/* Buttons */}
        <div className="w-full flex justify-between gap-4">
          <Button
            value="Login"
            btnTheme="blackBtn"
            className="w-1/2 py-3 text-lg rounded-xl shadow-md"
            onClick={() => handleNavigate("/login")}
          />
          <Button
            value="Explore as User"
            btnTheme="borderBlack"
            className="w-1/2 py-3 text-lg rounded-xl shadow-md"
            onClick={() => handleNavigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
