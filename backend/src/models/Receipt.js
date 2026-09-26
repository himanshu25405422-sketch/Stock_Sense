const { store } = require('../db/store');

class Receipt {
  static async findAll() {
    return store.receipts;
  }

  static async findById(id) {
    return store.receipts.find(r => r.id === id) || null;
  }

  static async create(data) {
    const wh = store.warehouses.find(w => w.id === data.warehouse_id) || store.warehouses[0];
    const receipt = {
      id: `rec-${Date.now()}`,
      receipt_number: `REC-2026-00${store.receipts.length + 1}`,
      supplier_name: data.supplier_name || 'Vendor',
      warehouse_id: wh.id,
      warehouse_name: wh.name,
      status: 'draft',
      created_by: data.created_by || 'Alex Rivera',
      created_at: new Date().toISOString(),
      items: data.items || []
    };
    store.receipts.unshift(receipt);
    return receipt;
  }
}

module.exports = Receipt;
