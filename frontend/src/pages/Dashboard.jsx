import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, AlertTriangle, Ban, ArrowDownToLine, Truck, ArrowLeftRight, TrendingUp, Warehouse as WarehouseIcon } from "lucide-react";
import { Card, StatusBadge } from "../components/UI";

function getCurrentUser() {
  try {
    const u = localStorage.getItem("user");
    if (u) return JSON.parse(u);
  } catch (e) {}
  return { full_name: "Priyanshu Raj" };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const firstName = currentUser.full_name ? currentUser.full_name.trim().split(" ")[0] : "User";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("/api/v1/dashboard", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return <div className="flex h-64 items-center justify-center">Loading dashboard data...</div>;
  }

  // Fallback if data failed
  const d = data || {
    totalProducts: 0,
    totalStockUnits: 0,
    lowStockCount: 0,
    pendingReceipts: 0,
    pendingDeliveries: 0,
    transfersScheduled: 0,
    recentLedger: []
  };

  const stats = [
    ["Total Products", d.totalProducts.toString(), "", Package, "bg-blue-50 text-blue-600"],
    ["Total Stock Units", d.totalStockUnits.toString(), "", Package, "bg-emerald-50 text-emerald-600"],
    ["Low Stock Items", d.lowStockCount.toString(), "", AlertTriangle, "bg-red-50 text-red-600"],
    ["Pending Receipts", d.pendingReceipts.toString(), "", ArrowDownToLine, "bg-emerald-50 text-emerald-600"],
    ["Pending Deliveries", d.pendingDeliveries.toString(), "", Truck, "bg-violet-50 text-violet-600"],
    ["Active Warehouses", (d.totalWarehouses || 0).toString(), "", WarehouseIcon, "bg-cyan-50 text-cyan-600"],
  ];
  
  // Need to import WarehouseIcon if used.
  // Wait, let's just use Package for warehouses or ArrowLeftRight for transfers. Let's use ArrowLeftRight for transfers.

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back, {firstName}. Here's your inventory overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, change, Icon, color], i) => (
          <Card
            key={i}
            className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            <div className="flex items-start justify-between">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${color}`}>
                <Icon size={21} />
              </div>
              {change && (
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                  {change}
                </span>
              )}
            </div>
            <div className="mt-5 text-2xl font-bold">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Stock Summary</h2>
              <p className="text-xs text-slate-500">Current inventory volume</p>
            </div>
            <TrendingUp size={20} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-8">
            <div className="relative grid h-44 w-44 shrink-0 place-items-center rounded-full bg-[conic-gradient(#2563eb_0_35%,#10b981_35%_60%,#f59e0b_60%_80%,#8b5cf6_80%_92%,#e2e8f0_92%_100%)]">
              <div className="grid h-28 w-28 place-items-center rounded-full bg-white">
                <div className="text-center">
                  <b className="text-xl">{d.totalStockUnits}</b>
                  <div className="text-[10px] text-slate-500">UNITS</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="text-slate-600">Total Products: {d.totalProducts}</div>
              <div className="text-slate-600">Warehouses: {d.totalWarehouses}</div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105">
          <div className="flex items-center justify-between p-5">
            <div>
              <h2 className="font-bold">Recent Operations</h2>
              <p className="text-xs text-slate-500">Latest stock movements</p>
            </div>
            <Link to="/move-history" className="text-sm font-semibold text-blue-600">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {d.recentLedger?.length > 0 ? d.recentLedger.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                <div className="w-20 font-semibold text-blue-600 truncate" title={o.reference_number || o.id}>{o.reference_number || o.id.substring(0,8)}</div>
                <div className="w-24 text-slate-500">{o.transaction_type}</div>
                <div className="flex-1 truncate">{o.product_name}</div>
                <div className="font-semibold">{o.quantity_change > 0 ? `+${o.quantity_change}` : o.quantity_change}</div>
              </div>
            )) : (
              <div className="p-5 text-center text-slate-500 text-sm">No recent operations.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
