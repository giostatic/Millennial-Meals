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

  const { filename, ...recipe } = req.body;
  if (!filename) return res.status(400).json({ error: 'Missing filename' });

  try {
    await put(filename, JSON.stringify(recipe), {
      access: 'public',
      contentType: 'application/json',
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Blob store error:', err);
    res.status(500).json({ error: 'Failed to store recipe' });
  }
}