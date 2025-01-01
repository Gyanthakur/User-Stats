import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  // To render a range of pages including ellipses when there are too many pages
  const pageNumbers = [];
  const maxPagesToShow = 1; // Number of pages to show at once
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center  mt-6 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {currentPage > 1 && pageNumbers[0] !== 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 bg-blue-200 text-gray-800 hover:bg-blue-300 rounded-lg"
        >
          1
        </button>
      )}
      {currentPage > 2 && pageNumbers[0] !== 1 && (
        <span className="px-4 py-2 text-gray-600">...</span>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-blue-200 text-gray-800 hover:bg-blue-300"
          } rounded-lg`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 1 && pageNumbers[pageNumbers.length - 1] !== totalPages && (
        <span className="px-4 py-2 text-gray-600">...</span>
      )}
      {currentPage < totalPages && pageNumbers[pageNumbers.length - 1] !== totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 bg-blue-200 text-gray-800 hover:bg-blue-300 rounded-lg"
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
