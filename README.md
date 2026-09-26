# 📦 StockSense — Enterprise Inventory Management System

> A modern, scalable, real-time inventory management system that replaces manual registers and Excel sheets with a centralized, cloud-ready web application. Built with industry best practices for enterprise stock operations.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Team Structure](#team-structure)
- [Workflow Example](#workflow-example)
- [Development Guides](#development-guides)

---

## 🎯 Overview

**StockSense** is an enterprise-grade inventory management solution designed to streamline stock operations across multiple warehouses. It provides real-time tracking, audit trails, and intelligent automation for businesses of all sizes.

### Key Goals
- ✅ Replace manual inventory tracking with digital, real-time system
- ✅ Provide multi-warehouse inventory visibility and control
- ✅ Create immutable audit trail for compliance and traceability
- ✅ Enable fast, error-free stock operations (receipts, deliveries, transfers)
- ✅ Offer role-based access and detailed reporting

### Target Users
- **Inventory Managers** — Oversee all warehouse operations and reporting
- **Warehouse Staff** — Perform daily stock operations (receive, pick, pack, move)
- **Admin Users** — Manage warehouses, categories, and system settings

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React SPA (Vite)                                        │   │
│  │  ├─ Authentication Pages (Login, Signup, OTP)          │   │
│  │  ├─ Dashboard (KPIs, Filters, Charts)                  │   │
│  │  ├─ Product Management Module                          │   │
│  │  ├─ Receipts Module (Incoming Stock)                   │   │
│  │  ├─ Deliveries Module (Outgoing Stock)                 │   │
│  │  ├─ Internal Transfers Module                          │   │
│  │  ├─ Stock Adjustments Module                           │   │
│  │  └─ Stock Ledger Viewer (Audit Trail)                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↕                                    │
│                         HTTP/REST API                             │
│                      (Vite Proxy → 5000)                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Backend)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Express.js Server (Port 5000)                                   │
│  ├─ Route: /api/auth          (JWT + OTP)                       │
│  ├─ Route: /api/products      (CRUD, Stock tracking)            │
│  ├─ Route: /api/receipts      (Incoming goods)                  │
│  ├─ Route: /api/deliveries    (Outgoing goods)                  │
│  ├─ Route: /api/transfers     (Internal moves)                  │
│  ├─ Route: /api/adjustments   (Physical count fixes)            │
│  ├─ Route: /api/dashboard     (KPIs & Ledger)                   │
│  │                                                               │
│  └─ Middleware:                                                  │
│     ├─ JWT Authentication                                       │
│     ├─ Error Handling                                           │
│     ├─ CORS                                                      │
│     └─ Request Logging                                          │
│                              ↕                                    │
│                    PostgreSQL (JDBC)                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER (Database)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PostgreSQL 12+ (Relational Database)                            │
│  │                                                               │
│  ├─ Core Tables:                                                │
│  │  ├─ users              (Authentication & Authorization)      │
│  │  ├─ warehouses         (Physical locations)                  │
│  │  ├─ product_categories (Product grouping)                    │
│  │  ├─ products           (SKU & metadata)                      │
│  │  └─ stock_levels       (Current inventory per location)      │
│  │                                                               │
│  ├─ Transaction Tables:                                         │
│  │  ├─ receipts           (Incoming goods from vendors)         │
│  │  ├─ receipt_items      (Line items in receipts)             │
│  │  ├─ delivery_orders    (Outgoing goods to customers)        │
│  │  ├─ delivery_items     (Line items in deliveries)           │
│  │  ├─ internal_transfers (Warehouse-to-warehouse moves)       │
│  │  ├─ transfer_items     (Line items in transfers)            │
│  │  └─ stock_adjustments  (Physical count corrections)         │
│  │                                                               │
│  ├─ Audit Trail:                                                │
│  │  └─ stock_ledger       (Immutable transaction log)           │
│  │     ├─ Every stock change is logged here                     │
│  │     ├─ Includes: type, quantity, reference, user, timestamp  │
│  │     └─ Primary source for reports & compliance               │
│  │                                                               │
│  └─ Indexes (Performance):                                       │
│     ├─ product_id         (Fast product lookups)                │
│     ├─ warehouse_id       (Warehouse filtering)                 │
│     ├─ status             (Document status queries)             │
│     └─ created_at         (Timeline queries)                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. USER ACTION (Frontend)
   ↓
2. API REQUEST (HTTP POST/GET/PUT/DELETE)
   ↓
3. AUTHENTICATION (JWT Token Verification)
   ↓
4. BUSINESS LOGIC (Express Controller)
   ↓
5. DATABASE TRANSACTION (PostgreSQL)
   ├─ Insert/Update Main Record (receipts, deliveries, etc.)
   ├─ Update stock_levels table
   └─ Log to stock_ledger (immutable audit trail)
   ↓
6. API RESPONSE (JSON)
   ↓
7. UI UPDATE (React State + Re-render)
```

### Key Architectural Principles

| Principle | Implementation |
|-----------|-----------------|
| **Single Source of Truth** | Stock Ledger is immutable; all reports generated from it |
| **ACID Transactions** | PostgreSQL ensures consistency across all stock updates |
| **Stateless API** | Each request is independent; no server-side sessions |
| **Separation of Concerns** | Frontend (UI), Backend (Logic), Database (Data) layers |
| **RESTful Design** | Standard HTTP methods (GET, POST, PUT, DELETE) |
| **Authentication** | JWT tokens + OTP for password resets |
| **Error Handling** | Centralized error middleware for consistent responses |
| **Performance** | Database indexes on frequently queried columns |

---

## 🛠️ Tech Stack

### Frontend Stack

```
┌─────────────────────────────────────────┐
│         Frontend Technology             │
├─────────────────────────────────────────┤
│ Framework       │ React 18              │
│ Build Tool      │ Vite                  │
│ Styling         │ Tailwind CSS          │
│ Routing         │ React Router v6       │
│ HTTP Client     │ Axios                 │
│ Icons           │ Lucide React          │
│ Package Manager │ npm / yarn            │
│ Runtime         │ Node.js v16+          │
└─────────────────────────────────────────┘
```

#### Why These Technologies?

| Technology | Why? |
|-----------|------|
| **React 18** | Modern, component-based UI; large ecosystem; hooks for state management |
| **Vite** | Lightning-fast dev server; instant HMR; optimized production builds |
| **Tailwind CSS** | Utility-first; rapid UI development; responsive design; consistent styling |
| **React Router** | Client-side routing; dynamic page navigation without full reloads |
| **Axios** | Promise-based HTTP client; interceptors for auth tokens; error handling |
| **Lucide Icons** | 1300+ consistent, clean SVG icons; tree-shakeable |

#### Frontend Project Structure

```
frontend/
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root component + routing
│   ├── index.css                   # Global styles + Tailwind imports
│   │
│   ├── api/
│   │   └── client.js               # Axios instance + interceptors
│   │
│   ├── context/
│   │   └── AuthContext.js          # Global auth state
│   │
│   ├── pages/                      # Page components (one per route)
│   │   ├── LoginPage.jsx           # User login
│   │   ├── SignupPage.jsx          # User registration
│   │   ├── DashboardPage.jsx       # KPIs & overview
│   │   ├── ProductsPage.jsx        # Product CRUD
│   │   ├── ReceiptsPage.jsx        # Incoming stock
│   │   ├── DeliveriesPage.jsx      # Outgoing stock
│   │   ├── TransfersPage.jsx       # Internal transfers
│   │   └── AdjustmentsPage.jsx     # Stock adjustments
│   │
│   ├── components/                 # Reusable components
│   │   ├── auth/                   # Login/signup forms
│   │   ├── dashboard/              # KPI cards, charts
│   │   ├── products/               # Product list, forms
│   │   ├── receipts/               # Receipt UI
│   │   ├── deliveries/             # Delivery UI
│   │   ├── transfers/              # Transfer UI
│   │   ├── adjustments/            # Adjustment UI
│   │   └── common/
│   │       └── Sidebar.jsx         # Navigation menu
│   │
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Helper functions
│   │
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind theme
│   ├── postcss.config.js           # PostCSS plugins
│   ├── index.html                  # HTML template
│   └── package.json                # Dependencies
```

---

### Backend Stack

```
┌──────────────────────────────────────────┐
│        Backend Technology                │
├──────────────────────────────────────────┤
│ Framework       │ Express.js v4          │
│ Runtime         │ Node.js v16+           │
│ Database        │ PostgreSQL v12+        │
│ Authentication  │ JWT (jsonwebtoken)     │
│ Password Hash   │ bcryptjs               │
│ Email Service   │ Nodemailer             │
│ CORS            │ cors middleware        │
│ Env Manager     │ dotenv                 │
│ Database Client │ pg (native driver)     │
│ Package Manager │ npm                    │
└──────────────────────────────────────────┘
```

#### Why These Technologies?

| Technology | Why? |
|-----------|------|
| **Express.js** | Lightweight; minimal; highly customizable; mature ecosystem |
| **Node.js** | JavaScript runtime; async/await for I/O; non-blocking operations |
| **PostgreSQL** | ACID transactions; relational; excellent for complex queries; free & open-source |
| **JWT** | Stateless authentication; secure; works well with REST APIs |
| **bcryptjs** | Industry-standard password hashing; salting prevents rainbow tables |
| **Nodemailer** | Send emails (OTP, notifications); supports SMTP |

#### Backend Project Structure

```
backend/
├── src/
│   ├── index.js                    # Express app entry point
│   │
│   ├── db/
│   │   ├── connection.js           # PostgreSQL connection pool
│   │   ├── schema.sql              # Complete database schema
│   │   ├── migrate.js              # Migration runner
│   │   └── seed.js                 # (Optional) Demo data
│   │
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   ├── errorHandler.js         # Global error handling
│   │   └── cors.js                 # CORS configuration
│   │
│   ├── routes/
│   │   ├── auth.js                 # /api/auth endpoints
│   │   ├── products.js             # /api/products endpoints
│   │   ├── receipts.js             # /api/receipts endpoints
│   │   ├── deliveries.js           # /api/deliveries endpoints
│   │   ├── transfers.js            # /api/transfers endpoints
│   │   ├── adjustments.js          # /api/adjustments endpoints
│   │   └── dashboard.js            # /api/dashboard endpoints
│   │
│   ├── controllers/                # Business logic (TODO)
│   │   ├── authController.js       # Auth logic
│   │   ├── productController.js    # Product logic
│   │   ├── receiptController.js    # Receipt logic
│   │   └── ... (one per entity)
│   │
│   ├── models/                     # Database queries
│   │   ├── User.js                 # User queries
│   │   ├── Product.js              # Product queries
│   │   └── ... (one per table)
│   │
│   ├── utils/                      # Helper functions
│   │   ├── validators.js           # Input validation
│   │   ├── emailService.js         # OTP sending
│   │   └── logger.js               # Application logging
│   │
│   ├── config/
│   │   └── constants.js            # App constants
│   │
│   ├── .env.example                # Environment variables template
│   ├── package.json                # Dependencies
│   └── .gitignore
```

---

## 📊 Database Schema

### Schema Overview

The database consists of **13 core tables** organized into 4 categories:

#### 1. **Authentication & Configuration**
- `users` — User accounts, passwords, OTP tokens
- `warehouses` — Physical warehouse/location data

#### 2. **Master Data**
- `product_categories` — Product groupings
- `products` — All SKU data (name, code, UoM, reorder rules)

#### 3. **Inventory State**
- `stock_levels` — Real-time inventory (qty per product per warehouse)

#### 4. **Transactions**
- `receipts` / `receipt_items` — Incoming goods from vendors
- `delivery_orders` / `delivery_items` — Outgoing goods to customers
- `internal_transfers` / `transfer_items` — Warehouse-to-warehouse moves
- `stock_adjustments` — Physical count corrections

#### 5. **Audit Trail** (Most Important!)
- `stock_ledger` — Immutable log of every stock change

### Entity-Relationship Diagram (ERD)

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ password_hash   │
│ full_name       │
│ role            │
│ created_at      │
└────────┬────────┘
         │
         │ creates
         │
         ├──────────────────────────────────────┐
         │                                      │
         ▼                                      ▼
    ┌─────────────┐                  ┌──────────────────┐
    │  receipts   │                  │ delivery_orders  │
    ├─────────────┤                  ├──────────────────┤
    │ id (PK)     │                  │ id (PK)          │
    │ supplier_id │                  │ customer_id      │
    │ warehouse_id│ (FK)             │ warehouse_id (FK)│
    │ status      │                  │ status           │
    │ created_by  │ (FK)             │ created_by (FK)  │
    └─────────────┘                  └──────────────────┘
         │                                      │
         │ contains                             │ contains
         │                                      │
         ▼                                      ▼
┌────────────────────┐        ┌─────────────────────┐
│   receipt_items    │        │  delivery_items     │
├────────────────────┤        ├─────────────────────┤
│ id (PK)            │        │ id (PK)             │
│ receipt_id (FK)    │        │ delivery_id (FK)    │
│ product_id (FK)    │        │ product_id (FK)     │
│ quantity_received  │        │ quantity_ordered    │
└────────────────────┘        │ quantity_picked     │
                              │ quantity_packed     │
         │                     └─────────────────────┘
         │                                │
         │ references            references│
         │                                │
         └──────────────┬─────────────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │   products   │
                 ├──────────────┤
                 │ id (PK)      │
                 │ sku (UNIQUE) │
                 │ name         │
                 │ category_id  │
                 │ uom          │
                 │ reorder_level│
                 └──────┬───────┘
                        │
                        │ stock per location
                        │
                        ▼
                 ┌──────────────────┐
                 │  stock_levels    │
                 ├──────────────────┤
                 │ id (PK)          │
                 │ product_id (FK)  │
                 │ warehouse_id (FK)│
                 │ quantity         │
                 └──────┬───────────┘
                        │
                        │ logged to
                        │
                        ▼
                 ┌──────────────────┐
    ┌────────────│  stock_ledger    │◄─────────────┐
    │            ├──────────────────┤              │
    │            │ id (PK)          │              │
    │            │ product_id (FK)  │              │
    │            │ transaction_type │              │
    │            │ quantity_change  │              │
    │            │ reference_id     │              │
    │            │ reference_type   │              │
    │            │ created_by (FK)  │              │
    │            │ created_at       │              │
    │            └──────────────────┘              │
    │                                              │
    └──────────── logged by every operation ────────┘
         (receipts, deliveries, transfers, adjustments)
```

### Key Schema Features

| Feature | Purpose |
|---------|---------|
| **UUIDs** | Globally unique identifiers (scalable across servers) |
| **Timestamps** | `created_at`, `updated_at` for audit trails |
| **Foreign Keys** | Relational integrity (orphaned records impossible) |
| **Indexes** | Fast queries on frequently filtered columns |
| **Stock Ledger** | Immutable audit trail (no deletes, only inserts) |
| **Status Fields** | Track document lifecycle (draft → ready → done) |

---

## ✨ Features

### 1. **Authentication & Authorization**
- ✅ User signup with email validation
- ✅ Secure login with JWT tokens
- ✅ OTP-based password reset (email-based)
- ✅ Role-based access (inventory_manager, warehouse_staff, admin)
- ✅ Token expiration + refresh mechanism

### 2. **Product Management**
- ✅ Create/Read/Update/Delete products
- ✅ SKU + Barcode tracking
- ✅ Product categories & units of measure
- ✅ Reorder level & quantity alerts
- ✅ Stock availability per warehouse
- ✅ Low stock notifications

### 3. **Receipt Operations** (Incoming Stock)
- ✅ Create receipts from vendors
- ✅ Add multiple items to receipt
- ✅ Input received quantities
- ✅ Validate & process (auto-increases stock)
- ✅ Real-time stock updates
- ✅ Full audit trail

### 4. **Delivery Operations** (Outgoing Stock)
- ✅ Create delivery orders for customers
- ✅ Pick items workflow
- ✅ Pack items workflow
- ✅ Validate & process (auto-decreases stock)
- ✅ Status tracking (draft → picked → packed → delivered)
- ✅ Prevent overselling

### 5. **Internal Transfers**
- ✅ Move stock between warehouses
- ✅ Move stock between racks/locations
- ✅ Maintain total inventory (no stock increase/decrease)
- ✅ Track from/to warehouse
- ✅ Complete transfer workflow

### 6. **Stock Adjustments**
- ✅ Physical inventory counting
- ✅ Compare recorded vs physical count
- ✅ Auto-calculate differences
- ✅ Apply adjustments to fix mismatches
- ✅ Log reasons (damaged, theft, error, etc.)

### 7. **Dashboard & Analytics**
- ✅ **KPI Cards**: Total products, low stock items, pending operations
- ✅ **Dynamic Filters**: By document type, status, warehouse, date range
- ✅ **Stock Ledger Viewer**: Complete audit trail with filtering
- ✅ **Reports**: Stock movements, receipts, deliveries (planned)

### 8. **Audit Trail**
- ✅ Every stock change logged immutably
- ✅ Track who, what, when
- ✅ Reference to source document
- ✅ Transaction type (receipt, delivery, transfer, adjustment)
- ✅ Compliance-ready audit log

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12 or higher ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** (comes with Node.js)
- **Git** (for version control)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Stock_Sense.git
cd Stock_Sense
```

### Step 2: Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stocksense
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d

# Email (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="StockSense <your-email@gmail.com>"

# OTP
OTP_EXPIRES_IN=10
```

#### Create PostgreSQL Database
```bash
createdb stocksense
```

#### Run Database Migrations
```bash
npm run db:migrate
```

This creates all tables and indexes automatically.

#### Start Backend Server
```bash
npm run dev
```

Expected output:
```
🚀 StockSense backend running on port 5000
```

### Step 3: Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Start Frontend Dev Server
```bash
npm run dev
```

Expected output:
```
  Local:   http://localhost:3000
```

### Step 4: Test the Setup

1. Open `http://localhost:3000` in your browser
2. You should see the StockSense login page
3. Try creating an account or logging in
4. Check the browser console for any errors

---

## 🔗 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}

Response 201:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Request OTP (Password Reset)
```http
POST /api/auth/request-otp
Content-Type: application/json

{
  "email": "user@example.com"
}

Response 200:
{
  "message": "OTP sent to email"
}
```

#### Verify OTP & Reset Password
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "new_password": "NewSecurePass123!"
}

Response 200:
{
  "message": "Password reset successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?category=electronics&warehouse=main-warehouse
Headers:
  Authorization: Bearer {token}

Response 200:
{
  "products": [
    {
      "id": "...",
      "sku": "PROD-001",
      "name": "Steel Rod",
      "category": "Materials",
      "reorder_level": 10,
      "stock_levels": {
        "main-warehouse": 50,
        "secondary-warehouse": 30
      }
    }
  ],
  "total": 1
}
```

#### Create Product
```http
POST /api/products
Headers:
  Authorization: Bearer {token}
Content-Type: application/json

{
  "sku": "PROD-002",
  "name": "Aluminum Sheet",
  "category_id": "category-uuid",
  "unit_of_measure": "kg",
  "reorder_level": 5,
  "reorder_quantity": 50
}

Response 201:
{
  "id": "product-uuid",
  "sku": "PROD-002",
  "name": "Aluminum Sheet",
  ...
}
```

### Receipt Endpoints

#### Create Receipt
```http
POST /api/receipts
Headers:
  Authorization: Bearer {token}
Content-Type: application/json

{
  "supplier_name": "ABC Metals Ltd",
  "warehouse_id": "warehouse-uuid"
}

Response 201:
{
  "id": "receipt-uuid",
  "receipt_number": "REC-2026-001",
  "status": "draft",
  "items": []
}
```

#### Add Items to Receipt
```http
POST /api/receipts/{receipt_id}/items
Headers:
  Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": "product-uuid",
  "quantity_received": 100,
  "unit_price": 50.00
}

Response 201:
{
  "id": "item-uuid",
  "receipt_id": "receipt-uuid",
  "product_id": "product-uuid",
  "quantity_received": 100
}
```

#### Validate Receipt (Process & Increase Stock)
```http
POST /api/receipts/{receipt_id}/validate
Headers:
  Authorization: Bearer {token}

Response 200:
{
  "message": "Receipt validated successfully",
  "stock_updates": [
    {
      "product_id": "product-uuid",
      "previous_qty": 0,
      "new_qty": 100
    }
  ]
}
```

Similar endpoints exist for Deliveries, Transfers, and Adjustments.

---

## 👥 Team Structure

### Team Assignments

| **Member** | **Role** | **Modules** | **Main Tasks** |
|-----------|---------|-----------|-----------------|
| **Member 1** | **Auth Lead** | Auth, Dashboard, Settings | JWT, OTP, KPIs, Filters, Profile Management |
| **Member 2** | **Product Lead** | Products, Stock Tracking | CRUD, Stock per location, Low stock alerts |
| **Member 3** | **Operations Lead** | Receipts, Deliveries | Incoming/outgoing workflows, Pick/pack flow |
| **Member 4** | **Inventory Lead** | Transfers, Adjustments, Ledger | Internal moves, Physical count fixes, Audit trail |

### Development Timeline

```
Week 1:
├─ Setup local environment (all members)
├─ Database migrations (Member 1)
└─ API route stubs (all members)

Week 2:
├─ Member 1: Auth endpoints + Dashboard KPIs
├─ Member 2: Product CRUD + Stock queries
├─ Member 3: Receipt + Delivery workflows
└─ Member 4: Transfers + Adjustments + Ledger queries

Week 3:
├─ Frontend pages for each module (all members in parallel)
├─ API integration (all members)
└─ Testing & debugging

Week 4:
├─ End-to-end testing
├─ UI/UX refinements
└─ Deployment preparation
```

---

## 📋 Workflow Example

### Complete Inventory Flow (from PDF)

This example demonstrates all core features working together:

#### **Step 1: Receive 100 kg Steel from Vendor**

**Action:** Member 3 creates receipt
```
Receipt #REC-001 | Supplier: Ace Steel | Status: Draft
├─ Add Item: Product (Steel), Qty: 100 kg, Price: $50/kg
└─ Validate Receipt

Result:
├─ Stock Updated: Steel = 0 + 100 = 100 kg
├─ Ledger Entry: Type=RECEIPT, Qty=+100, Ref=REC-001
└─ Status: Receipt → DONE
```

**Current Stock:**
```
Main Warehouse:
  └─ Steel: 100 kg
```

---

#### **Step 2: Transfer 80 kg to Production Rack**

**Action:** Member 4 creates internal transfer
```
Transfer #TRF-001 | From: Main Warehouse, To: Production Rack
├─ Add Item: Product (Steel), Qty: 80 kg
└─ Complete Transfer

Result:
├─ Stock Updated: 
│  ├─ Main Warehouse: 100 - 80 = 20 kg
│  └─ Production Rack: 0 + 80 = 80 kg
├─ Total Inventory: Still 100 kg (no change)
├─ Ledger Entries:
│  ├─ Type=TRANSFER_OUT, Qty=-80, Ref=TRF-001
│  └─ Type=TRANSFER_IN, Qty=+80, Ref=TRF-001
└─ Status: Transfer → DONE
```

**Current Stock:**
```
Main Warehouse:
  └─ Steel: 20 kg
Production Rack:
  └─ Steel: 80 kg
Total: 100 kg ✓
```

---

#### **Step 3: Deliver 20 kg to Customer**

**Action:** Member 3 creates delivery order
```
Delivery #DEL-001 | Customer: XYZ Corp
├─ Add Item: Product (Steel), Qty: 20 kg
├─ Pick (set qty_picked = 20)
├─ Pack (set qty_packed = 20)
└─ Validate Delivery

Result:
├─ Stock Updated: Production Rack: 80 - 20 = 60 kg
├─ Ledger Entry: Type=DELIVERY, Qty=-20, Ref=DEL-001
└─ Status: Delivery → DONE
```

**Current Stock:**
```
Main Warehouse:
  └─ Steel: 20 kg
Production Rack:
  └─ Steel: 60 kg
Total: 80 kg ✓
```

---

#### **Step 4: Adjust for 3 kg Damaged Items**

**Action:** Member 4 creates adjustment
```
Adjustment #ADJ-001
├─ Product: Steel
├─ Location: Production Rack
├─ Recorded Qty: 60 kg
├─ Physical Count: 57 kg (3 kg damaged)
├─ Difference: -3 kg
└─ Apply Adjustment

Result:
├─ Stock Updated: Production Rack: 60 - 3 = 57 kg
├─ Ledger Entry: Type=ADJUSTMENT, Qty=-3, Ref=ADJ-001, Reason=Damaged
└─ Status: Adjustment → DONE
```

**Final Stock:**
```
Main Warehouse:
  └─ Steel: 20 kg
Production Rack:
  └─ Steel: 57 kg
Total: 77 kg ✓
```

---

#### **Complete Audit Trail (Stock Ledger)**

| # | Type | Product | Qty | Location | Reference | User | Timestamp |
|---|------|---------|-----|----------|-----------|------|-----------|
| 1 | RECEIPT | Steel | +100 | Main Warehouse | REC-001 | user1 | 2026-09-26 08:00 |
| 2 | TRANSFER_OUT | Steel | -80 | Main Warehouse | TRF-001 | user2 | 2026-09-26 09:30 |
| 3 | TRANSFER_IN | Steel | +80 | Production Rack | TRF-001 | user2 | 2026-09-26 09:30 |
| 4 | DELIVERY | Steel | -20 | Production Rack | DEL-001 | user1 | 2026-09-26 11:00 |
| 5 | ADJUSTMENT | Steel | -3 | Production Rack | ADJ-001 | user3 | 2026-09-26 14:00 |

**Key Insights:**
- ✅ Every operation logged immutably
- ✅ Full traceability of who did what and when
- ✅ Can reconstruct inventory at any point in time
- ✅ Compliance-ready for audits

---

## 📚 Development Guides

### For Frontend Developers

1. **Setting Up Vite + React**
   - Components are in `frontend/src/components/`
   - Pages are in `frontend/src/pages/`
   - Global state in `frontend/src/context/`
   - API calls via `frontend/src/api/client.js`

2. **Component Structure**
   ```jsx
   export default function MyComponent() {
     const { user } = useContext(AuthContext)
     const [data, setData] = useState([])
     
     useEffect(() => {
       api.get('/endpoint').then(res => setData(res.data))
     }, [])
     
     return (
       <div className="p-6">
         {/* Your JSX here */}
       </div>
     )
   }
   ```

3. **Styling with Tailwind**
   - Use utility classes: `className="p-6 bg-blue-500 text-white"`
   - Responsive: `className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"`
   - Refer to [Tailwind Docs](https://tailwindcss.com/)

### For Backend Developers

1. **Creating New Routes**
   ```javascript
   const express = require('express')
   const router = express.Router()
   const authMiddleware = require('../middleware/auth')
   
   router.post('/', authMiddleware, async (req, res) => {
     // Your logic here
     res.json({ message: 'Success' })
   })
   
   module.exports = router
   ```

2. **Database Queries**
   ```javascript
   const pool = require('../db/connection')
   
   const result = await pool.query(
     'SELECT * FROM products WHERE id = $1',
     [productId]
   )
   ```

3. **Error Handling**
   ```javascript
   try {
     // Your code
   } catch (error) {
     res.status(500).json({ error: error.message })
   }
   ```

---

## 📦 Deployment

### Recommended Deployment Platforms

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, Fly.io, AWS EC2
- **Database**: Managed PostgreSQL (Amazon RDS, Azure Database, Supabase)

### Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] All tests passing
- [ ] API endpoints tested in Postman
- [ ] Frontend builds without errors
- [ ] HTTPS enabled on API
- [ ] CORS configured properly
- [ ] Logging configured
- [ ] Backup strategy in place

---

## 📞 Support & Contribution

- **Issues**: Open a GitHub issue for bugs
- **Discussions**: Use GitHub Discussions for feature ideas
- **PRs**: Submit pull requests with detailed descriptions

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🎉 Ready to Build?

1. ✅ Understand the architecture
2. ✅ Set up local environment
3. ✅ Review your team assignment
4. ✅ Start building!

**Happy coding! 🚀**

---

**Last Updated:** 2026-09-26  
**Project Status:** 🟢 Active Development  
**Team Members:** 4  
