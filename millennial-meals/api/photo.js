export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { photoreference, maxwidth = 400 } = req.query;
  if (!photoreference) {
    return res.status(400).json({ error: 'Missing photoreference' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoreference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url, { redirect: 'manual' });

  // Google returns a redirect to the actual image
  if (response.status === 302 || response.status === 301) {
    const redirectUrl = response.headers.get('location');
    res.setHeader('Location', redirectUrl);
    res.status(302).end();
    return;
  }

  // If not redirected, stream the image
  res.setHeader('Content-Type', response.headers.get('content-type'));
  response.body.pipe(res);
}