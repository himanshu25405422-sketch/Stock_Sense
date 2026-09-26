// In-memory data store initialized with enterprise sample data for StockSense

const store = {
  users: [
    {
      id: "usr-1",
      email: "admin@stocksense.io",
      full_name: "Sarah Connor (Admin)",
      role: "admin",
    },
    {
      id: "usr-2",
      email: "manager@stocksense.io",
      full_name: "Alex Rivera (Inventory Manager)",
      role: "inventory_manager",
    }
  ],

  warehouses: [
    { id: "wh-1", code: "WH-MAIN", name: "Central Fulfillment Hub", location: "Chicago, IL" },
    { id: "wh-2", code: "WH-WEST", name: "West Coast Distribution Center", location: "Reno, NV" },
    { id: "wh-3", code: "WH-EAST", name: "East Coast Hub", location: "Newark, NJ" }
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
      supplier_name: "Silicon Wave Dynamics",
      warehouse_id: "wh-2",
      warehouse_name: "West Coast Distribution Center",
      status: "draft",
      created_by: "Sarah Connor",
      created_at: "2026-09-26T09:15:00Z",
      items: [
        { product_id: "prod-3", product_name: "ARM Cortex Microcontroller Chip", quantity_received: 250, unit_price: 12.50 }
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
    },
    {
      id: "del-2",
      delivery_number: "DEL-2026-002",
      customer_name: "Nexus Robotics Systems",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      status: "picked",
      created_by: "Sarah Connor",
      created_at: "2026-09-26T10:00:00Z",
      items: [
        { product_id: "prod-3", product_name: "ARM Cortex Microcontroller Chip", quantity_ordered: 50, quantity_delivered: 0 }
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
      product_id: "prod-1",
      product_name: "Industrial Steel Rod 20mm",
      sku: "MET-STL-001",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      transaction_type: "RECEIPT",
      quantity_change: 100,
      reference_number: "REC-2026-001",
      created_by_name: "Alex Rivera",
      created_at: "2026-09-24T14:30:00Z"
    },
    {
      id: "ledg-2",
      product_id: "prod-4",
      product_name: "Heavy Duty Corrugated Box (L)",
      sku: "PKG-BOX-101",
      warehouse_id: "wh-1",
      warehouse_name: "Central Fulfillment Hub",
      transaction_type: "DELIVERY",
      quantity_change: -300,
      reference_number: "DEL-2026-001",
      created_by_name: "Alex Rivera",
      created_at: "2026-09-25T11:20:00Z"
    }
  ]
};

function logLedger({ product_id, warehouse_id, transaction_type, quantity_change, reference_number, created_by_name }) {
  const product = store.products.find(p => p.id === product_id);
  const warehouse = store.warehouses.find(w => w.id === warehouse_id);
  const entry = {
    id: `ledg-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    product_id,
    product_name: product ? product.name : "Unknown Product",
    sku: product ? product.sku : "SKU-UNK",
    warehouse_id,
    warehouse_name: warehouse ? warehouse.name : "Unknown Warehouse",
    transaction_type,
    quantity_change,
    reference_number,
    created_by_name: created_by_name || "System User",
    created_at: new Date().toISOString()
  };
  store.stock_ledger.unshift(entry);
}

module.exports = { store, logLedger };
