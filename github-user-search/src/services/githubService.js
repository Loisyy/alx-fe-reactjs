import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Create axios instance with better error handling
const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Advanced search for users with multiple criteria
export const searchUsersAdvanced = async (searchParams, page = 1, perPage = 30) => {
  try {
    const queryParts = [];
    
    // Build query string based on provided parameters
    if (searchParams.username) {
      queryParts.push(`${searchParams.username} in:login`);
    }
    if (searchParams.location) {
      queryParts.push(`location:"${searchParams.location}"`);
    }
    if (searchParams.minRepos) {
      queryParts.push(`repos:>=${searchParams.minRepos}`);
    }
    if (searchParams.language) {
      queryParts.push(`language:${searchParams.language}`);
    }
    if (searchParams.followers) {
      queryParts.push(`followers:>=${searchParams.followers}`);
    }

    // Default query if no specific parameters provided
    const query = queryParts.length > 0 ? queryParts.join(' ') : 'type:user';

    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=followers&order=desc`;

    const response = await githubAPI.get(apiUrl);

    // Enhanced: Fetch additional user details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetailResponse = await githubAPI.get(`/users/${user.login}`);
          return userDetailResponse.data;
        } catch (error) {
          // Return basic user info if detail fetch fails
          return user;
        }
      })
    );

    return {
      ...response.data,
      items: usersWithDetails
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    throw error;
  }
};

// Simple user data fetch
export const fetchUserData = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Fetch user data error:', error);
    
    // Provide more specific error information
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      throw new Error('Network error: Please check your internet connection');
    } else if (error.response) {
      // GitHub API returned an error response
      throw error;
    } else {
      throw new Error('Unable to connect to GitHub API');
    }
  }
};

export default searchUsersAdvanced;