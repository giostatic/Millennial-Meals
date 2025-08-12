import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const { category, id } = req.query;
  if (!category || !id) {
    return res.status(400).json({ error: "Missing category or id" });
  }

  // List all blobs in the "recipes" folder
  const blobs = await list({ prefix: "recipes/" });

  console.log("Looking for id:", id);
  console.log("Available blobs:", blobs.blobs.map(b => b.pathname));

  // Find the blob whose filename matches the id (e.g., recipes/1234567890.json)
  const blob = blobs.blobs.find(
    b => b.pathname.endsWith(`${id}.json`)
  );

  if (!blob) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  const response = await fetch(blob.url);
  const recipe = await response.json();
  res.status(200).json(recipe);
}