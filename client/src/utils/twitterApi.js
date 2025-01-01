import axios from "axios";

export const fetchTwitterUserData = async (username) => {
  const BEARER_TOKEN = "YOUR_TWITTER_BEARER_TOKEN"; // Replace with your Twitter API token.
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    throw error;
  }
};
