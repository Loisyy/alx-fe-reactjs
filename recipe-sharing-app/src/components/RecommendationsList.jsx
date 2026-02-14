import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const RecommendationsList = () => {
  // Access recommendations and action from the store
  const { recommendations, generateRecommendations } = useRecipeStore();

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>✨ Recommended for You</h2>

      {/* Button to generate mock recommendations */}
      <button
        onClick={generateRecommendations}
        style={{
          background: '#4caf50',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        Refresh Recommendations
      </button>

      {/* Display recommendation results */}
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Try adding some favorites!</p>
      ) : (
        recommendations.map((recipe) => (
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

export default RecommendationsList;
