import { Link } from "react-router-dom";
import { Package, AlertTriangle, Ban, ArrowDownToLine, Truck, ArrowLeftRight, TrendingUp } from "lucide-react";
import { Card, StatusBadge } from "../components/UI";
import { operations } from "../data";

const stats = [
  ["Total Products in Stock", "1,250", "+12%", Package, "bg-blue-50 text-blue-600"],
  ["Low Stock Items", "35", "+5%", AlertTriangle, "bg-red-50 text-red-600"],
  ["Out of Stock Items", "8", "+2%", Ban, "bg-amber-50 text-amber-600"],
  ["Pending Receipts", "12", "", ArrowDownToLine, "bg-emerald-50 text-emerald-600"],
  ["Pending Deliveries", "18", "", Truck, "bg-violet-50 text-violet-600"],
  ["Transfers Scheduled", "7", "", ArrowLeftRight, "bg-cyan-50 text-cyan-600"],
];

function getCurrentUser() {
  try {
    const u = localStorage.getItem("user");
    if (u) return JSON.parse(u);
  } catch (e) {}
  return { full_name: "Sarah Connor" };
}

export default function Dashboard() {
  const currentUser = getCurrentUser();
  const firstName = currentUser.full_name ? currentUser.full_name.trim().split(" ")[0] : "User";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back, {firstName}. Here's your inventory overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, change, Icon, color]) => (
          <Card
            key={label}
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
              <h2 className="font-bold">Stock by Category</h2>
              <p className="text-xs text-slate-500">Current inventory distribution</p>
            </div>
            <TrendingUp size={20} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-8">
            <div className="relative grid h-44 w-44 shrink-0 place-items-center rounded-full bg-[conic-gradient(#2563eb_0_35%,#10b981_35%_60%,#f59e0b_60%_80%,#8b5cf6_80%_92%,#e2e8f0_92%_100%)]">
              <div className="grid h-28 w-28 place-items-center rounded-full bg-white">
                <div className="text-center">
                  <b className="text-xl">1,250</b>
                  <div className="text-[10px] text-slate-500">UNITS</div>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {["Raw Material 35%", "Finished Goods 25%", "Furniture 20%", "Electronics 12%", "Others 8%"].map((x) => (
                <div key={x} className="text-slate-600">
                  {x}
                </div>
              ))}
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
            {operations.map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                <div className="w-20 font-semibold text-blue-600">{o.id}</div>
                <div className="w-24 text-slate-500">{o.type}</div>
                <div className="flex-1">{o.product}</div>
                <div className="font-semibold">{o.qty}</div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
