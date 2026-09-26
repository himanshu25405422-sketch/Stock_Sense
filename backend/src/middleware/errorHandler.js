const { logError } = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logError(`API Error: ${err.message}`, err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
}

module.exports = errorHandler;
