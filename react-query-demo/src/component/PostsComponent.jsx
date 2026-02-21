import { useQuery } from 'react-query';
import { useState } from 'react';

// ─── API fetcher ─────────────────────────────────────────────────────────────
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// ─── PostCard sub-component ───────────────────────────────────────────────────
const PostCard = ({ post }) => (
  <article className="post-card">
    <span className="post-id">#{post.id}</span>
    <h3 className="post-title">{post.title}</h3>
    <p className="post-body">{post.body}</p>
  </article>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PostsComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useQuery('posts', fetchPosts);

  // ── Derived state ──────────────────────────────────────────────────────────
  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formattedTime = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : '—';

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="state-container">
        <div className="spinner" aria-label="Loading" />
        <p>Fetching posts from JSONPlaceholder…</p>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="state-container error-state">
        <p className="error-icon">⚠️</p>
        <h2>Something went wrong</h2>
        <p className="error-message">{error.message}</p>
        <button className="btn btn-primary" onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }

  // ── Success state ──────────────────────────────────────────────────────────
  return (
    <section className="posts-section">
      {/* ── Controls bar ── */}
      <div className="controls-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search posts by title or body…"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button
              className="clear-btn"
              onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          className={`btn btn-refetch ${isFetching ? 'btn-loading' : ''}`}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? '⟳ Fetching…' : '↺ Refetch Data'}
        </button>
      </div>

      {/* ── Cache info banner ── */}
      <div className="cache-banner">
        <span>📦 <strong>{posts.length}</strong> posts cached</span>
        <span>🕒 Last updated: <strong>{formattedTime}</strong></span>
        <span>🔎 Showing <strong>{filteredPosts.length}</strong> results</span>
        {isFetching && <span className="fetching-badge">Refreshing…</span>}
      </div>

      {/* ── Posts grid ── */}
      {paginatedPosts.length === 0 ? (
        <div className="state-container">
          <p>No posts match "<strong>{searchTerm}</strong>".</p>
        </div>
      ) : (
        <div className="posts-grid">
          {paginatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-page"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="page-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            className="btn btn-page"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default PostsComponent;