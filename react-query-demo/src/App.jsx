import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PostsComponent from './components/PostsComponent';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes — data stays "fresh" for 5 min
      cacheTime: 1000 * 60 * 10, // 10 minutes — cache persists for 10 min
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>⚡ React Query Demo</h1>
          <p className="subtitle">Efficient data fetching, caching &amp; updating with React Query</p>
        </header>
        <main>
          <PostsComponent />
        </main>
      </div>
      {/* React Query Devtools — visible in development only */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;