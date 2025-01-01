import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Repositories = ({ repos }) => {
  if (!repos) return <p>Loading...</p>;

  const reposPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  // Responsive Check
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 640); // Small devices (sm breakpoint in Tailwind)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine repos to display
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = isSmallDevice ? repos : repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total pages calculation
  const totalPages = Math.ceil(repos.length / reposPerPage);

  return (
    <div className="bg-gradient-to-br from-green-100 via-gray-200 to-green-100 p-8 rounded-xl shadow-lg mt-6">
      <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Repositories
      </h3>
      <ul className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentRepos.map((repo) => (
          <li
            key={repo.id}
            className="p-4 rounded-lg bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-700 mt-2">
              ⭐ <span className="font-medium">{repo.stargazers_count}</span> Stars
            </p>
            <p className="text-sm text-gray-700">
              🍴 <span className="font-medium">{repo.forks_count}</span> Forks
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {!isSmallDevice && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Repositories;
