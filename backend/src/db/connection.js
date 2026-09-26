const { store } = require('./store');
const { logInfo, logError } = require('../utils/logger');

let pool = null;

try {
  const { Pool } = require('pg');
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'stocksense',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  pool.on('error', (err) => {
    logError('Unexpected PostgreSQL pool error', err);
  });
} catch (e) {
  logInfo('pg module not initialized, defaulting to in-memory data store');
}

async function query(text, params) {
  if (pool) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      logError(`Query Error: ${text}`, err);
      throw err;
    }
  }
  logInfo(`Fallback query executed: ${text}`);
  return { rows: [] };
}

module.exports = { query, pool, store };
