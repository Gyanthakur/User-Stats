

// // import React, { useState } from "react";
// // import {
// // 	Chart as ChartJS,
// // 	CategoryScale,
// // 	LinearScale,
// // 	BarElement,
// // 	Title,
// // 	Tooltip,
// // 	Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";

// // // Register the necessary components
// // ChartJS.register(
// // 	CategoryScale,
// // 	LinearScale,
// // 	BarElement,
// // 	Title,
// // 	Tooltip,
// // 	Legend
// // );

// // const Stats = ({ repos, contributions, username }) => {
// // 	if (!repos || !contributions) return null;

// // 	// Split repos into chunks for pagination

// // 	const isLargeScreen = window.innerWidth > 1024;

// // 	// Split repos into chunks for pagination
// // 	const itemsPerPage = isLargeScreen ? 11 : 9;
// // 	// const itemsPerPage = 11;
// // 	const repoChunks = [];
// // 	for (let i = 0; i < repos.length; i += itemsPerPage) {
// // 		repoChunks.push(repos.slice(i, i + itemsPerPage));
// // 	}

// // 	// State to manage the number of visible graphs
// // 	const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

// // 	// Function to handle "Show More" and "Show Less"
// // 	const handleShowMore = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount + 3);
// // 	};

// // 	const handleShowLess = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount - 3); // Reset to default
// // 	};

// // 	const renderGraphs = repoChunks
// // 		.slice(0, visibleGraphsCount)
// // 		.map((chunk, index) => {
// // 			const repoNames = chunk.map((repo) => repo.name);
// // 			const stars = chunk.map((repo) => repo.stargazers_count);
// // 			const forks = chunk.map((repo) => repo.forks_count);

// // 			const graphData = {
// // 				labels: repoNames,
// // 				datasets: [
// // 					{
// // 						label: "Stars",
// // 						data: stars,
// // 						backgroundColor: "rgba(75, 192, 192, 0.6)",
// // 					},
// // 					{
// // 						label: "Forks",
// // 						data: forks,
// // 						backgroundColor: "rgba(153, 102, 255, 0.6)",
// // 					},
// // 				],
// // 			};

// // 			const options = {
// // 				responsive: true,
// // 				plugins: {
// // 					legend: {
// // 						position: "top",
// // 					},
// // 					title: {
// // 						display: true,
// // 						text: `Repository Stats - Graph ${index + 1}`,
// // 					},
// // 				},
// // 			};

// // 			return (
// // 				<div key={index} className="bg-white p-4 rounded shadow-md mt-4">
// // 					<h3 className="text-xl font-bold">
// // 						Repository Stats - Graph {index + 1}
// // 					</h3>
// // 					<Bar data={graphData} options={options} />
// // 				</div>
// // 			);
// // 		});

// // 	return  (
// // 		<div>
// // 			{renderGraphs}
// // 			<div className="flex justify-between items-center mt-4">
// // 				{visibleGraphsCount < repoChunks.length && (
// // 					<button
// // 						onClick={handleShowMore}
// // 						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
// // 					>
// // 						Show More
// // 					</button>
// // 				)}
// // 				{visibleGraphsCount > 3 && (
// // 					<button
// // 						onClick={handleShowLess}
// // 						className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
// // 					>
// // 						Show Less
// // 					</button>
// // 				)}
// // 			</div>
// // 			<div className="bg-white p-4 rounded shadow-md mt-4">
// // 				<h3 className="text-xl font-bold">Contribution Graph</h3>
// // 				<img
// // 					src={`https://ghchart.rshah.org/${username}`}
// // 					alt={`${username}'s GitHub Contribution Graph`}
// // 					className="w-full"
// // 				/>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default Stats;













// import React, { useState } from "react";
// import {
// 	Chart as ChartJS,
// 	CategoryScale,
// 	LinearScale,
// 	BarElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // Register the necessary components
// ChartJS.register(
// 	CategoryScale,
// 	LinearScale,
// 	BarElement,
// 	Title,
// 	Tooltip,
// 	Legend
// );

// // const Stats = ({ repos, contributions, username }) => {
// // 	if (!repos || !contributions) return null;
// // 	const isLargeScreen = window.innerWidth > 1024;

// // 	// Split repos into chunks for pagination
// // 	const itemsPerPage = isLargeScreen ? 11 : 9;
// // 	// const itemsPerPage = 11;
// // 	const repoChunks = [];
// // 	for (let i = 0; i < repos.length; i += itemsPerPage) {
// // 		repoChunks.push(repos.slice(i, i + itemsPerPage));
// // 	}

// // 	// State to manage the number of visible graphs
// // 	const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

// // 	// Function to handle "Show More" and "Show Less"
// // 	const handleShowMore = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount + 3);
// // 	};

// // 	const handleShowLess = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount - 3); // Reset to default
// // 	};

// // 	const renderGraphs = repoChunks
// // 		.slice(0, visibleGraphsCount)
// // 		.map((chunk, index) => {
// // 			const repoNames = chunk.map((repo) => repo.name);
// // 			const stars = chunk.map((repo) => repo.stargazers_count);
// // 			const forks = chunk.map((repo) => repo.forks_count);

// // 			const graphData = {
// // 				labels: repoNames,
// // 				datasets: [
// // 					{
// // 						label: "Stars",
// // 						data: stars,
// // 						backgroundColor: "rgba(75, 192, 192, 0.6)",
// // 					},
// // 					{
// // 						label: "Forks",
// // 						data: forks,
// // 						backgroundColor: "rgba(153, 102, 255, 0.6)",
// // 					},
// // 				],
// // 			};

// // 			const options = {
// // 				responsive: true,
// // 				plugins: {
// // 					legend: {
// // 						position: "top",
// // 					},
// // 					title: {
// // 						display: true,
// // 						text: `Repository Stats - Graph ${index + 1}`,
// // 					},
// // 				},
// // 				scales: {
// // 					x: {
// // 						ticks: {
// // 							callback: function (value, index, values) {
// // 								return this.getLabelForValue(value); // Ensure proper label display
// // 							},
// // 							maxRotation: 90, // Rotate labels vertically
// // 							minRotation: 90,
// // 						},
// // 					},
// // 					y: {
// // 						ticks: {
// // 							beginAtZero: true,
// // 						},
// // 					},
// // 				},
// // 			};

// // 			return (
// // 				<div key={index} className="bg-white p-4  rounded shadow-md mt-4">
// // 					<h3 className="text-xl font-bold">
// // 						Repository Stats - Graph {index + 1}
// // 					</h3>
// // 					<Bar data={graphData} options={options} />
// // 				</div>
// // 			);
// // 		});

// // 	return (
// // 		<div>
// // 			{renderGraphs}
// // 			<div className="flex justify-between items-center mt-4">
// // 				{visibleGraphsCount < repoChunks.length && (
// // 					<button
// // 						onClick={handleShowMore}
// // 						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
// // 					>
// // 						Show More
// // 					</button>
// // 				)}
// // 				{visibleGraphsCount > 3 && (
// // 					<button
// // 						onClick={handleShowLess}
// // 						className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
// // 					>
// // 						Show Less
// // 					</button>
// // 				)}
// // 			</div>
// // 			<div className="bg-white p-4 rounded shadow-md mt-4">
// // 				<h3 className="text-xl font-bold">Contribution Graph</h3>
// // 				<img
// // 					src={`https://ghchart.rshah.org/${username}`}
// // 					alt={`${username}'s GitHub Contribution Graph`}
// // 					className="w-full"
// // 				/>
// // 			</div>
// // 		</div>
// // 	);
// // };


// const Stats = ({ repos, contributions, username }) => {
// 	if (!repos || !contributions) return null;

// 	const isLargeScreen = window.innerWidth > 1024;
// 	const itemsPerPage = isLargeScreen ? 11 : 9;

// 	const repoChunks = [];
// 	for (let i = 0; i < repos.length; i += itemsPerPage) {
// 		repoChunks.push(repos.slice(i, i + itemsPerPage));
// 	}

// 	const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

// 	const handleShowMore = () => {
// 		setVisibleGraphsCount((prevCount) => prevCount + 3);
// 	};

// 	const handleShowLess = () => {
// 		setVisibleGraphsCount((prevCount) => prevCount - 3);
// 	};

// 	// Prepare data for graphs
// 	const renderGraphs = repoChunks
// 		.slice(0, visibleGraphsCount)
// 		.map((chunk, index) => {
// 			const repoNames = chunk.map((repo) => repo.name);
// 			const stars = chunk.map((repo) => repo.stargazers_count);
// 			const forks = chunk.map((repo) => repo.forks_count);
// 			const commits = chunk.map((repo) => repo.commits_count || 0); // Use a custom field for commits

// 			const graphData = {
// 				labels: repoNames,
// 				datasets: [
// 					{
// 						label: "Stars",
// 						data: stars,
// 						backgroundColor: "rgba(75, 192, 192, 0.6)",
// 					},
// 					{
// 						label: "Forks",
// 						data: forks,
// 						backgroundColor: "rgba(153, 102, 255, 0.6)",
// 					},
// 					{
// 						label: "Commits",
// 						data: commits,
// 						backgroundColor: "rgba(255, 159, 64, 0.6)",
// 					},
// 				],
// 			};

// 			const options = {
// 				responsive: true,
// 				plugins: {
// 					legend: {
// 						position: "top",
// 					},
// 					title: {
// 						display: true,
// 						text: `Repository Stats - Graph ${index + 1}`,
// 					},
// 				},
// 				scales: {
// 					x: {
// 						ticks: {
// 							callback: function (value, index, values) {
// 								return this.getLabelForValue(value);
// 							},
// 							maxRotation: 90,
// 							minRotation: 90,
// 						},
// 					},
// 					y: {
// 						ticks: {
// 							beginAtZero: true,
// 						},
// 					},
// 				},
// 			};

// 			return (
// 				<div key={index} className="bg-white p-4 rounded shadow-md mt-4">
// 					<h3 className="text-xl font-bold">
// 						Repository Stats - Graph {index + 1}
// 					</h3>
// 					<Bar data={graphData} options={options} />
// 				</div>
// 			);
// 		});

// 	return (
// 		<div>
// 			{renderGraphs}
// 			<div className="flex justify-between items-center mt-4">
// 				{visibleGraphsCount < repoChunks.length && (
// 					<button
// 						onClick={handleShowMore}
// 						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
// 					>
// 						Show More
// 					</button>
// 				)}
// 				{visibleGraphsCount > 3 && (
// 					<button
// 						onClick={handleShowLess}
// 						className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
// 					>
// 						Show Less
// 					</button>
// 				)}
// 			</div>
// 			<div className="bg-white p-4 rounded shadow-md mt-4">
// 				<h3 className="text-xl font-bold">Contribution Graph</h3>
// 				<img
// 					src={`https://ghchart.rshah.org/${username}`}
// 					alt={`${username}'s GitHub Contribution Graph`}
// 					className="w-full"
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default Stats;




// // import React, { useState, useEffect } from "react";
// // import {
// // 	Chart as ChartJS,
// // 	CategoryScale,
// // 	LinearScale,
// // 	BarElement,
// // 	Title,
// // 	Tooltip,
// // 	Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";

// // // Register the necessary components
// // ChartJS.register(
// // 	CategoryScale,
// // 	LinearScale,
// // 	BarElement,
// // 	Title,
// // 	Tooltip,
// // 	Legend
// // );

// // const Stats = ({ repos, username }) => {
// // 	if (!repos) return null;

// // 	const [commitsData, setCommitsData] = useState({});
// // 	const [isLoading, setIsLoading] = useState(true);

// // 	// Fetch commits for each repository from the GitHub API
// // 	useEffect(() => {
// // 		const fetchCommits = async () => {
// // 			const commits = {};
// // 			for (let repo of repos) {
// // 				const commitUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`; // We only need the number of commits
// // 				try {
// // 					const response = await fetch(commitUrl);
// // 					const data = await response.json();
// // 					commits[repo.name] = data.length; // Store commit count for each repo
// // 				} catch (error) {
// // 					console.error("Error fetching commits:", error);
// // 					commits[repo.name] = 0; // Default to 0 if there's an error
// // 				}
// // 			}
// // 			setCommitsData(commits);
// // 			setIsLoading(false);
// // 		};

// // 		fetchCommits();
// // 	}, [repos, username]);

// // 	const isLargeScreen = window.innerWidth > 1024;

// // 	// Split repos into chunks for pagination
// // 	const itemsPerPage = isLargeScreen ? 11 : 9;
// // 	const repoChunks = [];
// // 	for (let i = 0; i < repos.length; i += itemsPerPage) {
// // 		repoChunks.push(repos.slice(i, i + itemsPerPage));
// // 	}

// // 	// State to manage the number of visible graphs
// // 	const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

// // 	// Function to handle "Show More" and "Show Less"
// // 	const handleShowMore = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount + 3);
// // 	};

// // 	const handleShowLess = () => {
// // 		setVisibleGraphsCount((prevCount) => prevCount - 3); // Reset to default
// // 	};

// // 	const renderGraphs = repoChunks
// // 		.slice(0, visibleGraphsCount)
// // 		.map((chunk, index) => {
// // 			const repoNames = chunk.map((repo) => repo.name);
// // 			const stars = chunk.map((repo) => repo.stargazers_count);
// // 			const forks = chunk.map((repo) => repo.forks_count);

// // 			// Get commits count from state
// // 			const commits = chunk.map((repo) => commitsData[repo.name] || 0);

// // 			const graphData = {
// // 				labels: repoNames,
// // 				datasets: [
// // 					{
// // 						label: "Stars",
// // 						data: stars,
// // 						backgroundColor: "rgba(75, 192, 192, 0.6)",
// // 					},
// // 					{
// // 						label: "Forks",
// // 						data: forks,
// // 						backgroundColor: "rgba(153, 102, 255, 0.6)",
// // 					},
// // 					{
// // 						label: "Commits",
// // 						data: commits,
// // 						backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange color for commits
// // 					},
// // 				],
// // 			};

// // 			const options = {
// // 				responsive: true,
// // 				plugins: {
// // 					legend: {
// // 						position: "top",
// // 					},
// // 					title: {
// // 						display: true,
// // 						text: `Repository Stats - Graph ${index + 1}`,
// // 					},
// // 				},
// // 				scales: {
// // 					x: {
// // 						ticks: {
// // 							callback: function (value, index, values) {
// // 								return this.getLabelForValue(value); // Ensure proper label display
// // 							},
// // 							maxRotation: 90, // Rotate labels vertically
// // 							minRotation: 90,
// // 						},
// // 					},
// // 					y: {
// // 						ticks: {
// // 							beginAtZero: true,
// // 						},
// // 					},
// // 				},
// // 			};

// // 			return (
// // 				<div key={index} className="bg-white p-4 rounded shadow-md mt-4">
// // 					<h3 className="text-xl font-bold">
// // 						Repository Stats - Graph {index + 1}
// // 					</h3>
// // 					<Bar data={graphData} options={options} />
// // 				</div>
// // 			);
// // 		});

// // 	return (
// // 		<div>
// // 			{isLoading ? (
// // 				<p>Loading commits...</p>
// // 			) : (
// // 				renderGraphs
// // 			)}
// // 			<div className="flex justify-between items-center mt-4">
// // 				{visibleGraphsCount < repoChunks.length && (
// // 					<button
// // 						onClick={handleShowMore}
// // 						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
// // 					>
// // 						Show More
// // 					</button>
// // 				)}
// // 				{visibleGraphsCount > 3 && (
// // 					<button
// // 						onClick={handleShowLess}
// // 						className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
// // 					>
// // 						Show Less
// // 					</button>
// // 				)}
// // 			</div>
// // 			<div className="bg-white p-4 rounded shadow-md mt-4">
// // 				<h3 className="text-xl font-bold">Contribution Graph</h3>
// // 				<img
// // 					src={`https://ghchart.rshah.org/${username}`}
// // 					alt={`${username}'s GitHub Contribution Graph`}
// // 					className="w-full"
// // 				/>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default Stats;











// // commits vala last update is 04/01/2025







// // import React, { useState, useEffect } from "react";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const Stats = ({ repos, username }) => {
// //   const [commitsData, setCommitsData] = useState({});
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

// //   // Fetch commits for each repository
// //   useEffect(() => {
// //     const fetchCommits = async () => {
// //       const commits = {};
// //       for (let repo of repos) {
// //         // const commitUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`;
// //         const commitUrl = `https://github.com/Gyanthakur/User-Stats/commits/main/`;
// //         try {
// //           const response = await fetch(commitUrl);
// //           const data = await response.json();
// //           commits[repo.name] = Array.isArray(data) ? data.length : 0;
// //         } catch (error) {
// //           console.error("Error fetching commits:", error);
// //           commits[repo.name] = 0;
// //         }
// //       }
// //       setCommitsData(commits);
// //       setIsLoading(false);
// //     };

// //     fetchCommits();
// //   }, [repos, username]);

// //   const isLargeScreen = window.innerWidth > 1024;
// //   const itemsPerPage = isLargeScreen ? 11 : 9;

// //   // Paginate repos
// //   const repoChunks = [];
// //   for (let i = 0; i < repos.length; i += itemsPerPage) {
// //     repoChunks.push(repos.slice(i, i + itemsPerPage));
// //   }

// //   const handleShowMore = () => setVisibleGraphsCount((prev) => prev + 3);
// //   const handleShowLess = () => setVisibleGraphsCount((prev) => Math.max(3, prev - 3));

// //   const renderGraphs = repoChunks.slice(0, visibleGraphsCount).map((chunk, index) => {
// //     const repoNames = chunk.map((repo) => repo.name);
// //     const stars = chunk.map((repo) => repo.stargazers_count);
// //     const forks = chunk.map((repo) => repo.forks_count);
// //     const commits = chunk.map((repo) => commitsData[repo.name] || 0);

// //     const graphData = {
// //       labels: repoNames,
// //       datasets: [
// //         { label: "Stars", data: stars, backgroundColor: "rgba(75, 192, 192, 0.6)" },
// //         { label: "Forks", data: forks, backgroundColor: "rgba(153, 102, 255, 0.6)" },
// //         { label: "Commits", data: commits, backgroundColor: "rgba(255, 159, 64, 0.6)" },
// //       ],
// //     };

// //     const options = {
// //       responsive: true,
// //       plugins: {
// //         legend: { position: "top" },
// //         title: { display: true, text: `Repository Stats - Graph ${index + 1}` },
// //       },
// //       scales: {
// //         x: { ticks: { maxRotation: 90, minRotation: 90 } },
// //         y: { beginAtZero: true },
// //       },
// //     };

// //     return (
// //       <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
// //         <Bar data={graphData} options={options} />
// //       </div>
// //     );
// //   });

// //   return (
// //     <div>
// //       {isLoading ? (
// //         <p>Loading data...</p>
// //       ) : (
// //         <>
// //           {renderGraphs}
// //           <div className="flex justify-between items-center mt-4">
// //             {visibleGraphsCount < repoChunks.length && (
// //               <button
// //                 onClick={handleShowMore}
// //                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
// //               >
// //                 Show More
// //               </button>
// //             )}
// //             {visibleGraphsCount > 3 && (
// //               <button
// //                 onClick={handleShowLess}
// //                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
// //               >
// //                 Show Less
// //               </button>
// //             )}
// //           </div>
// //           <div className="bg-white p-4 rounded shadow-md mt-4">
// //             <h3 className="text-xl font-bold">Contribution Graph</h3>
// //             <img
// //               src={`https://ghchart.rshah.org/${username}`}
// //               alt={`${username}'s GitHub Contribution Graph`}
// //               className="w-full"
// //               onError={(e) => (e.target.src = "/fallback-graph.png")}
// //             />
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Stats;
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const Stats = ({ repos, contributions, username, commitsData }) => {
  if (!repos || !contributions || !commitsData) return null;

  const isLargeScreen = window.innerWidth > 1024;
  const itemsPerPage = isLargeScreen ? 11 : 9;

  const repoChunks = [];
  for (let i = 0; i < repos.length; i += itemsPerPage) {
    repoChunks.push(repos.slice(i, i + itemsPerPage));
  }

  const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

  const handleShowMore = () => {
    setVisibleGraphsCount((prevCount) => prevCount + 3);
  };

  const handleShowLess = () => {
    setVisibleGraphsCount((prevCount) => prevCount - 3);
  };

  // Prepare data for graphs
  const renderGraphs = repoChunks.slice(0, visibleGraphsCount).map((chunk, index) => {
    const repoNames = chunk.map((repo) => repo.name);
    const stars = chunk.map((repo) => repo.stargazers_count);
    const forks = chunk.map((repo) => repo.forks_count);

    // Match commits data with repo names
    const commits = chunk.map((repo) => {
      const matchingCommitData = commitsData.find((data) => data.repoName === repo.name);
      return matchingCommitData ? matchingCommitData.commitCount : 0;
    });

    const graphData = {
      labels: repoNames,
      datasets: [
        {
          label: "Stars",
          data: stars,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Forks",
          data: forks,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
        {
          label: "Commits",
          data: commits,
          backgroundColor: "rgba(255, 159, 64, 0.6)",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Repository Stats - Graph ${index + 1}`,
        },
      },
      scales: {
        x: {
          ticks: {
            callback: function (value) {
              return this.getLabelForValue(value);
            },
            maxRotation: 90,
            minRotation: 90,
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    };

    return (
      <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
        <h3 className="text-xl font-bold">Repository Stats - Graph {index + 1}</h3>
        <Bar data={graphData} options={options} />
      </div>
    );
  });

  return (
    <div>
      {renderGraphs}
      <div className="flex justify-between items-center mt-4">
        {visibleGraphsCount < repoChunks.length && (
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Show More
          </button>
        )}
        {visibleGraphsCount > 3 && (
          <button
            onClick={handleShowLess}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Show Less
          </button>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow-md mt-4">
        <h3 className="text-xl font-bold">Contribution Graph</h3>
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username}'s GitHub Contribution Graph`}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Stats;
