module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "stocksense_enterprise_secret_key_2026",
  ROLES: {
    ADMIN: "admin",
    MANAGER: "inventory_manager",
    STAFF: "warehouse_staff"
  },
  TRANSACTION_TYPES: {
    RECEIPT: "RECEIPT",
    DELIVERY: "DELIVERY",
    TRANSFER_IN: "TRANSFER_IN",
    TRANSFER_OUT: "TRANSFER_OUT",
    ADJUSTMENT: "ADJUSTMENT"
  }
};
