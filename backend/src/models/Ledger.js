const { store, logLedger } = require('../db/store');

class Ledger {
  static async findAll() {
    return store.stock_ledger;
  }

  static async log(entry) {
    return logLedger(entry);
  }
}

module.exports = Ledger;
