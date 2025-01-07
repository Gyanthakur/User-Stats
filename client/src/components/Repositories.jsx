import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Repositories = ({ repos }) => {
	if (!repos) return (
		<div className="flex flex-col items-center mt-4">
					<div className="flex space-x-2">
						<div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
						<div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
						<div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
					</div>
					<p className="mt-2 text-green-600 text-sm">
					Repositories loading...
					</p>
				</div>
	);

	const reposPerPage = 12; // Initial number of repos for small devices
	const [currentPage, setCurrentPage] = useState(1);
	const [isSmallDevice, setIsSmallDevice] = useState(false);
	const [visibleReposCount, setVisibleReposCount] = useState(reposPerPage);

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
	const currentRepos = isSmallDevice
		? repos.slice(0, visibleReposCount)
		: repos.slice((currentPage - 1) * reposPerPage, currentPage * reposPerPage);

	// Handle "Show More"
	const handleShowMore = () => {
		setVisibleReposCount((prevCount) => prevCount + reposPerPage);
	};

	// Handle "Show Less"
	const handleShowLess = () => {
		setVisibleReposCount((prevCount) =>
			Math.max(prevCount - reposPerPage, reposPerPage)
		); // Prevent going below initial count
	};

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
							⭐ <span className="font-medium">{repo.stargazers_count}</span>{" "}
							Stars
						</p>
						<p className="text-sm text-gray-700">
							🍴 <span className="font-medium">{repo.forks_count}</span> Forks
						</p>
					</li>
				))}
			</ul>
			<div className="flex justify-between items-center">
				{/* Show More Button for small devices */}
				{isSmallDevice && visibleReposCount < repos.length && (
					<button
						onClick={handleShowMore}
						className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
					>
						Show More
					</button>
				)}

				{/* Show Less Button for small devices */}
				{isSmallDevice && visibleReposCount > reposPerPage && (
					<button
						onClick={handleShowLess}
						className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
					>
						Show Less
					</button>
				)}
			</div>

			{/* Pagination for non-small devices */}
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
