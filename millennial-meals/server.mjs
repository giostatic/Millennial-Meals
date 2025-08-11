import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); // <-- This must be before your routes

const PORT = process.env.PORT || 5000;

// Proxy endpoint for geocoding
app.get('/api/geocode', async (req, res) => {
  const { address, city, zip } = req.query;
  let query = address || city || zip;
  if (!query) {
    return res.status(400).json({ error: 'Missing address, city, or zip' });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${process.env.REACT_APP_API_KEY}`;
  console.log('Fetching from Google:', url);

  try {
    const response = await fetch(url);
    const text = await response.text();
    console.log('Google response:', text); // <-- Add this line

    // Try to parse as JSON, otherwise return error
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      res.status(500).send('Google did not return JSON. Body:\n' + text);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google Maps API' });
  }
});

// Proxy endpoint for places
app.get('/api/places', async (req, res) => {
  const { location, radius, keyword } = req.query;
  if (!location || !radius || !keyword) {
    return res.status(400).json({ error: 'Missing location, radius, or keyword' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(location)}&radius=${encodeURIComponent(radius)}&keyword=${encodeURIComponent(keyword)}&key=${process.env.REACT_APP_API_KEY}`;
  console.log('Fetching from Google Places:', url);

  try {
    const response = await fetch(url);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      res.status(500).send('Google did not return JSON. Body:\n' + text);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google Places API' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on port ${PORT}`);
});