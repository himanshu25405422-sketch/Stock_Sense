# 📊 StockSense Database Schema Documentation

Complete specification of database tables, entity relationships, indexes, and audit ledger mechanics.

---

## 🗄️ Table Categories & ERD Overview

```
                        ┌──────────────┐
                        │    users     │
                        └──────┬───────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
    ┌──────────────┐    ┌──────────────┐   ┌──────────────┐
    │   receipts   │    │  deliveries  │   │  transfers   │
    └──────┬───────┘    └──────┬───────┘   └──────┬───────┘
           │                   │                  │
           ▼                   ▼                  ▼
    ┌──────────────┐    ┌──────────────┐   ┌──────────────┐
    │receipt_items │    │delivery_items│   │transfer_items│
    └──────┬───────┘    └──────┬───────┘   └──────┬───────┘
           │                   │                  │
           └─────────┬─────────┴──────────────────┘
                     ▼
              ┌──────────────┐
              │   products   │
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │ stock_levels │
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │ stock_ledger │ (Immutable Log)
              └──────────────┘
```

---

## 📑 Core Tables Specification

### 1. `users`
Tracks user accounts, full names, roles, and password hashes.
- `id` (UUID, Primary Key)
- `email` (VARCHAR 255, Unique, Not Null)
- `password_hash` (VARCHAR 255, Not Null)
- `full_name` (VARCHAR 255, Not Null)
- `role` (VARCHAR 50, Default 'warehouse_staff')
- `created_at` (TIMESTAMP)

### 2. `warehouses`
Physical warehouse locations.
- `id` (UUID, Primary Key)
- `code` (VARCHAR 50, Unique)
- `name` (VARCHAR 255)
- `location` (VARCHAR 255)

### 3. `product_categories`
Product groupings (e.g., Raw Metals, Electronics, Packaging).
- `id` (UUID, Primary Key)
- `name` (VARCHAR 100, Unique)
- `description` (TEXT)

### 4. `products`
Master SKU catalog.
- `id` (UUID, Primary Key)
- `sku` (VARCHAR 100, Unique)
- `name` (VARCHAR 255)
- `category_id` (UUID, FK -> `product_categories.id`)
- `uom` (VARCHAR 20, Unit of Measure: meters, units, sheets)
- `reorder_level` (INT)
- `reorder_quantity` (INT)

### 5. `stock_levels`
Current quantity per product per warehouse.
- `id` (UUID, Primary Key)
- `product_id` (UUID, FK -> `products.id`)
- `warehouse_id` (UUID, FK -> `warehouses.id`)
- `quantity` (INT)
- `CONSTRAINT`: UNIQUE(`product_id`, `warehouse_id`)

### 6. `stock_ledger` (Immutable Audit Trail)
Records **every single quantity change** across all operations.
- `id` (UUID, Primary Key)
- `product_id` (UUID, FK -> `products.id`)
- `warehouse_id` (UUID, FK -> `warehouses.id`)
- `transaction_type` (VARCHAR 50: RECEIPT, DELIVERY, TRANSFER_IN, TRANSFER_OUT, ADJUSTMENT)
- `quantity_change` (INT: Positive for inbound, Negative for outbound)
- `reference_number` (VARCHAR 100: Document ID like REC-2026-001)
- `created_by_name` (VARCHAR 100)
- `created_at` (TIMESTAMP)
