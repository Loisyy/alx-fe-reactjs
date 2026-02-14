import { Link } from "react-router-dom";
import RecipeData from "../data.json";


function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Recipe Sharing Platform
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Discover and share amazing recipes from all around the world
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RecipeData.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {/* Recipe image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />

              {/* Recipe content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {recipe.summary}
                </p>

                <Link
                  to={`/recipe/${recipe.id}`}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {RecipeData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-800 text-lg">
              No recipes found. Add some recipes and enjoy!
            </p>
          </div>
        )}
        {/*call to action*/}
        <div className="mt-12 text-center">
  <Link
    to="/add-recipe"
    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
  >
    Share Your Recipe
  </Link>
</div>

      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2026 Recipe Sharing Platform</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
