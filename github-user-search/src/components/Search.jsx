// Import React and the useState hook for managing component state
import React, { useState } from "react";

// Import the API helper function that fetches user data from GitHub
import { fetchUserData } from "../services/githubService";

function Search() {
  // Holds the value typed into the input field
  const [username, setUsername] = useState("");

  // Stores the GitHub user data returned from the API
  const [user, setUser] = useState(null);

  // Tracks whether the API request is in progress
  const [loading, setLoading] = useState(false);

  // Stores an error message if the API request fails
  const [error, setError] = useState("");

  // Handles form submission when the user clicks "Search"
  const handleSubmit = async (e) => {
    // Prevents the page from refreshing on form submit
    e.preventDefault();

    // Stop execution if the input field is empty
    if (!username) return;

    // Reset state before making a new API request
    setLoading(true);   // Show loading message
    setError("");       // Clear previous errors
    setUser(null);      // Clear previous user data

    try {
      // Call the GitHub API service with the entered username
      const data = await fetchUserData(username);

      // Save the returned user data in state
      setUser(data);
    } catch (err) {
      // Set an error message if the user is not found or request fails
      setError("Looks like we cant find the user");
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username} // Controlled input value
          onChange={(e) => setUsername(e.target.value)} // Update state on typing
        />
        <button type="submit">Search</button>
      </form>

      {/* Step 3: Conditional Rendering */}

      {/* Show loading message while API request is in progress */}
      {loading && <p>Loading...</p>}

      {/* Show error message if an error exists */}
      {error && <p>{error}</p>}

      {/* Show user details only if user data exists */}
      {user && (
        <div>
          {/* GitHub profile picture */}
          <img src={user.avatar_url} alt={user.login} width="100" />

          {/* Display user's real name or fallback to username */}
          <h3>{user.name || user.login}</h3>

          {/* Link to GitHub profile */}
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
