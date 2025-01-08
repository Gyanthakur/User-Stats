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

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Stats = ({ repos, contributions, username }) => {
	const [commitsData, setCommitsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

	useEffect(() => {
		const fetchCommitsData = async () => {
			if (!username) return;

			setLoading(true);
			try {
				const reposResponse = await fetch(
					`https://api.github.com/users/${username}/repos`
				);
				if (!reposResponse.ok) {
					throw new Error("Failed to fetch repositories.");
				}
				const repos = await reposResponse.json();

				const commitsPromises = repos.map(async (repo) => {
					try {
						const commitsResponse = await fetch(
							`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
							//`https://api.github.com/repos/${username}/${repo.name}/commits`
						);
						if (!commitsResponse.ok) {
							throw new Error(`Failed to fetch commits for repo: ${repo.name}`);
						}
						const commits = await commitsResponse.json();
						return { repoName: repo.name, commitCount: commits.length };
					} catch (error) {
						console.error(error);
						return { repoName: repo.name, commitCount: 0 }; // Fallback for errors
					}
				});

				const data = await Promise.all(commitsPromises);
				setCommitsData(data);
			} catch (error) {
				console.error("Error fetching commit data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCommitsData();
	}, [username]);

	if (loading)
		return (
			<div className="flex flex-col items-center mt-4">
				<div className="flex space-x-2">
					<div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
					<div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
					<div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
				</div>
				<p className="mt-2 text-green-600 text-sm">Loadin Stats Chart...</p>
			</div>
		);
	if (!repos || !contributions || commitsData.length === 0) {
		return <p>No data available.</p>;
	}

	// Determine graph pagination
	const isLargeScreen = window.innerWidth > 1024;
	const itemsPerPage = isLargeScreen ? 11 : 9;
	const repoChunks = [];

	for (let i = 0; i < repos.length; i += itemsPerPage) {
		repoChunks.push(repos.slice(i, i + itemsPerPage));
	}

	const handleShowMore = () => setVisibleGraphsCount((prev) => prev + 3);
	const handleShowLess = () =>
		setVisibleGraphsCount((prev) => Math.max(prev - 3, 3));

	// Render graphs for visible chunks
	const renderGraphs = repoChunks
		.slice(0, visibleGraphsCount)
		.map((chunk, index) => {
			const repoNames = chunk.map((repo) => repo.name);
			const stars = chunk.map((repo) => repo.stargazers_count);
			const forks = chunk.map((repo) => repo.forks_count);
			const commits = repoNames.map(
				(name) =>
					commitsData.find((data) => data.repoName === name)?.commitCount || 0
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
							callback: function (value) {
								return window.innerWidth > 768
									? this.getLabelForValue(value)
									: ""; // Hide labels on small screens
							},
							maxRotation: 29,
							minRotation: 29,
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
					<Bar data={graphData} options={options} />
				</div>
			);
		});

	return (
		<div>
			{renderGraphs}
			<div className="flex justify-between items-center mt-4 mb-5">
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

			<div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-100 via-gray-200 to-green-100 shadow-lg rounded-lg">
				<div className="text-center mb-6">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter GitHub Username"
						className="px-4 py-2 border border-gray-300 rounded-md"
					/>
				</div>

				<div className="text-center mb-6">
					<img
						src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=aura`}
						alt={`${username}'s GitHub Summary`}
						className="rounded-lg shadow-md"
					/>
				</div>

				<div
					style={{ display: "flex", justifyContent: "space-between" }}
					className="mb-6"
				>
					<img
						src={`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=aura`}
						alt="Repos per Language"
						width="45%"
						className="rounded-lg shadow-md"
					/>
					<img
						src={`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=aura`}
						alt="Most Commit Language"
						width="45%"
						className="rounded-lg shadow-md"
					/>
				</div>

				<div
					style={{ display: "flex", justifyContent: "space-between" }}
					className="mb-6"
				>
					<img
						src={`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=aura`}
						alt="GitHub Stats"
						width="45%"
						className="rounded-lg shadow-md"
					/>
					<img
						src={`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=aura&utcOffset=8`}
						alt="Productive Time"
						width="45%"
						className="rounded-lg shadow-md"
					/>
				</div>
			</div>

			{/* <div className="flex justify-center mt-5 mb-6"> */}
      <div className="overflow-x-auto mb-5 mt-5 rounded-md">
				<h3 className="text-2xl font-extrabold text-transparent m-2 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
					github-profile-trophy
				</h3>
				<a href={`https://github.com/ryo-ma/github-profile-trophy`}>
					<img
						src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=juicyfresh&margin-w=10`}
						alt={`${username}'s GitHub Profile Trophy`}
					/>
				</a>
			</div>

			<div className="overflow-x-auto mb-5 mt-5 rounded-md">
				<h3 className="text-2xl font-extrabold text-transparent m-2 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
					Recent 30 Das'y Activity
				</h3>
				<img
					src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=000000&color=53f547&line=65f207&point=2c42ed&area=true&hide_border=true`}
					alt={`${username}'s GitHub Activity Graph`}
					className="rounded-lg shadow-md"
				/>
			</div>

			<div className="bg-white p-4 rounded shadow-md mt-4">
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
