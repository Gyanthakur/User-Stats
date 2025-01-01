// import React from 'react'
// import { Route, Routes } from 'react-router-dom'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Home from './pages/Home';

// const App = () => {
//   return (
//     <div className='min-h-screen bg-slate-50'>
//       <ToastContainer position='bottom-right'/>
//       {/* <Navbar/> */}

//       <Routes>

//         <Route path='/' element={<Home />} />

//       </Routes>
//       {/* <Footer/> */}
//     </div>
//   )
// }

// export default App

// import React, { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import UserDetails from "./components/UserDetails";
// import Stats from "./components/Stats";
// import { fetchGitHubUserData } from "./utils/githubApi";
// import { fetchTwitterUserData } from "./utils/twitterApi";

// function App() {
//   const [userData, setUserData] = useState(null);
//   const [platform, setPlatform] = useState("");

//   const handleSearch = async (platform, username) => {
//     setPlatform(platform);
//     try {
//       const data =
//         platform === "github"
//           ? await fetchGitHubUserData(username)
//           : await fetchTwitterUserData(username);
//       setUserData(data);
//     } catch (error) {
//       alert("Error fetching user data. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold text-center text-blue-600">
//         User Stats Tracker
//       </h1>
//       <SearchBar onSearch={handleSearch} />
//       <UserDetails userData={userData} platform={platform} />
//       <Stats userData={userData} platform={platform} />
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserDetails from "./components/UserDetails";
import Stats from "./components/Stats";
import {
	fetchGitHubUserDetails,
	fetchGitHubRepos,
	fetchGitHubContributions,
} from "./utils/githubApi";
import Repositories from "./components/Repositories";
import { GithubLogo } from "phosphor-react";


const App = () => {
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState([]);
	const [contributions, setContributions] = useState(null);
	const [username, setUsername] = useState("");
	

	const handleSearch = async (username) => {
		setUsername(username);
		const userDetails = await fetchGitHubUserDetails(username);
		const userRepos = await fetchGitHubRepos(username);
		const userContributions = await fetchGitHubContributions(username);
		console.log("repo", userRepos);

		setUser(userDetails);
		setRepos(userRepos);
		setContributions(userContributions);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
			<div className="flex justify-center items-centerx">
				<GithubLogo size={64} className="text-black mr-3" />{" "}
				<h1 className="font-bold text-3xl text-pink-500  mt-4">GitHub</h1>
			</div>
			<SearchBar onSearch={handleSearch} />
			{user && <UserDetails user={user} />}
			
			{repos && <Repositories repos={repos} />}
			{repos && contributions && username && (
				<Stats
					username={username}
					repos={repos}
					contributions={contributions}
				/>
			)}
		</div>
	);
};

export default App;
