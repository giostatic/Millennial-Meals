import { put } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const timestamp = Date.now();
    const blobName = `recipes/${timestamp}.json`;

    // Store the JSON as a blob
    const { url } = await put(blobName, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    res.status(200).json({ success: true, url });
  } catch (err) {
    console.error('Blob store error:', err);
    res.status(500).json({ error: 'Failed to store recipe' });
  }
}