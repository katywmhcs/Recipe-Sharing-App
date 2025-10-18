// In src/api/recipes.js

// Fetches all recipes for the homepage
export const getAllRecipes = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

// Creates a new recipe (requires auth token)
export const createRecipe = async (token, recipeData) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
};