const { store } = require('../db/store');

exports.getDashboardStats = (req, res) => {
  let totalStockUnits = 0;
  let lowStockCount = 0;

  store.products.forEach(p => {
    const totalProdStock = Object.values(p.stock || {}).reduce((a, b) => a + b, 0);
    totalStockUnits += totalProdStock;
    if (totalProdStock <= p.reorder_level) lowStockCount++;
  });

  res.json({
    totalProducts: store.products.length,
    totalStockUnits,
    lowStockCount,
    pendingReceipts: store.receipts.filter(r => r.status === 'draft').length,
    pendingDeliveries: store.deliveries.filter(d => d.status === 'draft' || d.status === 'picked').length,
    totalWarehouses: store.warehouses.length,
    recentLedger: store.stock_ledger.slice(0, 10)
  });
};

exports.getLedgerLogs = (req, res) => {
  res.json(store.stock_ledger);
};
