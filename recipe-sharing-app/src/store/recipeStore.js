// Import Zustand for global state management
import { create } from 'zustand';

// Create the main recipe store
export const useRecipeStore = create((set, get) => ({
  // ===== Existing States =====
  recipes: [],            // All recipes created by users
  filteredRecipes: [],    // Recipes visible after search/filter
  searchTerm: '',         // Current search term

  // ===== New States for Favorites and Recommendations =====
  favorites: [],          // Stores IDs of recipes marked as favorites
  recommendations: [],    // Stores recommended recipes based on favorites

  // ===== Core Actions =====

  // Add a new recipe to the store
  addRecipe: (newRecipe) =>
    set((state) => {
      const updated = [...state.recipes, newRecipe];
      return {
        recipes: updated,
        filteredRecipes: updated,
      };
    }),

  // Delete a recipe by ID
  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updated,
        filteredRecipes: updated,
      };
    }),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updated,
        filteredRecipes: updated,
      };
    }),

  // ===== Search & Filter Logic =====
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return { filteredRecipes: filtered };
    }),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),

  // ===== Favorites Management =====

  // Add a recipe to favorites by its ID
  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state; // Avoid duplicates
      return { favorites: [...state.favorites, recipeId] };
    }),

  // Remove a recipe from favorites by ID
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ===== Personalized Recommendations =====

  // Generate a mock list of recommendations based on favorites
  generateRecommendations: () =>
    set((state) => {
      // Simple mock recommendation logic
      const recommended = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));
