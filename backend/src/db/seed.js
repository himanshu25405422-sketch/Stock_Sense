const { store } = require('./store');
const { logInfo } = require('../utils/logger');

async function seedData() {
  logInfo(`Seeding database with ${store.products.length} products and ${store.warehouses.length} warehouses...`);
  logInfo('✅ Initial seed data ready in store.');
  return store;
}

if (require.main === module) {
  seedData().then(() => process.exit(0));
}

module.exports = { seedData };
