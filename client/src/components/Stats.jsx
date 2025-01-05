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

// 	const [commitsData, setCommitsData] = useState(null);

// 	const fetchCommitsData = async (username) => {
// 		try {
// 			setLoading(true);
// 			const reposResponse = await fetch(
// 				`https://api.github.com/users/${username}/repos`
// 			);
// 			const repos = await reposResponse.json();

// 			const commitsPromises = repos?.map(async (repo) => {
// 				try {
// 					const commitsResponse = await fetch(
// 						`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
// 					);

// 					if (!commitsResponse.ok) {
// 						throw new Error(`Failed to fetch commits for repo: ${repo.name}`);
// 					}

// 					const commits = await commitsResponse.json();
// 					return {
// 						repoName: repo.name,
// 						commitCount: commits.length,
// 					};
// 				} catch (error) {
// 					console.error(error);
// 					return {
// 						repoName: repo.name,
// 						commitCount: 0, // or any fallback value
// 					};
// 				}
// 			});

// 			// To wait for all promises to resolve
// 			const commitsData = await Promise.all(commitsPromises);
// 			console.log(commitsData);

// 			const commitsResults = await Promise.all(commitsPromises);
// 			setCommitsData(commitsResults);
// 		} catch (error) {
// 			console.error("Error fetching commits:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

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


import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = ({ repos, contributions, username }) => {
  const [commitsData, setCommitsData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch commit data
  const fetchCommitsData = async () => {
    try {
      setLoading(true);
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await reposResponse.json();

      const commitsPromises = repos?.map(async (repo) => {
        try {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
          );

          if (!commitsResponse.ok) {
            throw new Error(`Failed to fetch commits for repo: ${repo.name}`);
          }

          const commits = await commitsResponse.json();
          return {
            repoName: repo.name,
            commitCount: commits.length,
          };
        } catch (error) {
          console.error(error);
          return {
            repoName: repo.name,
            commitCount: 0, // Fallback value
          };
        }
      });

      const commitsData = await Promise.all(commitsPromises);
      setCommitsData(commitsData);
    } catch (error) {
      console.error("Error fetching commits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommitsData();
  }, []);

  if (!repos || !contributions || !commitsData || loading) return <p>Loading...</p>;

  const isLargeScreen = window.innerWidth > 1024;
  const itemsPerPage = isLargeScreen ? 11 : 9;

  const repoChunks = [];
  for (let i = 0; i < repos.length; i += itemsPerPage) {
    repoChunks.push(repos.slice(i, i + itemsPerPage));
  }

  const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

  const handleShowMore = () => setVisibleGraphsCount((prevCount) => prevCount + 3);

  const handleShowLess = () => setVisibleGraphsCount((prevCount) => prevCount - 3);

  // Prepare data for graphs
  const renderGraphs = repoChunks
    .slice(0, visibleGraphsCount)
    .map((chunk, index) => {
      const repoNames = chunk.map((repo) => repo.name);
      const stars = chunk.map((repo) => repo.stargazers_count);
      const forks = chunk.map((repo) => repo.forks_count);
      const commits = repoNames.map(
        (name) =>
          commitsData.find((commitData) => commitData.repoName === name)?.commitCount || 0
      );

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
              callback: function (value, index, values) {
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
          <h3 className="text-xl font-bold">
            Repository Stats - Graph {index + 1}
          </h3>
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
