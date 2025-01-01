import React, { useState } from "react";
import { GithubLogo } from "phosphor-react"; // Import GitHub logo from Phosphor Icons

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSearch = async () => {
    if (username.trim()) {
      setLoading(true); // Set loading to true when search starts
      await onSearch(username.trim()); // Assuming onSearch is an async function
      setLoading(false); // Set loading to false when search completes
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center my-8 px-4 py-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Search GitHub User</h3>
      <div className="flex items-center w-full">
        {/* GitHub Logo */}
        <GithubLogo size={32} className="text-white mr-3" />

        {/* Search Input */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 p-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Search
        </button>
      </div>
      </div>

      {/* Show loader when loading */}
      {loading && (
        <div className="flex flex-col items-center mt-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
          </div>
          <p className="mt-2 text-green-600">Searching for GitHub user...</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
