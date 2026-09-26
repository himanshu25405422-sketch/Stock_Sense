const { store } = require('../db/store');

class Location {
  static async findAll() {
    return store.locations;
  }

  static async findById(id) {
    return store.locations.find(l => l.id === id) || null;
  }

  static async create(data) {
    const newLoc = {
      id: `loc-${Date.now()}`,
      warehouse_name: data.warehouse_name || 'Central Hub',
      location_name: data.location_name || 'Location Rack',
      type: data.type || 'INTERNAL' // VENDOR | INTERNAL | CUSTOMER | LOSS_ADJUSTMENT
    };
    store.locations.push(newLoc);
    return newLoc;
  }
}

module.exports = Location;
