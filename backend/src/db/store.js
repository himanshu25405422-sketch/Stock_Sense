// In-memory data store initialized with enterprise sample data for StockSense IMS

const store = {
  users: [
    {
      id: "usr-1",
      email: "admin@stocksense.io",
      password: "admin123",
      full_name: "Priyanshu Raj (Admin)",
      role: "admin",
    },
    {
      id: "usr-2",
      email: "manager@stocksense.io",
      password: "manager123",
      full_name: "Himanshu Jha (Inventory Manager)",
      role: "inventory_manager",
    },
    {
      id: "usr-3",
      email: "staff@stocksense.io",
      password: "staff123",
      full_name: "Aditya Pathak (Warehouse Staff)",
      role: "warehouse_staff",
    }
  ],

  warehouses: [
    { id: "wh-1", code: "WH-MAIN", name: "Central Fulfillment Hub", location: "Chicago, IL" },
    { id: "wh-2", code: "WH-WEST", name: "West Coast Distribution Center", location: "Reno, NV" },
    { id: "wh-3", code: "WH-EAST", name: "East Coast Hub", location: "Newark, NJ" }
  ],

  locations: [
    { id: "loc-vendor-1", warehouse_name: "Vendor Hub", location_name: "Apex Steel Vendors", type: "VENDOR" },
    { id: "loc-wh1-main", warehouse_name: "Central Fulfillment Hub", location_name: "Main Store", type: "INTERNAL" },
    { id: "loc-wh1-prod", warehouse_name: "Central Fulfillment Hub", location_name: "Production Rack", type: "INTERNAL" },
    { id: "loc-wh2-main", warehouse_name: "West Coast DC", location_name: "Rack A", type: "INTERNAL" },
    { id: "loc-customer-1", warehouse_name: "Customer Site", location_name: "Titan Manufacturing", type: "CUSTOMER" },
    { id: "loc-scrap-1", warehouse_name: "Virtual Loss", location_name: "Scrap & Adjustments", type: "LOSS_ADJUSTMENT" }
  ],

  categories: [
    { id: "cat-1", name: "Raw Metals", description: "Industrial metals, rods & sheets" },
    { id: "cat-2", name: "Electronics", description: "Circuitry, sensors & microcontrollers" },
    { id: "cat-3", name: "Packaging", description: "Corrugated boxes & shipping supplies" }
  ],

  products: [
    {
      id: "prod-1",
      sku: "MET-STL-001",
      name: "Industrial Steel Rod 20mm",
      category_id: "cat-1",
      category_name: "Raw Metals",
      uom: "meters",
      reorder_level: 40,
      reorder_quantity: 100,
      stock: { "wh-1": 150, "wh-2": 30, "wh-3": 80 }
    },
    {
      id: "prod-2",
      sku: "MET-ALU-002",
      name: "Aluminum Sheet Grade 6061",
      category_id: "cat-1",
      category_name: "Raw Metals",
      uom: "sheets",
      reorder_level: 50,
      reorder_quantity: 200,
      stock: { "wh-1": 25, "wh-2": 15, "wh-3": 10 }
    },
    {
      id: "prod-3",
      sku: "ELE-MCU-301",
      name: "ARM Cortex Microcontroller Chip",
      category_id: "cat-2",
      category_name: "Electronics",
      uom: "units",
      reorder_level: 100,
      reorder_quantity: 500,
      stock: { "wh-1": 650, "wh-2": 300, "wh-3": 210 }
    },
    {
      id: "prod-4",
      sku: "PKG-BOX-101",
      name: "Heavy Duty Corrugated Box (L)",
      category_id: "cat-3",
      category_name: "Packaging",
      uom: "units",
      reorder_level: 200,
      reorder_quantity: 1000,
      stock: { "wh-1": 1200, "wh-2": 800, "wh-3": 450 }
    },
    {
      id: "prod-5",
      sku: "ELE-SEN-105",
      name: "Optical Laser Rangefinder Sensor",
      category_id: "cat-2",
      category_name: "Electronics",
      uom: "units",
      reorder_level: 30,
      reorder_quantity: 100,
      stock: { "wh-1": 12, "wh-2": 8, "wh-3": 5 }
    },
    {
      id: "prod-6",
      sku: "PKG-TP-202",
      name: "Industrial Packing Tape (50m)",
      category_id: "cat-3",
      category_name: "Packaging",
      uom: "rolls",
      reorder_level: 500,
      reorder_quantity: 2000,
      stock: { "wh-1": 800, "wh-2": 1500, "wh-3": 300 }
    },
    {
      id: "prod-7",
      sku: "MET-COP-005",
      name: "Copper Wire Spool 2.5mm",
      category_id: "cat-1",
      category_name: "Raw Metals",
      uom: "spools",
      reorder_level: 20,
      reorder_quantity: 50,
      stock: { "wh-1": 15, "wh-2": 5, "wh-3": 2 }
    }
  ],

  stock_quants: [
    { id: "sq-1", product_id: "prod-1", location_id: "loc-wh1-main", quantity_on_hand: 150 },
    { id: "sq-2", product_id: "prod-1", location_id: "loc-wh1-prod", quantity_on_hand: 80 },
    { id: "sq-3", product_id: "prod-2", location_id: "loc-wh1-main", quantity_on_hand: 25 },
    { id: "sq-4", product_id: "prod-3", location_id: "loc-wh1-main", quantity_on_hand: 650 },
    { id: "sq-5", product_id: "prod-4", location_id: "loc-wh1-main", quantity_on_hand: 1200 },
    { id: "sq-6", product_id: "prod-5", location_id: "loc-wh1-main", quantity_on_hand: 12 }
  ],

  stock_operations: [
    {
      id: "op-1",
      document_number: "REC-2026-001",
      document_type: "RECEIPT",
      source_location_id: "loc-vendor-1",
      destination_location_id: "loc-wh1-main",
      status: "DONE",
      created_by: "usr-2",
      created_by_name: "Alex Rivera",
      created_at: "2026-09-24T14:30:00Z",
      updated_at: "2026-09-24T14:35:00Z",
      items: [
        { product_id: "prod-1", product_name: "Industrial Steel Rod 20mm", demand_qty: 100, done_qty: 100 }
      ]
    },
    {
      id: "op-2",
      document_number: "TRN-2026-001",
      document_type: "INTERNAL_TRANSFER",
      source_location_id: "loc-wh1-main",
      destination_location_id: "loc-wh1-prod",
      status: "READY",
      created_by: "usr-2",
      created_by_name: "Alex Rivera",
      created_at: "2026-09-25T16:45:00Z",
      updated_at: "2026-09-25T16:45:00Z",
      items: [
        { product_id: "prod-1", product_name: "Industrial Steel Rod 20mm", demand_qty: 50, done_qty: 50 }
      ]
    },
    {
      id: "op-3",
      document_number: "DEL-2026-001",
      document_type: "DELIVERY",
      source_location_id: "loc-wh1-prod",
      destination_location_id: "loc-customer-1",
      status: "DONE",
      created_by: "usr-1",
      created_by_name: "Sarah Connor",
      created_at: "2026-09-25T11:20:00Z",
      updated_at: "2026-09-25T11:25:00Z",
      items: [
        { product_id: "prod-4", product_name: "Heavy Duty Corrugated Box (L)", demand_qty: 300, done_qty: 300 }
      ]
    },
    {
      id: "op-4",
      document_number: "ADJ-2026-001",
      document_type: "ADJUSTMENT",
      source_location_id: "loc-wh1-main",
      destination_location_id: "loc-scrap-1",
      status: "DONE",
      created_by: "usr-2",
      created_by_name: "Alex Rivera",
      created_at: "2026-09-26T08:30:00Z",
      updated_at: "2026-09-26T08:30:00Z",
      items: [
        { product_id: "prod-2", product_name: "Aluminum Sheet Grade 6061", demand_qty: 5, done_qty: 5 }
      ]
    }
  ],

  receipts: [
    {
      id: "rec-1",
      receipt_number: "REC-2026-001",
      supplier_name: "Apex Steel & Alloys Inc.",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      status: "processed",
      created_by: "Alex Rivera",
      created_at: "2026-09-24T14:30:00Z",
      items: [
        { product_id: "prod-1", product_name: "Industrial Steel Rod 20mm", quantity_received: 100, unit_price: 45.00 }
      ]
    },
    {
      id: "rec-2",
      receipt_number: "REC-2026-002",
      supplier_name: "Global Tech Supplies",
      warehouse_id: "wh-2",
      warehouse_name: "West Coast Distribution Center",
      status: "processed",
      created_by: "Sarah Connor",
      created_at: "2026-09-26T09:15:00Z",
      items: [
        { product_id: "prod-3", product_name: "ARM Cortex Microcontroller Chip", quantity_received: 500, unit_price: 12.50 },
        { product_id: "prod-5", product_name: "Optical Laser Rangefinder Sensor", quantity_received: 50, unit_price: 85.00 }
      ]
    }
  ],

  deliveries: [
    {
      id: "del-1",
      delivery_number: "DEL-2026-001",
      customer_name: "Titan Manufacturing Corp",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      status: "delivered",
      created_by: "Alex Rivera",
      created_at: "2026-09-25T11:20:00Z",
      items: [
        { product_id: "prod-4", product_name: "Heavy Duty Corrugated Box (L)", quantity_ordered: 300, quantity_delivered: 300 }
      ]
    }
  ],

  transfers: [
    {
      id: "trn-1",
      transfer_number: "TRN-2026-001",
      from_warehouse_id: "wh-1",
      from_warehouse_name: "Central Fulfillment Hub",
      to_warehouse_id: "wh-2",
      to_warehouse_name: "West Coast Distribution Center",
      status: "completed",
      created_by: "Alex Rivera",
      created_at: "2026-09-25T16:45:00Z",
      items: [
        { product_id: "prod-1", product_name: "Industrial Steel Rod 20mm", quantity: 20 }
      ]
    }
  ],

  adjustments: [
    {
      id: "adj-1",
      adjustment_number: "ADJ-2026-001",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      reason: "Annual Physical Audit Discrepancy",
      status: "applied",
      created_by: "Alex Rivera",
      created_at: "2026-09-23T08:30:00Z",
      items: [
        { product_id: "prod-2", product_name: "Aluminum Sheet Grade 6061", recorded_qty: 30, physical_qty: 25, diff: -5 }
      ]
    }
  ],

  stock_ledger: [
    {
      id: "ledg-1",
      operation_id: "op-1",
      product_id: "prod-1",
      product_name: "Industrial Steel Rod 20mm",
      sku: "MET-STL-001",
      source_location_id: "loc-vendor-1",
      destination_location_id: "loc-wh1-main",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      transaction_type: "RECEIPT",
      quantity_change: 100,
      quantity_changed: 100,
      reference_number: "REC-2026-001",
      created_by_name: "Alex Rivera",
      timestamp: "2026-09-24T14:30:00Z",
      created_at: "2026-09-24T14:30:00Z"
    },
    {
      id: "ledg-2",
      operation_id: "op-5",
      product_id: "prod-6",
      product_name: "Industrial Packing Tape (50m)",
      sku: "PKG-TP-202",
      source_location_id: "loc-vendor-2",
      destination_location_id: "loc-wh1-main",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      transaction_type: "RECEIPT",
      quantity_change: 500,
      quantity_changed: 500,
      reference_number: "REC-2026-003",
      created_by_name: "Priyanshu Raj",
      timestamp: "2026-09-26T10:15:00Z",
      created_at: "2026-09-26T10:15:00Z"
    },
    {
      id: "ledg-3",
      operation_id: "op-6",
      product_id: "prod-7",
      product_name: "Copper Wire Spool 2.5mm",
      sku: "MET-COP-005",
      source_location_id: "loc-wh1-main",
      destination_location_id: "loc-customer-2",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      transaction_type: "DELIVERY",
      quantity_change: -10,
      quantity_changed: -10,
      reference_number: "DEL-2026-005",
      created_by_name: "Aditya Pathak",
      timestamp: "2026-09-26T11:45:00Z",
      created_at: "2026-09-26T11:45:00Z"
    }
  ]
};

function logLedger({ operation_id, product_id, source_location_id, destination_location_id, warehouse_id, transaction_type, quantity_change, reference_number, created_by_name }) {
  const product = store.products.find(p => p.id === product_id);
  const warehouse = store.warehouses.find(w => w.id === warehouse_id);
  const entry = {
    id: `ledg-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    operation_id: operation_id || `op-${Date.now()}`,
    product_id,
    product_name: product ? product.name : "Unknown Product",
    sku: product ? product.sku : "SKU-UNK",
    source_location_id: source_location_id || "loc-vendor-1",
    destination_location_id: destination_location_id || "loc-wh1-main",
    warehouse_id: warehouse_id || "wh-1",
    warehouse_name: warehouse ? warehouse.name : "Central Hub",
    transaction_type: transaction_type || "RECEIPT",
    quantity_change: Number(quantity_change),
    quantity_changed: Number(quantity_change),
    reference_number: reference_number || "REF-000",
    created_by_name: created_by_name || "System User",
    timestamp: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  store.stock_ledger.unshift(entry);
}

module.exports = { store, logLedger };
