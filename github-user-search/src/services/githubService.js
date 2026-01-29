import axios from "axios";

// Base GitHub API endpoint for user search
const BASE_URL = "https://api.github.com/users";

// Optional GitHub API token (for higher rate limits)
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Fetch GitHub user data by username
 * @param {string} username - GitHub username entered by the user
 * @returns {Object} GitHub user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`, {
      headers: API_KEY
        ? { Authorization: `token ${API_KEY}` }
        : {},
    });

    return response.data;
  } catch (error) {
    // Rethrow error so the calling component can handle it
    throw error;
  }
};
