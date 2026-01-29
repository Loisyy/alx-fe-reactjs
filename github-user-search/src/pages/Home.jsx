import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

  const fetchUser = async () => {
    if (!username) return;

    const res = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: API_KEY ? `token ${API_KEY}` : undefined,
        },
      }
    );

    const data = await res.json();
    setUserData(data);
  };

  return (
    <div>
      <h2>Home</h2>

      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={fetchUser}>Search</button>

      {userData && (
        <div>
          <p>{userData.login}</p>
          <img src={userData.avatar_url} width="100" />
        </div>
      )}
    </div>
  );
}
