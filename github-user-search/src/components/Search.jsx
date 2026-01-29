import React, { useState } from 'react';
import { searchUsersAdvanced, fetchUserData } from '../services/githubService';

const Search = () => {
  const [searchData, setSearchData] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    followers: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchType, setSearchType] = useState(''); // 'simple' or 'advanced'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    await performSearch(1);
  };

  const handleLoadMore = async () => {
    await performSearch(page + 1);
  };

  const performSearch = async (pageNum) => {
    setSearchType('advanced');
    setLoading(true);
    setError('');
    
    try {
      const result = await searchUsersAdvanced(searchData, pageNum);
      
      if (pageNum === 1) {
        setUsers(result.items || []);
      } else {
        setUsers(prev => [...prev, ...(result.items || [])]);
      }
      
      setPage(pageNum);
      setHasMore(!!result.items?.length && result.total_count > pageNum * 30);
    } catch (err) {
      console.error('Advanced search error:', err);
      
      if (err.response) {
        if (err.response.status === 404) {
          setError('No users found matching your criteria');
        } else if (err.response.status === 403) {
          setError('API rate limit exceeded. Please wait a moment and try again.');
        } else {
          setError(`GitHub API error: ${err.response.status}. Please try again.`);
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An error occurred while searching users. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSimpleSearch = async (username) => {
    setSearchType('simple');
    setLoading(true);
    setError('');
    setUsers([]);
    
    try {
      const userData = await fetchUserData(username);
      setUsers([userData]);
    } catch (err) {
      console.error('Simple search error:', err);
      
      if (err.response) {
        if (err.response.status === 404) {
          setError('Looks like we cant find the user');
        } else if (err.response.status === 403) {
          setError('API rate limit exceeded. Please wait a moment and try again.');
        } else {
          setError(`GitHub API error: ${err.response.status}. Please try again.`);
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An error occurred while fetching user data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchData({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      followers: ''
    });
    setUsers([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">GitHub User Search</h2>
          
          {/* Quick Search by Username */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Search by Username</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const username = searchData.username.trim();
              if (username) {
                handleSimpleSearch(username);
              }
            }} className="flex gap-3">
              <input
                type="text"
                value={searchData.username}
                onChange={(e) => setSearchData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter GitHub username..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Advanced Search Form */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Advanced Search</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Username */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchData.username}
                  onChange={handleInputChange}
                  placeholder="e.g., octocat"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Minimum Repositories */}
              <div className="space-y-2">
                <label htmlFor="minRepos" className="block text-sm font-semibold text-gray-700">
                  Min Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchData.minRepos}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Programming Language */}
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-semibold text-gray-700">
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={searchData.language}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Followers */}
              <div className="space-y-2">
                <label htmlFor="followers" className="block text-sm font-semibold text-gray-700">
                  Min Followers
                </label>
                <input
                  type="number"
                  id="followers"
                  name="followers"
                  value={searchData.followers}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {loading && searchType === 'advanced' ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  'Advanced Search'
                )}
              </button>
              
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600">
              {searchType === 'simple' ? 'Searching for user...' : 'Searching GitHub users...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Display */}
        {users.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Search Results <span className="text-blue-600">({users.length} users)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-16 h-16 rounded-full border-4 border-blue-50"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-gray-800 truncate">
                          {user.login}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">@{user.login}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {user.location && (
                        <p className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {user.location}
                        </p>
                      )}
                      
                      {user.bio && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {user.bio}
                        </p>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                          </svg>
                          {user.public_repos || 0} repos
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {user.followers || 0} followers
                        </span>
                      </div>
                    </div>

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg text-center block transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      View GitHub Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button for advanced search */}
            {hasMore && users.length > 1 && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-white hover:bg-gray-50 disabled:bg-gray-100 border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More Users'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-gray-300 text-8xl mb-6">👥</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">No users found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a username in the search field to find GitHub users.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;