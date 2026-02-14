import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import recipeData from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Find recipe using useEffect
  useEffect(() => {
    const foundRecipe = recipeData.find((r) => r.id === Number(id));
    setRecipe(foundRecipe);
  }, [id]);

  // If recipe not found
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Recipe not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center font-semibold text-orange-600 hover:text-orange-700 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-800">
            {recipe.title}
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Recipe image */}
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Recipe summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About this recipe
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {recipe.summary}
          </p>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {recipe.ingredients.length}
              </p>
              <p className="text-gray-600 font-semibold">Ingredients</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {recipe.instructions.length}
              </p>
              <p className="text-gray-600 font-semibold">Steps</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-gray-800 font-bold mb-6 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                🍚
              </span>
              Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 hover:bg-orange-50 p-3 rounded-lg transition-colors duration-200"
                >
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>

                  <span className="text-lg">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                📑
              </span>
              Instructions
            </h2>

            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start hover:bg-orange-50 p-4 rounded-lg transition-colors duration-200"
                >
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                    {index + 1}
                  </span>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💡 Cooking Tips
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-gray-700">
              For best results, make sure all ingredients are at room
              temperature before starting. Read through all instructions before
              beginning to cook.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            © 2026 Recipe Sharing Platform. Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default RecipeDetail;
