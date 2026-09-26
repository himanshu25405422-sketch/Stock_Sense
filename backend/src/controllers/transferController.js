const { store, logLedger } = require('../db/store');

exports.getAllTransfers = (req, res) => {
  res.json(store.transfers);
};

exports.createTransfer = (req, res) => {
  const { from_warehouse_id, to_warehouse_id, items } = req.body;
  const fromWh = store.warehouses.find(w => w.id === from_warehouse_id) || store.warehouses[0];
  const toWh = store.warehouses.find(w => w.id === to_warehouse_id) || store.warehouses[1];

  const transfer = {
    id: `trn-${Date.now()}`,
    transfer_number: `TRN-2026-00${store.transfers.length + 1}`,
    from_warehouse_id: fromWh.id,
    from_warehouse_name: fromWh.name,
    to_warehouse_id: toWh.id,
    to_warehouse_name: toWh.name,
    status: 'completed',
    created_by: 'Alex Rivera',
    created_at: new Date().toISOString(),
    items: items || []
  };

  transfer.items.forEach(item => {
    const product = store.products.find(p => p.id === item.product_id);
    if (product) {
      if (!product.stock[fromWh.id]) product.stock[fromWh.id] = 0;
      if (!product.stock[toWh.id]) product.stock[toWh.id] = 0;
      product.stock[fromWh.id] = Math.max(0, product.stock[fromWh.id] - item.quantity);
      product.stock[toWh.id] += item.quantity;
    }
    logLedger({
      product_id: item.product_id,
      warehouse_id: fromWh.id,
      transaction_type: 'TRANSFER_OUT',
      quantity_change: -item.quantity,
      reference_number: transfer.transfer_number,
      created_by_name: transfer.created_by
    });
    logLedger({
      product_id: item.product_id,
      warehouse_id: toWh.id,
      transaction_type: 'TRANSFER_IN',
      quantity_change: item.quantity,
      reference_number: transfer.transfer_number,
      created_by_name: transfer.created_by
    });
  });

  store.transfers.unshift(transfer);
  res.status(201).json(transfer);
};
