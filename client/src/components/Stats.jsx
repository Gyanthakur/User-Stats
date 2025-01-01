import React from "react";
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
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Stats = ({ repos, contributions, username }) => {
	if (!repos || !contributions) return null;

	// Split repos into chunks based on screen size
	const isLargeScreen = window.innerWidth > 1024;
	const itemsPerPage = isLargeScreen ? 16 : 10;

	// Create chunks of repositories for pagination
	const repoChunks = [];
	for (let i = 0; i < repos.length; i += itemsPerPage) {
		repoChunks.push(repos.slice(i, i + itemsPerPage));
	}

	const renderGraphs = repoChunks.map((chunk, index) => {
		const repoNames = chunk.map((repo) => repo.name);
		const stars = chunk.map((repo) => repo.stargazers_count);
		const forks = chunk.map((repo) => repo.forks_count);

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
					text: `Repository Stats - Page ${index + 1}`,
				},
			},
		};

		return (
			<div key={index} className="bg-white p-4 rounded shadow-md mt-4">
				<h3 className="text-xl font-bold">
					Repository Stats - Page {index + 1}
				</h3>
				<Bar data={graphData} options={options} />
			</div>
		);
	});

	return (
		<div>
			{renderGraphs}
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
