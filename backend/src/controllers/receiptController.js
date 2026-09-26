const { store, logLedger } = require('../db/store');

exports.getAllReceipts = (req, res) => {
  res.json(store.receipts);
};

exports.createReceipt = (req, res) => {
  const { supplier_name, warehouse_id, items } = req.body;
  const wh = store.warehouses.find(w => w.id === warehouse_id) || store.warehouses[0];
  const receipt = {
    id: `rec-${Date.now()}`,
    receipt_number: `REC-2026-00${store.receipts.length + 1}`,
    supplier_name: supplier_name || 'Vendor',
    warehouse_id: wh.id,
    warehouse_name: wh.name,
    status: 'draft',
    created_by: 'Alex Rivera',
    created_at: new Date().toISOString(),
    items: items || []
  };
  store.receipts.unshift(receipt);
  res.status(201).json(receipt);
};

exports.addReceiptItem = (req, res) => {
  const receipt = store.receipts.find(r => r.id === req.params.id);
  if (!receipt) return res.status(404).json({ error: 'Receipt not found' });

  const { product_id, quantity_received, unit_price } = req.body;
  const product = store.products.find(p => p.id === product_id);
  const item = {
    product_id,
    product_name: product ? product.name : 'Product',
    quantity_received: Number(quantity_received),
    unit_price: Number(unit_price || 0)
  };
  receipt.items.push(item);
  res.status(201).json(item);
};

exports.validateReceipt = (req, res) => {
  const receipt = store.receipts.find(r => r.id === req.params.id);
  if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
  if (receipt.status === 'processed') return res.status(400).json({ error: 'Receipt already processed' });

  receipt.status = 'processed';
  receipt.items.forEach(item => {
    const product = store.products.find(p => p.id === item.product_id);
    if (product) {
      if (!product.stock[receipt.warehouse_id]) product.stock[receipt.warehouse_id] = 0;
      product.stock[receipt.warehouse_id] += item.quantity_received;
    }
    logLedger({
      product_id: item.product_id,
      warehouse_id: receipt.warehouse_id,
      transaction_type: 'RECEIPT',
      quantity_change: item.quantity_received,
      reference_number: receipt.receipt_number,
      created_by_name: receipt.created_by
    });
  });

  res.json({ message: 'Receipt validated & stock updated', receipt });
};
