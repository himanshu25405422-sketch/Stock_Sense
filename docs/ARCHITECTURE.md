# 🏗️ StockSense System Architecture & Design

This document details the system architecture, design principles, and data flow for StockSense.

---

## 🏛️ System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  React 18 SPA (Vite)                                            │
│  ├─ Dashboard (KPIs, Stock Alerts, Charts)                      │
│  ├─ Product Master Module (SKUs, Reorder rules)                 │
│  ├─ Receipts Module (Incoming vendor stock)                     │
│  ├─ Deliveries Module (Outgoing customer orders)                │
│  ├─ Internal Transfers Module (Inter-warehouse moves)           │
│  ├─ Stock Adjustments Module (Physical count audit)             │
│  └─ Stock Ledger Viewer (Immutable compliance trail)            │
│                                                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │ REST API Requests
                                 │ (Vite Proxy → Port 5000)
┌────────────────────────────────▼────────────────────────────────┐
│                      API LAYER (Backend)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Express.js Server (Port 5000)                                  │
│  ├─ Auth Controller        (/api/auth)                          │
│  ├─ Product Controller     (/api/products)                      │
│  ├─ Receipt Controller     (/api/receipts)                      │
│  ├─ Delivery Controller    (/api/deliveries)                    │
│  ├─ Transfer Controller    (/api/transfers)                     │
│  ├─ Adjustment Controller  (/api/adjustments)                   │
│  └─ Dashboard Controller   (/api/dashboard)                     │
│                                                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │ SQL Queries (ACID Transactions)
┌────────────────────────────────▼────────────────────────────────┐
│                    DATA LAYER (Database)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PostgreSQL 12+ Relational Database                             │
│  ├─ Core Tables (users, warehouses, categories, products)       │
│  ├─ State Table (stock_levels)                                  │
│  ├─ Operation Tables (receipts, deliveries, transfers)          │
│  └─ Immutable Audit Log (stock_ledger)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 End-to-End Data Flow

```
1. USER ACTION (UI Button Click, e.g., "Validate Receipt")
   ↓
2. HTTP POST API REQUEST (/api/receipts/:id/validate)
   ↓
3. AUTH & MIDDLEWARE VERIFICATION (JWT Token Check)
   ↓
4. BUSINESS LOGIC & TRANSACTION EXECUTION
   ├─ Update Receipt status to 'processed'
   ├─ Increment stock_levels quantity for warehouse
   └─ Insert entry to stock_ledger (Immutable transaction record)
   ↓
5. DATABASE COMMIT (PostgreSQL ACID Transaction)
   ↓
6. HTTP 200 RESPONSE (JSON Payload)
   ↓
7. REACT UI UPDATE (State update & toast notification)
```

---

## 🛡️ Core Design Principles

| Principle | Implementation in StockSense |
|---|---|
| **Single Source of Truth** | All reporting and stock counts are verified through `stock_ledger`. |
| **Immutable Auditability** | No record in `stock_ledger` is ever updated or deleted. |
| **ACID Integrity** | Database operations execute within strict transactions to eliminate partial updates. |
| **Stateless API** | JWT token authentication ensures every REST request is self-contained. |
| **Separation of Concerns** | Clear demarcation between Client UI, Backend Logic, and Data Persistence. |
