import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const {
    filteredRecipes,
    deleteRecipe,
    addFavorite,
    removeFavorite,
    favorites,
  } = useRecipeStore();

  // Helper to check if a recipe is already a favorite
  const isFavorite = (id) => favorites.includes(id);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>All Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            {/* Favorite toggle button */}
            <button
              onClick={() =>
                isFavorite(recipe.id)
                  ? removeFavorite(recipe.id)
                  : addFavorite(recipe.id)
              }
              style={{
                background: isFavorite(recipe.id) ? '#e91e63' : '#03a9f4',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              {isFavorite(recipe.id) ? '💔 Unfavorite' : '❤️ Favorite'}
            </button>

            {/* Delete button */}
            <button
              onClick={() => deleteRecipe(recipe.id)}
              style={{
                background: '#f44336',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
