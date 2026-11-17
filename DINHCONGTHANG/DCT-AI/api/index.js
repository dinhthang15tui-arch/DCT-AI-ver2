/**
 * VERCEL SERVERLESS FUNCTION: /api/index
 * Catch-all unified API router for Vercel Serverless environment.
 */

const handleRequest = require('../server.js');

module.exports = (req, res) => {
  return handleRequest(req, res);
};
