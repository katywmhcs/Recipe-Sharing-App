// In backend/routes/recipes.js

import express from 'express';
import { Recipe } from '../db/models/recipe.js';
import { requireAuth } from '../middleware/jwt.js';

// Create a router instance
const router = express.Router();

// GET all recipes (public)
router.get('/', async (req, res) => {
  const recipes = await Recipe.find({}).populate('author', 'username').sort({ createdAt: -1 });
  res.status(200).json(recipes);
});

// POST a new recipe (protected)
router.post('/', requireAuth, async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const authorId = req.auth.sub; // Get user ID from the token

  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions,
    author: authorId,
  });

  await newRecipe.save();
  res.status(201).json(newRecipe);
});

// Export a function that mounts the router on the app
export const recipesRoutes = (app) => {
  app.use('/api/v1/recipes', router);
};