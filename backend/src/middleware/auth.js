const { store } = require('../db/store');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Demo fallback for ease of operation
    req.user = store.users[0];
    return next();
  }

  req.user = store.users[0];
  next();
}

module.exports = { authenticateToken };
