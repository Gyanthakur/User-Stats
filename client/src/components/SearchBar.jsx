import React, { useState } from "react";
import { GithubLogo } from "phosphor-react"; // Import GitHub logo from Phosphor Icons
import Logger from "./Logger";
import Commits from "./Commits"; 

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
const [commitsData, setCommitsData] = useState(null);


const fetchCommitsData = async (username) => {
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

  const handleSearch = async () => {
    if (username.trim()) {
      setLoading(true); // Set loading to true when search starts
      await onSearch(username.trim()); // Assuming onSearch is an async function
await fetchCommitsData(username.trim());
      setLoading(false); // Set loading to false when search completes
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="px-4">
      <Logger/>
      <div className="flex flex-col items-center justify-center my-8 p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl shadow-lg max-w-2xl mx-auto sm:my-6 sm:p-4">
        <h3 className="text-2xl font-bold text-white mb-4 text-center sm:text-lg">
          Search GitHub User
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          {/* GitHub Logo */}
          <GithubLogo size={32} className="text-white sm:mb-0 sm:mr-3" />

          {/* Search Input */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            placeholder="Enter GitHub username"
            className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base w-full sm:w-auto"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-sm sm:text-base"
          >
            Search
          </button>
        </div>
      </div>

      {/* Show loader when loading */}
      {loading && (
        <div className="flex flex-col items-center mt-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
          </div>
          <p className="mt-2 text-green-600 text-sm">Searching for GitHub user...</p>
        </div>
      )}

 {/* Display Commit Graph if data is fetched */}
 {commitsData && !loading && <Commits commitsData={commitsData} />}
    </div>
  );
};

export default SearchBar;





// import React, { useState } from "react";
// import { GithubLogo } from "phosphor-react"; // Import GitHub logo from Phosphor Icons
// import Logger from "./Logger";
// import Commits from "./Commits"; // Import Commits component

// const SearchBar = () => {
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [commitsData, setCommitsData] = useState(null); // Store commits data for the graph

//   const fetchCommitsData = async (username) => {
//     try {
//       setLoading(true);
//       const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
//       const repos = await reposResponse.json();

//       const commitsPromises = repos?.map(async (repo) => {
//         try {
//           const commitsResponse = await fetch(
//             `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
//           );
      
//           if (!commitsResponse.ok) {
//             throw new Error(`Failed to fetch commits for repo: ${repo.name}`);
//           }
      
//           const commits = await commitsResponse.json();
//           return {
//             repoName: repo.name,
//             commitCount: commits.length,
//           };
//         } catch (error) {
//           console.error(error);
//           return {
//             repoName: repo.name,
//             commitCount: 0, // or any fallback value
//           };
//         }
//       });
      
//       // To wait for all promises to resolve
//       const commitsData = await Promise.all(commitsPromises);
//       console.log(commitsData);
      

//       const commitsResults = await Promise.all(commitsPromises);
//       setCommitsData(commitsResults);
//     } catch (error) {
//       console.error("Error fetching commits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (username.trim()) {
//       await fetchCommitsData(username.trim());
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="px-4">
//       <Logger />
//       <div className="flex flex-col items-center justify-center my-8 p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl shadow-lg max-w-2xl mx-auto sm:my-6 sm:p-4">
//         <h3 className="text-2xl font-bold text-white mb-4 text-center sm:text-lg">
//           Search GitHub User
//         </h3>
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
//           {/* GitHub Logo */}
//           <GithubLogo size={32} className="text-white sm:mb-0 sm:mr-3" />

//           {/* Search Input */}
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={handleKeyDown} // Listen for Enter key press
//             placeholder="Enter GitHub username"
//             className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base w-full sm:w-auto"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-sm sm:text-base"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Show loader when loading */}
//       {loading && (
//         <div className="flex flex-col items-center mt-4">
//           <div className="flex space-x-2">
//             <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
//             <div className="w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
//             <div className="w-4 h-4 bg-red-500 rounded-full animate-ping animation-delay-400"></div>
//           </div>
//           <p className="mt-2 text-green-600 text-sm">Searching for GitHub user...</p>
//         </div>
//       )}

//       {/* Display Commit Graph if data is fetched */}
//       {commitsData && !loading && <Commits commitsData={commitsData} />}
//     </div>
//   );
// };

// export default SearchBar;