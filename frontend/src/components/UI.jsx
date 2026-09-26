import { Link } from "react-router-dom";

export function PageHeader({ title, subtitle, action, actionText = "Add New", to }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && <Link to={to} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">{actionText}</Link>}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    "In Stock": "bg-emerald-50 text-emerald-700",
    "Low Stock": "bg-amber-50 text-amber-700",
    "Out of Stock": "bg-red-50 text-red-700",
    Done: "bg-emerald-50 text-emerald-700",
    Waiting: "bg-amber-50 text-amber-700",
    Ready: "bg-violet-50 text-violet-700",
    Draft: "bg-slate-100 text-slate-600",
    Canceled: "bg-red-50 text-red-700",
    Active: "bg-emerald-50 text-emerald-700",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

export function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>}
      <input {...props} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
    </label>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>}
      <select {...props} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">{children}</select>
    </label>
  );
}

export function FormShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
