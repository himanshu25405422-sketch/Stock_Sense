const { store } = require('../db/store');

class Adjustment {
  static async findAll() {
    return store.adjustments;
  }

  static async findById(id) {
    return store.adjustments.find(a => a.id === id) || null;
  }

  static async create(data) {
    const wh = store.warehouses.find(w => w.id === data.warehouse_id) || store.warehouses[0];
    const adjustment = {
      id: `adj-${Date.now()}`,
      adjustment_number: `ADJ-2026-00${store.adjustments.length + 1}`,
      warehouse_id: wh.id,
      warehouse_name: wh.name,
      reason: data.reason || 'Physical Audit Discrepancy',
      status: 'applied',
      created_by: data.created_by || 'Alex Rivera',
      created_at: new Date().toISOString(),
      items: data.items || []
    };
    store.adjustments.unshift(adjustment);
    return adjustment;
  }
}

module.exports = Adjustment;
