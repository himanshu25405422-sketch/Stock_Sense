const { store, logLedger } = require('../db/store');

exports.getAllDeliveries = (req, res) => {
  res.json(store.deliveries);
};

exports.createDelivery = (req, res) => {
  const { customer_name, warehouse_id, items } = req.body;
  const wh = store.warehouses.find(w => w.id === warehouse_id) || store.warehouses[0];
  const delivery = {
    id: `del-${Date.now()}`,
    delivery_number: `DEL-2026-00${store.deliveries.length + 1}`,
    customer_name: customer_name || 'Customer',
    warehouse_id: wh.id,
    warehouse_name: wh.name,
    status: 'draft',
    created_by: 'Sarah Connor',
    created_at: new Date().toISOString(),
    items: items || []
  };
  store.deliveries.unshift(delivery);
  res.status(201).json(delivery);
};

exports.validateDelivery = (req, res) => {
  const delivery = store.deliveries.find(d => d.id === req.params.id);
  if (!delivery) return res.status(404).json({ error: 'Delivery order not found' });
  if (delivery.status === 'delivered') return res.status(400).json({ error: 'Delivery already fulfilled' });

  delivery.status = 'delivered';
  delivery.items.forEach(item => {
    const qty = item.quantity_ordered || item.quantity_delivered || 0;
    item.quantity_delivered = qty;
    const product = store.products.find(p => p.id === item.product_id);
    if (product) {
      if (!product.stock[delivery.warehouse_id]) product.stock[delivery.warehouse_id] = 0;
      product.stock[delivery.warehouse_id] = Math.max(0, product.stock[delivery.warehouse_id] - qty);
    }
    logLedger({
      product_id: item.product_id,
      warehouse_id: delivery.warehouse_id,
      transaction_type: 'DELIVERY',
      quantity_change: -qty,
      reference_number: delivery.delivery_number,
      created_by_name: delivery.created_by
    });
  });

  res.json({ message: 'Delivery fulfilled & stock deducted', delivery });
};
