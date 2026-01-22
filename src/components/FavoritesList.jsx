import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const FavoritesList = () => {
  // Access recipes and favorite IDs from Zustand
  const { favorites, recipes } = useRecipeStore();

  // Map favorite IDs to full recipe objects
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>❤️ My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet. Mark a recipe as favorite!</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
