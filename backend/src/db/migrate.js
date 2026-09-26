const fs = require('fs');
const path = require('path');
const { query } = require('./connection');
const { logInfo, logError } = require('../utils/logger');

async function runMigrations() {
  logInfo('Starting database migrations...');
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await query(sql);
      logInfo('✅ Schema migrations executed successfully.');
    } else {
      logInfo('schema.sql not found, skipping SQL file execution.');
    }
  } catch (err) {
    logError('Migration failed', err);
  }
}

if (require.main === module) {
  runMigrations().then(() => process.exit(0));
}

module.exports = { runMigrations };
