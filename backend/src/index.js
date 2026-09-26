const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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
const locationRoutes = require("./routes/locations");
const operationRoutes = require("./routes/operations");

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 StockSense Enterprise Backend API is running!",
    status: "ok",
    version: "1.0.0",
    frontend_app: "http://localhost:5173",
    openapi_spec: "/api/v1/openapi.json",
    api_endpoints: {
      health: "/health",
      auth: "/api/v1/auth",
      products: "/api/v1/products",
      categories: "/api/v1/categories",
      locations: "/api/v1/locations",
      warehouses: "/api/v1/warehouses",
      operations: "/api/v1/operations",
      receipts: "/api/v1/receipts",
      deliveries: "/api/v1/deliveries",
      transfers: "/api/v1/transfers",
      adjustments: "/api/v1/adjustments",
      stock_ledger: "/api/v1/stock-ledger",
      dashboard: "/api/v1/dashboard"
    }
  });
});

// Health checks
app.get("/health", (req, res) => res.json({ status: "ok", app: "StockSense API Server" }));
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "StockSense API Server" }));

// OpenAPI Spec Endpoint
app.get("/api/v1/openapi.json", (req, res) => {
  const specPath = path.join(__dirname, "../../docs/openapi.json");
  if (fs.existsSync(specPath)) {
    res.sendFile(specPath);
  } else {
    res.status(404).json({ error: "OpenAPI specification not found" });
  }
});

// Open v1 API Mounts
const v1Router = express.Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/products", productRoutes);
v1Router.use("/receipts", receiptRoutes);
v1Router.use("/deliveries", deliveryRoutes);
v1Router.use("/transfers", transferRoutes);
v1Router.use("/adjustments", adjustmentRoutes);
v1Router.use("/dashboard", dashboardRoutes);
v1Router.use("/locations", locationRoutes);
v1Router.use("/operations", operationRoutes);

v1Router.get("/categories", (req, res) => res.json(store.categories));
v1Router.get("/uoms", (req, res) => res.json(["units", "kg", "meters", "sheets", "liters", "packs"]));
v1Router.get("/warehouses", (req, res) => res.json(store.warehouses));
v1Router.get("/stock-ledger", (req, res) => res.json(store.stock_ledger));
v1Router.get("/inventory", (req, res) => res.json(store.stock_quants));
v1Router.get("/suppliers", (req, res) => res.json([{ id: "sup-1", name: "Apex Steel & Alloys Inc." }, { id: "sup-2", name: "Silicon Wave Dynamics" }]));
v1Router.get("/notifications", (req, res) => res.json([]));
v1Router.get("/audit-logs", (req, res) => res.json(store.stock_ledger));

app.use("/api/v1", v1Router);

// Legacy v0 API Mounts (for frontend compatibility)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/adjustments", adjustmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/operations", operationRoutes);
app.get("/api/ledger", (req, res) => res.json(store.stock_ledger));
app.get("/api/warehouses", (req, res) => res.json(store.warehouses));

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 StockSense backend API running on http://localhost:${PORT}`);
});
