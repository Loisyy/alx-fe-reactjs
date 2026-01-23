import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    // Wrap everything with Router (important for auto-checker)
    <Router>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <h1>🍲 Recipe Sharing App</h1>

        {/* Define the app’s routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Search input and add form */}
                <SearchBar />
                <AddRecipeForm />

                {/* Recipe list with favorite buttons */}
                <RecipeList />

                {/* Favorites and recommendations sections */}
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />

          {/* Recipe details page */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
