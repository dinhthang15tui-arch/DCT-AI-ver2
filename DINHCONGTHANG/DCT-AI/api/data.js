/**
 * VERCEL SERVERLESS FUNCTION: /api/data
 * Returns complete territory profiles and market audit knowledge base.
 */

const { globalData } = require('../server.js');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(200).json(globalData);
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(globalData, null, 2));
};
