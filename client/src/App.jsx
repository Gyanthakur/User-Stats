

// // src/App.js
// import React, { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import UserDetails from "./components/UserDetails";
// import Stats from "./components/Stats";
// import {
// 	fetchGitHubUserDetails,
// 	fetchGitHubRepos,
// 	fetchGitHubContributions,
// } from "./utils/githubApi";
// import Repositories from "./components/Repositories";
// import { GithubLogo } from "phosphor-react";
// import Logger from "./components/Logger";


// const App = () => {
// 	const [user, setUser] = useState(null);
// 	const [repos, setRepos] = useState([]);
// 	const [contributions, setContributions] = useState(null);
// 	const [username, setUsername] = useState("");
	

// 	const handleSearch = async (username) => {
// 		setUsername(username);
// 		const userDetails = await fetchGitHubUserDetails(username);
// 		const userRepos = await fetchGitHubRepos(username);
// 		const userContributions = await fetchGitHubContributions(username);
// 		console.log("repo", userRepos);

// 		setUser(userDetails);
// 		setRepos(userRepos);
// 		setContributions(userContributions);
// 	};

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
// 			<div className="flex top-0">

// 			<Logger/>
// 			</div>
// 			<div className="flex justify-center items-centerx">
// 				<GithubLogo size={64} className="text-black mr-3" />{" "}
// 				<h1 className="font-bold text-3xl text-pink-500  mt-4">GitHub</h1>
// 			</div>
// 			<SearchBar onSearch={handleSearch} />
// 			{user && <UserDetails user={user} />}
		
			
// 			{repos && <Repositories repos={repos} />}
// 			{repos && contributions && username && (
// 				<Stats
// 					username={username}
// 					repos={repos}
// 					contributions={contributions}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default App;

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

  const handleSearch = async (username) => {
    setUsername(username);
    const userDetails = await fetchGitHubUserDetails(username);
    const userRepos = await fetchGitHubRepos(username);
    const userContributions = await fetchGitHubContributions(username);

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
      

      {/* Scroll Button */}
      <button
        onClick={handleScroll}
        className="fixed bottom-16 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
        title={scrollToTop ? "Go to Top" : "Go to Bottom"}
      >
        {scrollToTop ? (
          <ArrowUp size={24} />
        ) : (
          <ArrowDown size={24} />
        )}
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
	  {/* <Commits/> */}
	  <Footer/>
    </div>

  );
};

export default App;
