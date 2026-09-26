export const products = [
  { id: "STL-001", name: "Steel Rod", category: "Raw Material", unit: "KG", stock: 850, reorder: 200, status: "In Stock" },
  { id: "CHR-001", name: "Office Chair", category: "Finished Goods", unit: "PCS", stock: 40, reorder: 50, status: "Low Stock" },
  { id: "TBL-001", name: "Table", category: "Finished Goods", unit: "PCS", stock: 0, reorder: 20, status: "Out of Stock" },
  { id: "WDP-001", name: "Wooden Panel", category: "Raw Material", unit: "PCS", stock: 120, reorder: 40, status: "In Stock" },
  { id: "PLS-001", name: "Plastic Sheet", category: "Raw Material", unit: "PCS", stock: 560, reorder: 100, status: "In Stock" },
  { id: "SCR-001", name: "Screw Set", category: "Accessories", unit: "PCS", stock: 300, reorder: 80, status: "In Stock" },
  { id: "LTP-001", name: "Laptop", category: "Electronics", unit: "PCS", stock: 15, reorder: 20, status: "Low Stock" },
  { id: "MON-001", name: "Monitor", category: "Electronics", unit: "PCS", stock: 8, reorder: 15, status: "Low Stock" },
];

export const operations = [
  { id: "REC-001", type: "Receipt", product: "Steel Rod", qty: "+100 KG", status: "Done", date: "Today, 10:30 AM" },
  { id: "DEL-023", type: "Delivery", product: "Office Chair", qty: "-10 PCS", status: "Waiting", date: "Today, 09:20 AM" },
  { id: "TRF-011", type: "Transfer", product: "Steel Rod", qty: "20 KG", status: "Done", date: "Today, 08:15 AM" },
  { id: "ADJ-004", type: "Adjustment", product: "Wooden Panel", qty: "-3 PCS", status: "Done", date: "Yesterday, 05:10 PM" },
  { id: "REC-018", type: "Receipt", product: "Plastic Sheet", qty: "+200 PCS", status: "Ready", date: "Yesterday, 02:45 PM" },
];
