const { store } = require('../db/store');
const { validateProductPayload } = require('../utils/validators');

exports.getAllProducts = (req, res) => {
  res.json(store.products);
};

exports.createProduct = (req, res) => {
  const errors = validateProductPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  const { sku, name, category_id, category_name, uom, reorder_level, reorder_quantity, stock } = req.body;
  const newProd = {
    id: `prod-${Date.now()}`,
    sku: sku.trim().toUpperCase(),
    name: name.trim(),
    category_id: category_id || 'cat-1',
    category_name: category_name || 'General',
    uom: uom || 'units',
    reorder_level: Number(reorder_level) || 20,
    reorder_quantity: Number(reorder_quantity) || 100,
    stock: stock || { 'wh-1': 0, 'wh-2': 0, 'wh-3': 0 }
  };

  store.products.push(newProd);
  res.status(201).json(newProd);
};
