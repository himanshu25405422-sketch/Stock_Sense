const { store, logLedger } = require('../db/store');
const StockQuant = require('./StockQuant');

class StockOperation {
  static async findAll({ document_type, status, location_id }) {
    let result = store.stock_operations;
    if (document_type) result = result.filter(o => o.document_type === document_type);
    if (status) result = result.filter(o => o.status === status);
    if (location_id) {
      result = result.filter(o => o.source_location_id === location_id || o.destination_location_id === location_id);
    }
    return result;
  }

  static async findById(id) {
    return store.stock_operations.find(o => o.id === id) || null;
  }

  static async create(data) {
    const operation = {
      id: `op-${Date.now()}`,
      document_number: `${data.document_type || 'OP'}-2026-00${store.stock_operations.length + 1}`,
      document_type: data.document_type || 'RECEIPT', // RECEIPT | DELIVERY | INTERNAL_TRANSFER | ADJUSTMENT
      source_location_id: data.source_location_id || 'loc-vendor-1',
      destination_location_id: data.destination_location_id || 'loc-wh1-main',
      status: data.status || 'DRAFT', // DRAFT | WAITING | READY | DONE | CANCELED
      created_by: data.created_by || 'usr-2',
      items: data.items || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    store.stock_operations.unshift(operation);
    return operation;
  }

  static async updateStatus(id, newStatus) {
    const op = await this.findById(id);
    if (!op) return null;

    op.status = newStatus;
    op.updated_at = new Date().toISOString();

    if (newStatus === 'DONE') {
      for (const item of op.items) {
        const qty = Number(item.done_qty || item.demand_qty || 0);

        // Debit source location if not vendor
        await StockQuant.updateQuantity(item.product_id, op.source_location_id, -qty);

        // Credit destination location
        await StockQuant.updateQuantity(item.product_id, op.destination_location_id, qty);

        // Log into StockLedger
        logLedger({
          operation_id: op.id,
          product_id: item.product_id,
          source_location_id: op.source_location_id,
          destination_location_id: op.destination_location_id,
          transaction_type: op.document_type,
          quantity_change: qty,
          reference_number: op.document_number,
          created_by_name: op.created_by_name || 'System User'
        });
      }
    }
    return op;
  }
}

module.exports = StockOperation;
