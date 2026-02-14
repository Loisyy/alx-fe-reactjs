import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

// SearchBar component: updates the search term in Zustand as user types
const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="🔎 Search recipes..."
      onChange={(event) => setSearchTerm(event.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default SearchBar;
