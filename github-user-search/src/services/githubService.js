import axios from "axios";

// GitHub Search API endpoint
const BASE_URL = "https://api.github.com/search/users";

// Optional GitHub API token (for higher rate limits)
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Fetch GitHub users using advanced search criteria
 * @param {Object} params
 * @param {string} params.username - Username or keyword
 * @param {string} params.location - User location
 * @param {string|number} params.minRepos - Minimum repository count
 */
export const searchUsers = async ({ username, location, minRepos }) => {
  // Build search query dynamically
  let query = username;

  if (location) {
    query += ` location:${location}`;
  }

  if (minRepos) {
    query += ` repos:>${minRepos}`;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: { q: query },
      headers: API_KEY
        ? { Authorization: `token ${API_KEY}` }
        : {},
    });

    return response.data.items; // array of users
  } catch (error) {
    throw error;
  }
};
