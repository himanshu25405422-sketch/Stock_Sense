const express = require("express");
const cors = require("cors");
const { store, logLedger } = require("./db/store");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "StockSense API Server" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find(u => u.email === email);
  res.json({
    token: "jwt_mock_token_" + Date.now(),
    user: user || { id: "usr-" + Date.now(), email, full_name: "Inventory Specialist", role: "inventory_manager" }
  });
});

app.get("/api/products", (req, res) => {
  res.json(store.products);
});

app.get("/api/receipts", (req, res) => {
  res.json(store.receipts);
});

app.get("/api/deliveries", (req, res) => {
  res.json(store.deliveries);
});

app.get("/api/ledger", (req, res) => {
  res.json(store.stock_ledger);
});

app.get("/api/dashboard", (req, res) => {
  let totalStockUnits = 0;
  let lowStockCount = 0;

  store.products.forEach(p => {
    const totalProdStock = Object.values(p.stock).reduce((a, b) => a + b, 0);
    totalStockUnits += totalProdStock;
    if (totalProdStock <= p.reorder_level) lowStockCount++;
  });

  res.json({
    totalProducts: store.products.length,
    totalStockUnits,
    lowStockCount,
    pendingReceipts: store.receipts.filter(r => r.status === "draft").length,
    pendingDeliveries: store.deliveries.filter(d => d.status === "draft" || d.status === "picked").length,
    totalWarehouses: store.warehouses.length,
    recentLedger: store.stock_ledger.slice(0, 10)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 StockSense backend API running on http://localhost:${PORT}`);
});
