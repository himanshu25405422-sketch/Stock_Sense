const { store } = require('../db/store');

class Delivery {
  static async findAll() {
    return store.deliveries;
  }

  static async findById(id) {
    return store.deliveries.find(d => d.id === id) || null;
  }

  static async create(data) {
    const wh = store.warehouses.find(w => w.id === data.warehouse_id) || store.warehouses[0];
    const delivery = {
      id: `del-${Date.now()}`,
      delivery_number: `DEL-2026-00${store.deliveries.length + 1}`,
      customer_name: data.customer_name || 'Customer',
      warehouse_id: wh.id,
      warehouse_name: wh.name,
      status: 'draft',
      created_by: data.created_by || 'Sarah Connor',
      created_at: new Date().toISOString(),
      items: data.items || []
    };
    store.deliveries.unshift(delivery);
    return delivery;
  }
}

module.exports = Delivery;
