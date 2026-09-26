import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ArrowDownToLine, Truck, ArrowLeftRight,
  ClipboardMinus, History, Warehouse as WarehouseIcon, Settings,
  LogOut, Bell, Search, ChevronDown
} from "lucide-react";

const operationLinks = [
  { to: "/receipts", label: "Receipts", icon: ArrowDownToLine },
  { to: "/deliveries", label: "Delivery Orders", icon: Truck },
  { to: "/transfers", label: "Internal Transfers", icon: ArrowLeftRight },
  { to: "/adjustments", label: "Inventory Adjustments", icon: ClipboardMinus },
  { to: "/move-history", label: "Move History", icon: History },
];

function SideLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={18} strokeWidth={1.9} />
      {label}
    </NavLink>
  );
}

function getCurrentUser() {
  try {
    const u = localStorage.getItem("user");
    if (u) return JSON.parse(u);
  } catch (e) {}
  return { full_name: "Priyanshu Raj", email: "admin@stocksense.io", role: "admin" };
}

function formatRole(role) {
  if (role === "admin") return "Admin User";
  if (role === "inventory_manager") return "Inventory Manager";
  if (role === "warehouse_staff") return "Warehouse Staff";
  return role || "Inventory Specialist";
}

function getInitials(name) {
  if (!name) return "SC";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function Layout() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const initials = getInitials(currentUser.full_name);
  const roleTitle = formatRole(currentUser.role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#122033] p-4 text-white lg:flex">
        <div className="flex items-center gap-3 px-2 py-3 mb-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600">
            <Package size={21} />
          </div>
          <div>
            <div className="font-bold tracking-tight">StockSense</div>
            <div className="text-[10px] text-slate-400">INVENTORY MANAGEMENT</div>
          </div>
        </div>

        <nav className="space-y-1">
          <SideLink to="/dashboard" label="Dashboard" icon={LayoutDashboard} />
          <SideLink to="/products" label="Products" icon={Package} />
          <div className="pt-4 pb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Operations</div>
          {operationLinks.map((x) => <SideLink key={x.to} {...x} />)}
          <SideLink to="/warehouse" label="Warehouse" icon={WarehouseIcon} />
          <SideLink to="/settings" label="Settings" icon={Settings} />
        </nav>

        <div className="mt-auto">
          <button onClick={() => navigate("/profile")} className="mb-3 flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-left hover:bg-slate-800 transition">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">{initials}</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{currentUser.full_name}</div>
              <div className="truncate text-xs text-slate-400">{roleTitle}</div>
            </div>
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white"><Package size={20}/></div>
            <span className="font-bold">StockSense</span>
          </div>
          <div className="relative hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400" placeholder="Search products, SKU, documents..." />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => alert('No new notifications.')} className="relative rounded-xl p-2 hover:bg-slate-100"><Bell size={19} className="text-slate-600"/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"/></button>
            <button onClick={() => navigate("/profile")} className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{initials}</div>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">{currentUser.full_name}</span>
              <ChevronDown size={15} className="text-slate-400" />
            </button>
          </div>
        </header>

        <div className="p-4 md:p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
