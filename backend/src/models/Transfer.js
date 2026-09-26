const { store } = require('../db/store');

class Transfer {
  static async findAll() {
    return store.transfers;
  }

  static async findById(id) {
    return store.transfers.find(t => t.id === id) || null;
  }

  static async create(data) {
    const fromWh = store.warehouses.find(w => w.id === data.from_warehouse_id) || store.warehouses[0];
    const toWh = store.warehouses.find(w => w.id === data.to_warehouse_id) || store.warehouses[1];
    const transfer = {
      id: `trn-${Date.now()}`,
      transfer_number: `TRN-2026-00${store.transfers.length + 1}`,
      from_warehouse_id: fromWh.id,
      from_warehouse_name: fromWh.name,
      to_warehouse_id: toWh.id,
      to_warehouse_name: toWh.name,
      status: 'completed',
      created_by: data.created_by || 'Alex Rivera',
      created_at: new Date().toISOString(),
      items: data.items || []
    };
    store.transfers.unshift(transfer);
    return transfer;
  }
}

module.exports = Transfer;
