import axios from "axios";

// GitHub Search API endpoint for advanced user search
const BASE_URL = "https://api.github.com/search/users";

// Optional GitHub API token (for higher rate limits)
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Search GitHub users with advanced filters
 * @param {Object} params
 * @param {string} params.username - Username or keyword
 * @param {string} params.location - Filter by location
 * @param {number|string} params.minRepos - Minimum repositories
 * @returns {Array} Array of GitHub user objects
 */
export const searchUsers = async ({ username, location, minRepos }) => {
  // Build GitHub query string
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
      headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {},
    });

    // GitHub returns { total_count, incomplete_results, items: [...] }
    // We only care about items array
    return response.data.items;
  } catch (error) {
    // Let the calling component handle errors
    throw error;
  }
};
