import React, { useState, useEffect } from 'react';
import {
  Boxes, LayoutDashboard, Package, ArrowDownLeft, ArrowUpRight,
  Repeat, Scale, History, Plus, CheckCircle, AlertTriangle,
  Search, ShieldCheck, Sun, Moon, LogIn, LogOut, Warehouse, User, Key, Mail
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({ id: 'usr-1', email: 'admin@stocksense.io', full_name: 'Sarah Connor', role: 'admin' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // login | signup | otp

  // Data States
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);

  // Form Inputs
  const [productForm, setProductForm] = useState({ sku: '', name: '', category_name: 'Raw Metals', uom: 'units', reorder_level: 20, reorder_quantity: 100 });
  const [receiptForm, setReceiptForm] = useState({ supplier_name: '', warehouse_id: 'wh-1', product_id: 'prod-1', quantity_received: 50, unit_price: 25 });
  const [deliveryForm, setDeliveryForm] = useState({ customer_name: '', warehouse_id: 'wh-1', product_id: 'prod-1', quantity_ordered: 20 });
  const [transferForm, setTransferForm] = useState({ from_warehouse_id: 'wh-1', to_warehouse_id: 'wh-2', product_id: 'prod-1', quantity: 15 });
  const [adjustmentForm, setAdjustmentForm] = useState({ warehouse_id: 'wh-1', product_id: 'prod-1', physical_qty: 10, reason: 'Annual Physical Inventory Audit' });
  const [authForm, setAuthForm] = useState({ email: '', password: '', full_name: '', otp: '' });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const fetchData = async () => {
    try {
      const [dashRes, prodRes, recRes, delRes, trnRes, adjRes, ledgRes, whRes] = await Promise.all([
        fetch('/api/dashboard').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/receipts').then(r => r.json()),
        fetch('/api/deliveries').then(r => r.json()),
        fetch('/api/transfers').then(r => r.json()),
        fetch('/api/adjustments').then(r => r.json()),
        fetch('/api/ledger').then(r => r.json()),
        fetch('/api/warehouses').then(r => r.json())
      ]);
      setDashboardData(dashRes);
      setProducts(prodRes);
      setReceipts(recRes);
      setDeliveries(delRes);
      setTransfers(trnRes);
      setAdjustments(adjRes);
      setLedger(ledgRes);
      setWarehouses(whRes);
    } catch (err) {
      console.warn('API connection failed, loading offline fallback state', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      }).then(r => r.json());
      if (res.user) setUser(res.user);
    } else if (authMode === 'signup') {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      }).then(r => r.json());
      if (res.user) setUser(res.user);
    } else if (authMode === 'otp') {
      alert('Mock OTP verified successfully! Password reset token issued.');
    }
    setShowAuthModal(false);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productForm)
    });
    setShowProductModal(false);
    fetchData();
  };

  const handleCreateReceipt = async (e) => {
    e.preventDefault();
    await fetch('/api/receipts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supplier_name: receiptForm.supplier_name,
        warehouse_id: receiptForm.warehouse_id,
        items: [{ product_id: receiptForm.product_id, quantity_received: Number(receiptForm.quantity_received), unit_price: Number(receiptForm.unit_price) }]
      })
    });
    setShowReceiptModal(false);
    fetchData();
  };

  const handleValidateReceipt = async (id) => {
    await fetch(`/api/receipts/${id}/validate`, { method: 'POST' });
    fetchData();
  };

  const handleCreateDelivery = async (e) => {
    e.preventDefault();
    await fetch('/api/deliveries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: deliveryForm.customer_name,
        warehouse_id: deliveryForm.warehouse_id,
        items: [{ product_id: deliveryForm.product_id, quantity_ordered: Number(deliveryForm.quantity_ordered) }]
      })
    });
    setShowDeliveryModal(false);
    fetchData();
  };

  const handleValidateDelivery = async (id) => {
    await fetch(`/api/deliveries/${id}/validate`, { method: 'POST' });
    fetchData();
  };

  const handleCreateTransfer = async (e) => {
    e.preventDefault();
    await fetch('/api/transfers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_warehouse_id: transferForm.from_warehouse_id,
        to_warehouse_id: transferForm.to_warehouse_id,
        items: [{ product_id: transferForm.product_id, quantity: Number(transferForm.quantity) }]
      })
    });
    setShowTransferModal(false);
    fetchData();
  };

  const handleCreateAdjustment = async (e) => {
    e.preventDefault();
    await fetch('/api/adjustments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        warehouse_id: adjustmentForm.warehouse_id,
        reason: adjustmentForm.reason,
        items: [{ product_id: adjustmentForm.product_id, physical_qty: Number(adjustmentForm.physical_qty) }]
      })
    });
    setShowAdjustmentModal(false);
    fetchData();
  };

  // Filtered lists
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLedger = ledger.filter(l => selectedWarehouse === 'all' || l.warehouse_id === selectedWarehouse);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <header className="glass-nav" style={{ padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Boxes size={24} color="#0f172a" />
          </div>
          <div>
            <h1 className="brand-font" style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              StockSense
            </h1>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Enterprise Inventory Platform</span>
          </div>
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <Warehouse size={16} color="var(--accent-cyan)" />
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: '#1e293b' }}>All Warehouses</option>
              {warehouses.map(w => (
                <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>{w.name}</option>
              ))}
            </select>
          </div>

          <button onClick={toggleTheme} className="btn-secondary" title="Toggle Light/Dark Theme">
            {theme === 'dark' ? <Sun size={18} color="var(--accent-amber)" /> : <Moon size={18} color="var(--accent-purple)" />}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
              <User size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.full_name}</span>
              <span className="badge badge-info">{user.role}</span>
              <button onClick={() => setUser(null)} style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '2px' }} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="btn-primary">
              <LogIn size={16} /> Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Navigation Sidebar */}
        <aside style={{ width: '250px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products & SKUs', icon: Package },
            { id: 'receipts', label: 'Stock Receipts', icon: ArrowDownLeft },
            { id: 'deliveries', label: 'Delivery Orders', icon: ArrowUpRight },
            { id: 'transfers', label: 'Internal Transfers', icon: Repeat },
            { id: 'adjustments', label: 'Adjustments', icon: Scale },
            { id: 'ledger', label: 'Stock Ledger Log', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: active ? 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15))' : 'transparent',
                  color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  borderLeft: active ? '3px solid var(--accent-blue)' : '3px solid transparent'
                }}
              >
                <Icon size={18} color={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content View Area */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Inventory Operations Dashboard</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Real-time overview of multi-warehouse stock levels and audit logs</p>
                </div>
                <button onClick={fetchData} className="btn-secondary">
                  <Repeat size={16} /> Sync Live Data
                </button>
              </div>

              {/* KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Catalog SKUs</span>
                    <Package size={20} color="var(--accent-blue)" />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{dashboardData?.totalProducts || products.length}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Active Master Catalog</span>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Units in Stock</span>
                    <Boxes size={20} color="var(--accent-purple)" />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{dashboardData?.totalStockUnits?.toLocaleString() || 0}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Across {warehouses.length} Warehouses</span>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Low Stock Alerts</span>
                    <AlertTriangle size={20} color="var(--accent-rose)" />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{dashboardData?.lowStockCount || 0}</div>
                  <span className="badge badge-danger">Reorder Required</span>
                </div>

                <div className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pending Operations</span>
                    <ArrowDownLeft size={20} color="var(--accent-amber)" />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    {(dashboardData?.pendingReceipts || 0) + (dashboardData?.pendingDeliveries || 0)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receipts & Deliveries Drafts</span>
                </div>
              </div>

              {/* Recent Audit Ledger Stream */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--accent-emerald)" /> Immutable Stock Ledger Stream
                </h3>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Transaction Type</th>
                      <th>SKU & Product</th>
                      <th>Warehouse</th>
                      <th>Quantity Change</th>
                      <th>Reference ID</th>
                      <th>Logged By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dashboardData?.recentLedger || ledger).slice(0, 7).map(entry => (
                      <tr key={entry.id}>
                        <td>
                          <span className={`badge ${entry.quantity_change > 0 ? 'badge-success' : entry.transaction_type === 'ADJUSTMENT' ? 'badge-warning' : 'badge-danger'}`}>
                            {entry.transaction_type}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{entry.product_name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.sku}</div>
                        </td>
                        <td>{entry.warehouse_name}</td>
                        <td style={{ fontWeight: 700, color: entry.quantity_change > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                          {entry.quantity_change > 0 ? `+${entry.quantity_change}` : entry.quantity_change}
                        </td>
                        <td><code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{entry.reference_number}</code></td>
                        <td>{entry.created_by_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Product Master Catalog</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manage SKUs, categories, reorder points, and location breakdown</p>
                </div>
                <button onClick={() => setShowProductModal(true)} className="btn-primary">
                  <Plus size={16} /> Add Product SKU
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                  <input
                    className="input-field"
                    style={{ paddingLeft: '42px' }}
                    placeholder="Search SKU or Product name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Products Table */}
              <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>SKU Code</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>UOM</th>
                      <th>Stock Breakdown</th>
                      <th>Reorder Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(prod => {
                      const totalStock = Object.values(prod.stock || {}).reduce((a, b) => a + b, 0);
                      const isLow = totalStock <= prod.reorder_level;
                      return (
                        <tr key={prod.id}>
                          <td><code style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{prod.sku}</code></td>
                          <td style={{ fontWeight: 600 }}>{prod.name}</td>
                          <td><span className="badge badge-info">{prod.category_name}</span></td>
                          <td>{prod.uom}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {Object.entries(prod.stock || {}).map(([wh, qty]) => (
                                <span key={wh} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '6px' }}>
                                  <strong>{wh.toUpperCase()}:</strong> {qty}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>{prod.reorder_level} units</td>
                          <td>
                            <span className={`badge ${isLow ? 'badge-danger' : 'badge-success'}`}>
                              {isLow ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Receipts Tab */}
          {activeTab === 'receipts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Inbound Stock Receipts</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive vendor shipments and increment warehouse inventory</p>
                </div>
                <button onClick={() => setShowReceiptModal(true)} className="btn-primary">
                  <Plus size={16} /> Create Receipt
                </button>
              </div>

              <div className="glass-panel">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Receipt #</th>
                      <th>Supplier Name</th>
                      <th>Destination Warehouse</th>
                      <th>Status</th>
                      <th>Items Received</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map(rec => (
                      <tr key={rec.id}>
                        <td><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{rec.receipt_number}</code></td>
                        <td style={{ fontWeight: 600 }}>{rec.supplier_name}</td>
                        <td>{rec.warehouse_name}</td>
                        <td>
                          <span className={`badge ${rec.status === 'processed' ? 'badge-success' : 'badge-warning'}`}>
                            {rec.status}
                          </span>
                        </td>
                        <td>
                          {rec.items.map((it, idx) => (
                            <div key={idx} style={{ fontSize: '0.8rem' }}>
                              {it.product_name} ({it.quantity_received} units @ ${it.unit_price})
                            </div>
                          ))}
                        </td>
                        <td>
                          {rec.status === 'draft' ? (
                            <button onClick={() => handleValidateReceipt(rec.id)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                              <CheckCircle size={14} /> Validate & Process
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Deliveries Tab */}
          {activeTab === 'deliveries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Outgoing Delivery Orders</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pick, pack, and fulfill customer shipments</p>
                </div>
                <button onClick={() => setShowDeliveryModal(true)} className="btn-primary">
                  <Plus size={16} /> Create Delivery Order
                </button>
              </div>

              <div className="glass-panel">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Delivery #</th>
                      <th>Customer Name</th>
                      <th>Fulfillment Warehouse</th>
                      <th>Status</th>
                      <th>Line Items</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map(del => (
                      <tr key={del.id}>
                        <td><code style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{del.delivery_number}</code></td>
                        <td style={{ fontWeight: 600 }}>{del.customer_name}</td>
                        <td>{del.warehouse_name}</td>
                        <td>
                          <span className={`badge ${del.status === 'delivered' ? 'badge-success' : 'badge-info'}`}>
                            {del.status}
                          </span>
                        </td>
                        <td>
                          {del.items.map((it, idx) => (
                            <div key={idx} style={{ fontSize: '0.8rem' }}>
                              {it.product_name} (Ordered: {it.quantity_ordered})
                            </div>
                          ))}
                        </td>
                        <td>
                          {del.status !== 'delivered' ? (
                            <button onClick={() => handleValidateDelivery(del.id)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                              <CheckCircle size={14} /> Fulfill & Deduct Stock
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Delivered</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transfers Tab */}
          {activeTab === 'transfers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Internal Warehouse Transfers</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Rebalance stock across locations with strict inventory conservation</p>
                </div>
                <button onClick={() => setShowTransferModal(true)} className="btn-primary">
                  <Plus size={16} /> New Transfer
                </button>
              </div>

              <div className="glass-panel">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Transfer #</th>
                      <th>From Location</th>
                      <th>To Location</th>
                      <th>Transferred Items</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.map(trn => (
                      <tr key={trn.id}>
                        <td><code>{trn.transfer_number}</code></td>
                        <td style={{ color: 'var(--accent-rose)' }}>{trn.from_warehouse_name}</td>
                        <td style={{ color: 'var(--accent-emerald)' }}>{trn.to_warehouse_name}</td>
                        <td>
                          {trn.items.map((it, idx) => (
                            <div key={idx}>{it.product_name} ({it.quantity} units)</div>
                          ))}
                        </td>
                        <td><span className="badge badge-success">{trn.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Adjustments Tab */}
          {activeTab === 'adjustments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Physical Inventory Adjustments</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Reconcile physical counts and log stock variance</p>
                </div>
                <button onClick={() => setShowAdjustmentModal(true)} className="btn-primary">
                  <Plus size={16} /> New Adjustment Audit
                </button>
              </div>

              <div className="glass-panel">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Adjustment #</th>
                      <th>Warehouse</th>
                      <th>Reason</th>
                      <th>Variance Log</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustments.map(adj => (
                      <tr key={adj.id}>
                        <td><code>{adj.adjustment_number}</code></td>
                        <td>{adj.warehouse_name}</td>
                        <td>{adj.reason}</td>
                        <td>
                          {adj.items.map((it, idx) => (
                            <div key={idx}>
                              {it.product_name}: Recorded ({it.recorded_qty}) → Physical ({it.physical_qty}) Diff: <strong style={{ color: it.diff < 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>{it.diff}</strong>
                            </div>
                          ))}
                        </td>
                        <td><span className="badge badge-warning">{adj.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ledger Tab */}
          {activeTab === 'ledger' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Immutable Stock Ledger</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Complete compliance audit trail for every single stock mutation</p>
              </div>

              <div className="glass-panel">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Transaction Type</th>
                      <th>Product</th>
                      <th>Warehouse</th>
                      <th>Change</th>
                      <th>Reference ID</th>
                      <th>Performed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLedger.map(entry => (
                      <tr key={entry.id}>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(entry.created_at).toLocaleString()}</td>
                        <td>
                          <span className={`badge ${entry.quantity_change > 0 ? 'badge-success' : 'badge-danger'}`}>
                            {entry.transaction_type}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{entry.product_name}</td>
                        <td>{entry.warehouse_name}</td>
                        <td style={{ fontWeight: 700, color: entry.quantity_change > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                          {entry.quantity_change > 0 ? `+${entry.quantity_change}` : entry.quantity_change}
                        </td>
                        <td><code>{entry.reference_number}</code></td>
                        <td>{entry.created_by_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* Create Product Modal */}
      {showProductModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px' }}>
            <h3 style={{ marginBottom: '16px' }}>Add Product SKU</h3>
            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input className="input-field" placeholder="SKU Code (e.g., ELE-RES-501)" value={productForm.sku} onChange={e => setProductForm({ ...productForm, sku: e.target.value })} required />
              <input className="input-field" placeholder="Product Name" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
              <input className="input-field" placeholder="Category (e.g. Raw Metals, Electronics)" value={productForm.category_name} onChange={e => setProductForm({ ...productForm, category_name: e.target.value })} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input className="input-field" placeholder="UOM (meters, units)" value={productForm.uom} onChange={e => setProductForm({ ...productForm, uom: e.target.value })} />
                <input className="input-field" type="number" placeholder="Reorder Level" value={productForm.reorder_level} onChange={e => setProductForm({ ...productForm, reorder_level: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowProductModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Receipt Modal */}
      {showReceiptModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px' }}>
            <h3 style={{ marginBottom: '16px' }}>Create Vendor Stock Receipt</h3>
            <form onSubmit={handleCreateReceipt} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input className="input-field" placeholder="Supplier Name" value={receiptForm.supplier_name} onChange={e => setReceiptForm({ ...receiptForm, supplier_name: e.target.value })} required />
              <select className="input-field" value={receiptForm.warehouse_id} onChange={e => setReceiptForm({ ...receiptForm, warehouse_id: e.target.value })}>
                {warehouses.map(w => <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>{w.name}</option>)}
              </select>
              <select className="input-field" value={receiptForm.product_id} onChange={e => setReceiptForm({ ...receiptForm, product_id: e.target.value })}>
                {products.map(p => <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>{p.name} ({p.sku})</option>)}
              </select>
              <input className="input-field" type="number" placeholder="Quantity Received" value={receiptForm.quantity_received} onChange={e => setReceiptForm({ ...receiptForm, quantity_received: e.target.value })} required />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowReceiptModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Draft Receipt</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Delivery Modal */}
      {showDeliveryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px' }}>
            <h3 style={{ marginBottom: '16px' }}>Create Customer Delivery Order</h3>
            <form onSubmit={handleCreateDelivery} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input className="input-field" placeholder="Customer Name" value={deliveryForm.customer_name} onChange={e => setDeliveryForm({ ...deliveryForm, customer_name: e.target.value })} required />
              <select className="input-field" value={deliveryForm.warehouse_id} onChange={e => setDeliveryForm({ ...deliveryForm, warehouse_id: e.target.value })}>
                {warehouses.map(w => <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>{w.name}</option>)}
              </select>
              <select className="input-field" value={deliveryForm.product_id} onChange={e => setDeliveryForm({ ...deliveryForm, product_id: e.target.value })}>
                {products.map(p => <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>{p.name} ({p.sku})</option>)}
              </select>
              <input className="input-field" type="number" placeholder="Quantity Ordered" value={deliveryForm.quantity_ordered} onChange={e => setDeliveryForm({ ...deliveryForm, quantity_ordered: e.target.value })} required />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowDeliveryModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Delivery Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Transfer Modal */}
      {showTransferModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px' }}>
            <h3 style={{ marginBottom: '16px' }}>Internal Warehouse Transfer</h3>
            <form onSubmit={handleCreateTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <select className="input-field" value={transferForm.from_warehouse_id} onChange={e => setTransferForm({ ...transferForm, from_warehouse_id: e.target.value })}>
                {warehouses.map(w => <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>From: {w.name}</option>)}
              </select>
              <select className="input-field" value={transferForm.to_warehouse_id} onChange={e => setTransferForm({ ...transferForm, to_warehouse_id: e.target.value })}>
                {warehouses.map(w => <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>To: {w.name}</option>)}
              </select>
              <select className="input-field" value={transferForm.product_id} onChange={e => setTransferForm({ ...transferForm, product_id: e.target.value })}>
                {products.map(p => <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>{p.name} ({p.sku})</option>)}
              </select>
              <input className="input-field" type="number" placeholder="Quantity to Move" value={transferForm.quantity} onChange={e => setTransferForm({ ...transferForm, quantity: e.target.value })} required />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowTransferModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Execute Stock Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Adjustment Modal */}
      {showAdjustmentModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '460px', padding: '28px' }}>
            <h3 style={{ marginBottom: '16px' }}>Physical Inventory Reconciliation</h3>
            <form onSubmit={handleCreateAdjustment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <select className="input-field" value={adjustmentForm.warehouse_id} onChange={e => setAdjustmentForm({ ...adjustmentForm, warehouse_id: e.target.value })}>
                {warehouses.map(w => <option key={w.id} value={w.id} style={{ background: '#1e293b' }}>{w.name}</option>)}
              </select>
              <select className="input-field" value={adjustmentForm.product_id} onChange={e => setAdjustmentForm({ ...adjustmentForm, product_id: e.target.value })}>
                {products.map(p => <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>{p.name} ({p.sku})</option>)}
              </select>
              <input className="input-field" type="number" placeholder="Actual Physical Counted Qty" value={adjustmentForm.physical_qty} onChange={e => setAdjustmentForm({ ...adjustmentForm, physical_qty: e.target.value })} required />
              <input className="input-field" placeholder="Audit Reason (e.g. Damage, Theft, Error)" value={adjustmentForm.reason} onChange={e => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })} required />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAdjustmentModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Apply Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '400px', padding: '32px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>
              {authMode === 'login' ? 'Sign In to StockSense' : authMode === 'signup' ? 'Create Staff Account' : 'Password Reset OTP'}
            </h3>
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              {authMode === 'signup' && (
                <input className="input-field" placeholder="Full Name" value={authForm.full_name} onChange={e => setAuthForm({ ...authForm, full_name: e.target.value })} required />
              )}
              <input className="input-field" type="email" placeholder="Email address" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} required />
              {authMode !== 'otp' && (
                <input className="input-field" type="password" placeholder="Password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} required />
              )}
              {authMode === 'otp' && (
                <input className="input-field" placeholder="Enter 6-digit OTP (Try 123456)" value={authForm.otp} onChange={e => setAuthForm({ ...authForm, otp: e.target.value })} required />
              )}
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '8px' }}>
                {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Register Account' : 'Verify OTP'}
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                {authMode === 'login' ? (
                  <>
                    <span onClick={() => setAuthMode('signup')} style={{ cursor: 'pointer', color: 'var(--accent-blue)' }}>Create account</span>
                    <span onClick={() => setAuthMode('otp')} style={{ cursor: 'pointer', color: 'var(--accent-purple)' }}>Forgot OTP?</span>
                  </>
                ) : (
                  <span onClick={() => setAuthMode('login')} style={{ cursor: 'pointer', color: 'var(--accent-blue)' }}>Back to Sign In</span>
                )}
              </div>
              <button type="button" onClick={() => setShowAuthModal(false)} className="btn-secondary" style={{ marginTop: '6px', justifyContent: 'center' }}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
