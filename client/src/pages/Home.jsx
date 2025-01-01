// import React, { useContext, useState } from 'react';

// import { Routes, Route } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import SearchBar from '../components/SearchBar';
// import UserDetails from '../components/UserDetails';
// import Stats from '../components/Stats';


// function Home() {
//   const [userData, setUserData] = useState(null);
//   const {backendurl} = useContext(AppContext);

//   const fetchUserData = async (username) => {
//     // Replace with your API endpoint
//     // const response = await fetch(`https://api.example.com/users/${username}`);
//     const response = await fetch(backendurl + "");
//     const data = await response.json();
//     setUserData(data);
//   };

//   return (
//     <div className="App">
//       <h1>User Stats Tracker</h1>
//       <SearchBar onSearch={fetchUserData} />
//       {userData && (
//         <>
//           <UserDetails userData={userData} />
//           <Stats userData={userData} />
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Repositories from "../components/Repositories";
import ActivityGraph from "../components/ActivityGraph";
import { getUserDetails, getUserRepos, getContributionGraph } from "../utils/githubApi";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState(null);

  const fetchData = async () => {
    try {
      const userDetails = await getUserDetails("octocat");
      const userRepos = await getUserRepos("octocat");
      const userContributions = await getContributionGraph("octocat");
      setProfile(userDetails);
      setRepos(userRepos);
      setContributions(userContributions);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileCard profile={profile} />
      <Repositories repos={repos} />
      <ActivityGraph contributions={contributions} />
    </div>
  );
};

export default Home;
