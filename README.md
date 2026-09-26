# 📦 StockSense — Enterprise Inventory Management System (IMS)

> A modern, scalable, real-time modular Inventory Management System designed to digitize inventory tracking, streamline multi-warehouse operations, and replace manual spreadsheets with an automated workflow engine.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Demo Credentials](#-demo-credentials)
- [System Architecture](#-system-architecture)
- [Data Models & Schema](#-data-models--schema)
- [API Endpoints Specification](#-api-endpoints-specification)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start Guide](#-quick-start-guide)
- [License](#-license)

---

## 🎯 Overview

**StockSense** replaces manual registers and scattered spreadsheets with a centralized, cloud-ready web application. It provides real-time multi-warehouse tracking, location-based stock quants, automated document workflows (`DRAFT` → `WAITING` → `READY` → `DONE`), and an immutable audit trail.

### Target Users & Roles
- **Admin / Inventory Managers**: Oversee incoming/outgoing stock, manage reordering rules, configure warehouse locations, approve adjustments, and audit ledger logs.
- **Warehouse Staff**: Process vendor receipts, perform physical stock counts, execute internal stock transfers, pick/pack customer delivery orders.

---

## ✨ Key Features

- 📊 **Executive Dashboard**: Live KPIs (Total Catalog SKUs, Total Stock Units, Low Stock Warnings, Pending Receipts/Deliveries) and recent audit stream.
- 📦 **Product Master Catalog**: Full CRUD for SKUs, categories, units of measure (UOM), reorder levels, and location breakdown.
- 📍 **Multi-Location Management**: Internal storage racks, Vendor hubs, Customer sites, and Virtual Loss/Gain adjustment zones.
- 📥 **Stock Receipts (Inbound)**: Receive shipments from suppliers, validate incoming quantities, auto-update stock on hand, and log ledger entries.
- 📤 **Delivery Orders (Outbound)**: Pick, pack, and ship customer orders with strict inventory availability checks.
- 🔀 **Internal Transfers**: Rebalance inventory between warehouses/racks with zero overall enterprise stock variance.
- ⚖️ **Physical Inventory Adjustments**: Reconcile physical inventory counts against system records with variance tracking.
- 📜 **Immutable Stock Ledger**: Audit trail logging every single quantity change with timestamp, user ID, reference document, and source/destination locations.

---

## 🔑 Demo Credentials

Use these credentials to sign in on the login page ([http://localhost:5173/login](http://localhost:5173/login)):

| Role | Email | Password | Access & Responsibilities |
|---|---|---|---|
| **Admin User** | `admin@stocksense.io` | `admin123` | Full system access (Warehouses, Categories, Reorder Rules, Audit Logs) |
| **Inventory Manager** | `manager@stocksense.io` | `manager123` | Operational approvals, document validations & stock reports |
| **Warehouse Staff** | `staff@stocksense.io` | `staff123` | Daily stock receipts, picks, packs, transfers & physical counts |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  React 18 SPA (Vite Dev Server: Port 5173)                      │
│  ├─ Auth Pages (Login with Demo Credentials Card, Signup, OTP)  │
│  ├─ Dashboard (KPI Cards, Filters, Live Ledger Stream)          │
│  ├─ Product Master Module (SKUs, Reorder Rules, Categories)     │
│  ├─ Operations Module (Receipts, Deliveries, Transfers, Adjs)   │
│  └─ Stock Ledger Viewer & Location Quant Matrix                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP/REST API Requests
                                 │ (Vite Proxy → Port 5000)
┌────────────────────────────────▼────────────────────────────────┐
│                      API LAYER (Backend)                        │
├─────────────────────────────────────────────────────────────────┤
│  Express.js Server (Port 5000)                                  │
│  ├─ Auth Controller        (/api/auth)                          │
│  ├─ Product Controller     (/api/products)                      │
│  ├─ Location Controller    (/api/locations)                     │
│  ├─ Operation Controller   (/api/operations)                    │
│  ├─ Receipt Controller     (/api/receipts)                      │
│  ├─ Delivery Controller    (/api/deliveries)                    │
│  ├─ Transfer Controller    (/api/transfers)                     │
│  ├─ Adjustment Controller  (/api/adjustments)                   │
│  └─ Dashboard Controller   (/api/dashboard)                     │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Relational SQL Queries / Store
┌────────────────────────────────▼────────────────────────────────┐
│                    DATA LAYER (Database)                        │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 12+ Relational Schema / In-Memory Fallback Store    │
│  ├─ Core Tables (users, warehouses, locations, products)        │
│  ├─ Quant Table (stock_quants)                                  │
│  ├─ Workflow Tables (stock_operations, receipts, deliveries)    │
│  └─ Immutable Audit Log (stock_ledger)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Models & Schema

```json
{
  "Product": {
    "id": "String (UUID)",
    "sku": "String (Unique)",
    "name": "String",
    "category_id": "String (FK)",
    "uom": "String (e.g., kg, units, meters)",
    "reorder_level": "Integer",
    "reorder_quantity": "Integer",
    "created_at": "Timestamp"
  },
  "Location": {
    "id": "String (UUID)",
    "warehouse_name": "String",
    "location_name": "String (e.g., Main Store, Production Rack, Rack A)",
    "type": "Enum [VENDOR, INTERNAL, CUSTOMER, LOSS_ADJUSTMENT]"
  },
  "StockQuant": {
    "id": "String (UUID)",
    "product_id": "String (FK)",
    "location_id": "String (FK)",
    "quantity_on_hand": "Decimal"
  },
  "StockOperation": {
    "id": "String (UUID)",
    "document_number": "String",
    "document_type": "Enum [RECEIPT, DELIVERY, INTERNAL_TRANSFER, ADJUSTMENT]",
    "source_location_id": "String (FK)",
    "destination_location_id": "String (FK)",
    "status": "Enum [DRAFT, WAITING, READY, DONE, CANCELED]",
    "created_by": "String (FK)",
    "items": [
      {
        "product_id": "String (FK)",
        "demand_qty": "Decimal",
        "done_qty": "Decimal"
      }
    ],
    "created_at": "Timestamp",
    "updated_at": "Timestamp"
  },
  "StockLedger": {
    "id": "String (UUID)",
    "operation_id": "String (FK)",
    "product_id": "String (FK)",
    "source_location_id": "String (FK)",
    "destination_location_id": "String (FK)",
    "quantity_changed": "Decimal",
    "timestamp": "Timestamp"
  }
}
```

---

## 🔗 API Endpoints Specification

### Authentication
- `POST /api/auth/signup` — Create a new user account.
- `POST /api/auth/login` — Sign in (strictly validates email & password against registered users).
- `POST /api/auth/request-otp` — Request a password reset OTP code.
- `POST /api/auth/verify-otp` — Verify OTP code and reset password.

### Master Data & Locations
- `GET /api/products` — Retrieve master product catalog with stock breakdown.
- `POST /api/products` — Create a new product SKU.
- `GET /api/locations` — Get all warehouses and location zones.
- `GET /api/locations/quants` — Retrieve location-wise stock quants (`StockQuant`).

### Stock Operations Engine
- `GET /api/operations` — Filter operations by `document_type`, `status`, or `location_id`.
- `POST /api/operations` — Create a new stock operation ticket.
- `PATCH /api/operations/:id/status` — Update operation status (`DRAFT` → `WAITING` → `READY` → `DONE`).
- `POST /api/operations/:id/validate` — Validate operation: debits source location, credits destination location, updates stock quants, and posts to `stock_ledger`.

### Module Direct Endpoints
- `GET /api/receipts` | `POST /api/receipts` — Inbound vendor receipts.
- `GET /api/deliveries` | `POST /api/deliveries` — Outbound customer deliveries.
- `GET /api/transfers` | `POST /api/transfers` — Internal location transfers.
- `GET /api/adjustments` | `POST /api/adjustments` — Physical count inventory adjustments.
- `GET /api/ledger` — Fetch immutable stock ledger audit history.
- `GET /api/dashboard` — Fetch live KPI summary and recent transaction logs.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend Framework** | React 18 | Modern component architecture SPA |
| **Build Tool** | Vite | Ultra-fast development server with HMR |
| **Styling** | Vanilla CSS + Tailwind | Custom Glassmorphism design system & utility classes |
| **Icons** | Lucide React | Clean, tree-shakeable SVG icons |
| **Backend Runtime** | Node.js + Express.js | Lightweight REST API server |
| **Authentication** | JWT + bcryptjs | Stateless token authentication |
| **Database** | PostgreSQL 12+ | Relational schema (`backend/src/db/schema.sql`) |

---

## 📂 Project Structure

```
Stock_Sense/
├── backend/
│   ├── src/
│   │   ├── config/             # Environment & App Constants
│   │   ├── controllers/        # Business logic controllers (auth, products, ops...)
│   │   ├── db/
│   │   │   ├── schema.sql      # PostgreSQL database schema
│   │   │   ├── init_schema.sql # Database DDL initialization
│   │   │   └── store.js        # In-memory data store & stock ledger logger
│   │   ├── middleware/         # Auth JWT, CORS, Error Handler
│   │   ├── models/             # Product, Location, StockQuant & StockOperation models
│   │   ├── routes/             # Express API routers
│   │   ├── utils/              # Validators, Email service & Logger
│   │   └── index.js            # Express API server entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/                # API fetch client wrapper
│   │   ├── components/         # Navigation & Reusable Layout UI
│   │   ├── context/            # AuthContext state provider
│   │   ├── pages/              # Module pages (Dashboard, Products, Login...)
│   │   ├── App.jsx             # React router SPA container
│   │   ├── index.css           # Glassmorphism design system
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js          # Vite configuration with API proxy to port 5000
│   └── package.json
├── docs/
│   ├── ARCHITECTURE.md         # System architecture & data flow
│   ├── DATABASE_SCHEMA.md      # Full table definitions & ERD
│   └── API_DOCUMENTATION.md    # REST API endpoints & payloads
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### 1. Backend Server Setup
```bash
cd backend
npm install
npm start
```
> Express API running on `http://localhost:5000`

### 2. Frontend Application Setup
```bash
cd frontend
npm install
npm run dev
```
> React SPA running on `http://localhost:5173`

Open [**http://localhost:5173**](http://localhost:5173) in your browser and log in using any of the [Demo Credentials](#-demo-credentials).

---

## 📄 License

This project is licensed under the MIT License.
