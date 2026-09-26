# 📦 StockSense — Enterprise Inventory Management System

> A modern, real-time inventory management web application designed for multi-warehouse stock operations, auditing, and automated workflows.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Demo Credentials](#-demo-credentials)
- [Documentation Deep-Dives](#-documentation-deep-dives)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)

---

## 🎯 Overview

**StockSense** replaces manual registers and complex spreadsheets with a centralized, cloud-ready web application. It provides real-time multi-warehouse tracking, immutable audit trails, and automated stock workflows.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  React 18 SPA (Vite) + Lucide Icons + Glassmorphism CSS         │
│  └─ Dashboard | Products | Receipts | Deliveries | Ledger Log   │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP/REST API
┌────────────────────────────────▼────────────────────────────────┐
│                      API LAYER (Backend)                        │
│  Express.js Server (Port 5000)                                  │
│  ├─ Auth | Products | Receipts | Deliveries | Transfers | Ledger│
└────────────────────────────────┬────────────────────────────────┘
                                 │ PostgreSQL / SQL Schema
┌────────────────────────────────▼────────────────────────────────┐
│                    DATA LAYER (Database)                        │
│  PostgreSQL 12+ (13 Core Tables + Immutable stock_ledger)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- 📊 **Executive Dashboard**: Live KPIs, low stock warnings, and recent transaction log.
- 📦 **Products & SKUs**: Full CRUD, categories, reorder thresholds, and warehouse breakdown.
- 📥 **Stock Receipts**: Record incoming shipments, validate receipts, and auto-increase stock.
- 📤 **Delivery Orders**: Pick/pack customer orders with stock availability verification.
- 🔀 **Internal Transfers**: Move stock between warehouses preserving overall inventory balance.
- ⚖️ **Physical Adjustments**: Reconcile physical inventory counts against system records.
- 📜 **Immutable Stock Ledger**: Every change logged with timestamp, user info, and reference ID.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin User** | `admin@stocksense.io` | `admin123` | Full access (Warehouses, Categories, Rules, Audit) |
| **Inventory Manager** | `manager@stocksense.io` | `manager123` | Operational access & Approvals |
| **Warehouse Staff** | `staff@stocksense.io` | `staff123` | Daily receipts, picks, packs, and transfers |

---

## 📚 Documentation Deep-Dives

For comprehensive technical specifications, explore the dedicated documentation files:

- 🏗️ **[Architecture & System Design](docs/ARCHITECTURE.md)** — Data flow diagrams, layer specifications, and design principles.
- 📊 **[Database Schema & ERD](docs/DATABASE_SCHEMA.md)** — Detailed column definitions for all 13 core tables, indexes, and audit ledger mechanics.
- 🔗 **[API Documentation](docs/API_DOCUMENTATION.md)** — Full REST API endpoints, request payloads, and JSON response samples.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18 + Vite | Component architecture & fast development server |
| **Styling** | Vanilla CSS3 / Tailwind | Custom Glassmorphism design system & dark/light theme |
| **Icons** | Lucide React | Clean, modern SVG icon suite |
| **Backend** | Node.js + Express.js | Lightweight REST API server |
| **Database** | PostgreSQL 12+ | ACID-compliant relational schema (`backend/src/db/schema.sql`) |

---

## 📂 Project Structure

```
Stock_Sense/
├── backend/
│   ├── src/
│   │   ├── config/             # Environment & App Constants
│   │   ├── controllers/        # Business logic controllers
│   │   ├── db/
│   │   │   ├── schema.sql      # PostgreSQL database schema
│   │   │   ├── init_schema.sql # Complete database DDL
│   │   │   └── store.js        # Data store & stock ledger logger
│   │   ├── middleware/         # Auth JWT, CORS, Error Handler
│   │   ├── models/             # Product, Location, Quant & Operation models
│   │   ├── routes/             # Express API routers
│   │   ├── utils/              # Validators, Email service & Logger
│   │   └── index.js            # Express API server (Port 5000)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # Layout & Reusable primitives
│   │   ├── pages/              # Module pages (Dashboard, Products, Receipts...)
│   │   ├── App.jsx             # Main router & layout
│   │   ├── index.css           # Glassmorphism design system
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js          # Vite configuration
│   └── package.json
├── docs/
│   ├── ARCHITECTURE.md         # System architecture & data flow
│   ├── DATABASE_SCHEMA.md      # Full table definitions & ERD
│   └── API_DOCUMENTATION.md    # REST API endpoints & payloads
└── README.md
```

---

## 🚀 Quick Start

### 1. Run Backend Server
```bash
cd backend
npm install
npm start
```
> Server running on `http://localhost:5000`

### 2. Run Frontend App
```bash
cd frontend
npm install
npm run dev
```
> Application running on `http://localhost:5173`

