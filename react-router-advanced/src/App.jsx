import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Blog — dynamic routing with :id */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Protected nested routes — /profile requires auth */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Index route: /profile → ProfileDetails */}
            <Route index element={<ProfileDetails />} />
            {/* Child route: /profile/settings → ProfileSettings */}
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;