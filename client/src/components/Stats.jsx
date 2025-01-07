


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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = ({ repos, contributions, username }) => {
  const [commitsData, setCommitsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleGraphsCount, setVisibleGraphsCount] = useState(3);

  useEffect(() => {
    const fetchCommitsData = async () => {
      if (!username) return;

      setLoading(true);
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories.");
        }
        const repos = await reposResponse.json();

        const commitsPromises = repos.map(async (repo) => {
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
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

  if (loading) return (<div className="flex flex-col items-center mt-4">
	<div className="flex space-x-2">
		<div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
		<div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
		<div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
	</div>
	<p className="mt-2 text-green-600 text-sm">
		Loadin Stats Chart...
	</p>
</div>);
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
  const handleShowLess = () => setVisibleGraphsCount((prev) => Math.max(prev - 3, 3));

  // Render graphs for visible chunks
  const renderGraphs = repoChunks.slice(0, visibleGraphsCount).map((chunk, index) => {
    const repoNames = chunk.map((repo) => repo.name);
    const stars = chunk.map((repo) => repo.stargazers_count);
    const forks = chunk.map((repo) => repo.forks_count);
    const commits = repoNames.map(
      (name) => commitsData.find((data) => data.repoName === name)?.commitCount || 0
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
      


      <div className="overflow-x-auto mb-5 rounded-md">
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
