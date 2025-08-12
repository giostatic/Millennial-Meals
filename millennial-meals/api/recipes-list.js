import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ error: "Missing category" });
  }

  // List all blobs in the "recipes" folder
  const blobs = await list({ prefix: "recipes/" });

  // Download and filter recipes by category
  const recipes = [];
  for (const blob of blobs.blobs) {
    // Only process JSON files
    if (!blob.pathname.endsWith('.json')) continue;

    const response = await fetch(blob.url);
    const recipe = await response.json();

    const mealTimeMatch = Array.isArray(recipe.mealTime)
      ? recipe.mealTime.includes(category)
      : recipe.mealTime === category;
    const baseMatch = Array.isArray(recipe.base)
      ? recipe.base.includes(category)
      : recipe.base === category;

    if (
      mealTimeMatch ||
      baseMatch ||
      recipe.category === category // fallback if you use a 'category' field
    ) {
      recipes.push(recipe);
    }
  }

  res.status(200).json(recipes);
}