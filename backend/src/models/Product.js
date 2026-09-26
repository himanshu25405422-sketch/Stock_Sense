const { store } = require('../db/store');

class Product {
  static async findAll() {
    return store.products;
  }

  static async findById(id) {
    return store.products.find(p => p.id === id) || null;
  }

  static async findBySku(sku) {
    return store.products.find(p => p.sku.toUpperCase() === sku.toUpperCase()) || null;
  }

  static async create(data) {
    const product = {
      id: `prod-${Date.now()}`,
      sku: data.sku,
      name: data.name,
      category_id: data.category_id || 'cat-1',
      category_name: data.category_name || 'General',
      uom: data.uom || 'units',
      reorder_level: Number(data.reorder_level) || 20,
      reorder_quantity: Number(data.reorder_quantity) || 100,
      stock: data.stock || { 'wh-1': 0, 'wh-2': 0, 'wh-3': 0 }
    };
    store.products.push(product);
    return product;
  }

  static async updateStock(productId, warehouseId, delta) {
    const product = await this.findById(productId);
    if (product) {
      if (!product.stock[warehouseId]) product.stock[warehouseId] = 0;
      product.stock[warehouseId] = Math.max(0, product.stock[warehouseId] + delta);
    }
    return product;
  }
}

module.exports = Product;
