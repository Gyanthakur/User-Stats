











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







// Function to fetch commits of a specific repository
export const fetchRepoCommits = async (username, repoName) => {
  const GITHUB_API_BASE = "https://api.github.com";
  let allCommits = [];
  let page = 1;
  const perPage = 100; // Adjust this value as needed (maximum is 100)

  // Loop through all pages to fetch all commits
  while (true) {
    const commitsResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/commits?per_page=${perPage}&page=${page}`
    );
    const commitsData = await commitsResponse.json();

    // If no commits are returned, break the loop
    if (commitsData.length === 0) break;

    allCommits = [...allCommits, ...commitsData];
    page++; // Increment the page number to get the next page of commits
  }

  return allCommits;
};

// Example usage
const fetchReposAndCommits = async (username) => {
  try {
    const repos = await fetchGitHubRepos(username);

    // Fetch commits for each repository
    const reposWithCommits = await Promise.all(
      repos.map(async (repo) => {
        const commits = await fetchRepoCommits(username, repo.name);
        return {
          repoName: repo.name,
          commits: commits,
        };
      })
    );

    console.log(reposWithCommits);
  } catch (error) {
    console.error("Error fetching repos or commits:", error);
  }
};