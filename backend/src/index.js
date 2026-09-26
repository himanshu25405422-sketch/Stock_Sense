const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config/constants");
const { store } = require("./db/store");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const receiptRoutes = require("./routes/receipts");
const deliveryRoutes = require("./routes/deliveries");
const transferRoutes = require("./routes/transfers");
const adjustmentRoutes = require("./routes/adjustments");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

// API Route Mounts
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "StockSense API Server" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/adjustments", adjustmentRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/ledger", (req, res) => {
  res.json(store.stock_ledger);
});

app.get("/api/warehouses", (req, res) => {
  res.json(store.warehouses);
});

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 StockSense backend API running on http://localhost:${PORT}`);
});
