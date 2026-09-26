const { store } = require('../db/store');

class StockQuant {
  static async findAll() {
    return store.stock_quants;
  }

  static async findByProductAndLocation(productId, locationId) {
    return store.stock_quants.find(sq => sq.product_id === productId && sq.location_id === locationId) || null;
  }

  static async updateQuantity(productId, locationId, delta) {
    let quant = store.stock_quants.find(sq => sq.product_id === productId && sq.location_id === locationId);
    if (!quant) {
      quant = {
        id: `sq-${Date.now()}`,
        product_id: productId,
        location_id: locationId,
        quantity_on_hand: 0
      };
      store.stock_quants.push(quant);
    }
    quant.quantity_on_hand = Math.max(0, quant.quantity_on_hand + delta);
    return quant;
  }
}

module.exports = StockQuant;
