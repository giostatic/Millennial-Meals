import { put } from '@vercel/blob';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    // Fix: handle array or single file
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    console.log('Formidable parsed file:', file);

    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }
    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fs = await import('fs/promises');
    const buffer = await fs.readFile(file.filepath);
    const blobName = `recipes/images/${Date.now()}-${file.originalFilename}`;
    const { url } = await put(blobName, buffer, {
      access: 'public',
      contentType: file.mimetype,
    });
    res.status(200).json({ url });
  });
}