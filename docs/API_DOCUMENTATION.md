# 🔗 StockSense API Specification

Detailed HTTP request and response specifications for all StockSense REST API endpoints.

---

## 🔐 1. Authentication Endpoints

### `POST /api/auth/login`
Authenticate user and retrieve JWT token.
- **Request Body**:
  ```json
  {
    "email": "manager@stocksense.io",
    "password": "Password123!"
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "token": "jwt_mock_token_1727330000000",
    "user": {
      "id": "usr-2",
      "email": "manager@stocksense.io",
      "full_name": "Alex Rivera",
      "role": "inventory_manager"
    }
  }
  ```

---

## 📦 2. Product Master Endpoints

### `GET /api/products`
Fetch full catalog of products with stock breakdown.
- **Response 200 OK**:
  ```json
  [
    {
      "id": "prod-1",
      "sku": "MET-STL-001",
      "name": "Industrial Steel Rod 20mm",
      "category_name": "Raw Metals",
      "uom": "meters",
      "reorder_level": 40,
      "stock": { "wh-1": 150, "wh-2": 30, "wh-3": 80 }
    }
  ]
  ```

### `POST /api/products`
Create a new SKU.
- **Request Body**:
  ```json
  {
    "sku": "ELE-RES-501",
    "name": "10k Ohm Resistor Pack",
    "category_id": "cat-2",
    "uom": "packs",
    "reorder_level": 50,
    "reorder_quantity": 200,
    "initial_stock": 100
  }
  ```

---

## 📥 3. Receipt Endpoints (Incoming Stock)

### `POST /api/receipts`
Create a draft vendor receipt.
- **Request Body**:
  ```json
  {
    "supplier_name": "Apex Steel & Alloys Inc.",
    "warehouse_id": "wh-1",
    "items": [
      { "product_id": "prod-1", "quantity_received": 100, "unit_price": 45.00 }
    ]
  }
  ```

### `POST /api/receipts/:id/validate`
Validate receipt, increment warehouse stock, and write to `stock_ledger`.
- **Response 200 OK**:
  ```json
  {
    "message": "Receipt validated and stock updated",
    "receipt": { "id": "rec-1", "status": "processed" }
  }
  ```

---

## 📤 4. Delivery Endpoints (Outgoing Stock)

### `POST /api/deliveries/:id/validate`
Fulfill customer shipment, decrement warehouse stock, and log to `stock_ledger`.

---

## 📜 5. Audit Stock Ledger Endpoint

### `GET /api/ledger`
Fetch complete immutable audit history log.
- **Response 200 OK**:
  ```json
  [
    {
      "id": "ledg-1",
      "product_name": "Industrial Steel Rod 20mm",
      "sku": "MET-STL-001",
      "warehouse_name": "Central Fulfillment Hub",
      "transaction_type": "RECEIPT",
      "quantity_change": "+100",
      "reference_number": "REC-2026-001",
      "created_by_name": "Alex Rivera",
      "created_at": "2026-09-24T14:30:00Z"
    }
  ]
  ```
