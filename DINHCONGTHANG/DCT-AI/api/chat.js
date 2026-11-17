/**
 * VERCEL SERVERLESS FUNCTION: /api/chat
 * Handles AI Agent intelligent dialog and domain reasoning queries.
 */

const { generateChatResponse } = require('../server.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  if (req.method !== 'POST') {
    if (typeof res.status === 'function') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    } else if (!body) {
      body = {};
    }

    const message = body.message || '';
    const chatRes = generateChatResponse(message);

    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(chatRes);
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(chatRes, null, 2));

  } catch (err) {
    console.error('[API/CHAT ERROR]', err);
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
};
