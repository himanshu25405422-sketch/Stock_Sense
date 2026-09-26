const { store, logLedger } = require('../db/store');

exports.getAllAdjustments = (req, res) => {
  res.json(store.adjustments);
};

exports.createAdjustment = (req, res) => {
  const { warehouse_id, reason, items } = req.body;
  const wh = store.warehouses.find(w => w.id === warehouse_id) || store.warehouses[0];

  const adjustment = {
    id: `adj-${Date.now()}`,
    adjustment_number: `ADJ-2026-00${store.adjustments.length + 1}`,
    warehouse_id: wh.id,
    warehouse_name: wh.name,
    reason: reason || 'Physical Audit Discrepancy',
    status: 'applied',
    created_by: 'Alex Rivera',
    created_at: new Date().toISOString(),
    items: items || []
  };

  adjustment.items.forEach(item => {
    const product = store.products.find(p => p.id === item.product_id);
    const recorded = product && product.stock[wh.id] !== undefined ? product.stock[wh.id] : item.recorded_qty || 0;
    const diff = Number(item.physical_qty) - recorded;
    item.recorded_qty = recorded;
    item.diff = diff;

    if (product) {
      product.stock[wh.id] = Number(item.physical_qty);
    }
    logLedger({
      product_id: item.product_id,
      warehouse_id: wh.id,
      transaction_type: 'ADJUSTMENT',
      quantity_change: diff,
      reference_number: adjustment.adjustment_number,
      created_by_name: adjustment.created_by
    });
  });

  store.adjustments.unshift(adjustment);
  res.status(201).json(adjustment);
};
