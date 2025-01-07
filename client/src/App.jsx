

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserDetails from "./components/UserDetails";
import Stats from "./components/Stats";
import {
	fetchGitHubUserDetails,
	fetchGitHubRepos,
	fetchGitHubContributions,
	fetchRepoCommits,
} from "./utils/githubApi";
import Repositories from "./components/Repositories";
import { GithubLogo, ArrowUp, ArrowDown } from "phosphor-react";
import Logger from "./components/Logger";
import Footer from "./components/Footer";
import Commits from "./components/Commits";

const App = () => {
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState([]);
	const [contributions, setContributions] = useState(null);
	const [username, setUsername] = useState("");
	const [scrollToTop, setScrollToTop] = useState(true);
  const [loading, setLoading] = useState(false);



  const [commitsData, setCommitsData] = useState(null);
  
    const fetchCommitsData = async (username) => {
      try {
        setLoading(true);
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
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
              commitCount: 0, // or any fallback value
            };
          }
        });
  
        // To wait for all promises to resolve
        const commitsData = await Promise.all(commitsPromises);
        console.log(commitsData);
  
        const commitsResults = await Promise.all(commitsPromises);
        setCommitsData(commitsResults);
      } catch (error) {
        console.error("Error fetching commits:", error);
      } finally {
        setLoading(false);
      }
    };



	const handleSearch = async (username) => {
		setUsername(username);
		const userDetails = await fetchGitHubUserDetails(username);
		const userRepos = await fetchGitHubRepos(username);
		const userContributions = await fetchGitHubContributions(username);
    await fetchCommitsData(username.trim());

		setUser(userDetails);
		setRepos(userRepos);
		setContributions(userContributions);
	};

	// const handleSearch = async (username) => {
	//   setUsername(username);
	//   const userDetails = await fetchGitHubUserDetails(username);
	//   const userRepos = await fetchGitHubRepos(username);

	//   // Fetch commits for each repo
	//   const reposWithCommits = await Promise.all(
	//     userRepos?.map(async (repo) => {
	//       const commits = await fetchRepoCommits(username, repo.name);
	//       return { ...repo, commits_count: commits.length };
	//       console.log("com",commits.length);

	//     })
	//   );

	//   const userContributions = await fetchGitHubContributions(username);
	//   setUser(userDetails);
	//   setRepos(reposWithCommits);
	//   setContributions(userContributions);
	// };

	const handleScroll = () => {
		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
		}
		setScrollToTop(!scrollToTop);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4 pb-0 relative">
			<div className="min-h-[90vh]">
			{/* Scroll Button */}
			<button
				onClick={handleScroll}
				className="fixed bottom-16 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
				title={scrollToTop ? "Go to Top" : "Go to Bottom"}
			>
				{scrollToTop ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
			</button>

			{/* Header */}
			<div className="flex justify-center items-center mt-4">
				<GithubLogo size={64} className="text-black mr-3" />
				<h1 className="font-bold text-3xl sm:text-2xl text-pink-500">GitHub</h1>
			</div>

			{/* Search Bar */}
			<div className="mt-8">
				<SearchBar onSearch={handleSearch} />
			</div>

			{/* User Details */}
			{user && (
				<div className="mt-6">
					<UserDetails user={user} />
				</div>
			)}

			{commitsData && !loading && <Commits commitsData={commitsData} />}

			{/* Repositories */}
			{repos && (
				<div className="mt-6">
					<Repositories repos={repos} />
				</div>
			)}

			{/* Stats */}
			{repos && contributions && username && (
				<div className="mt-6">
					<Stats
						username={username}
						repos={repos}
						contributions={contributions}
					/>
				</div>
			)}
			</div>
			{/* <Commits/> */}
			<Footer />
		</div>
	);
};

export default App;
