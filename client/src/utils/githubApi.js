











// src/utils/githubApi.js
const GITHUB_API_BASE = "https://api.github.com";

export const fetchGitHubUserDetails = async (username) => {
  const userResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  const userData = await userResponse.json();
  return userData;
};

// export const fetchGitHubRepos = async (username) => {
//   const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`);
//   const reposData = await reposResponse.json();
//   return reposData;
// };


export const fetchGitHubRepos = async (username) => {
    const GITHUB_API_BASE = "https://api.github.com"; // Ensure this is defined
    let allRepos = [];
    let page = 1;
    const perPage = 100; // Adjust this value as needed (maximum is 100)
  
    // Loop through all pages to fetch all repositories
    while (true) {
      const reposResponse = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}`
      );
      const reposData = await reposResponse.json();
  
      // If no repos are returned, break the loop
      if (reposData.length === 0) break;
  
      allRepos = [...allRepos, ...reposData];
      page++; // Increment the page number to get the next page of repos
    }
  
    return allRepos;
  };
  

export const fetchGitHubContributions = async (username) => {
  const graphUrl = `https://github-contributions-api.deno.dev/${username}.json`;
  const graphResponse = await fetch(graphUrl);
  const graphData = await graphResponse.json();
  return graphData;
};






