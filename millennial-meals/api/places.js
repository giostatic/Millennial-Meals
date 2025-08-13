export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { location, radius, keyword } = req.query;
  if (!location || !radius || !keyword) {
    return res.status(400).json({ error: 'Missing location, radius, or keyword' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Only return the first 20 results and remove next_page_token
    const limitedResults = {
      ...data,
      results: data.results ? data.results.slice(0, 20) : [],
    };
    delete limitedResults.next_page_token;

    res.status(200).json(limitedResults);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Google Places API' });
  }
}