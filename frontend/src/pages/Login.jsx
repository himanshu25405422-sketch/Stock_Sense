import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { label: "Admin User", email: "admin@stocksense.io", password: "admin123", role: "admin" },
    { label: "Inventory Manager", email: "manager@stocksense.io", password: "manager123", role: "inventory_manager" },
    { label: "Warehouse Staff", email: "staff@stocksense.io", password: "staff123", role: "warehouse_staff" }
  ];

  const handleFillDemo = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const responseText = await res.text();
      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error("Unable to connect to backend server. Please verify backend is running on port 5000.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password. Please use valid demo credentials.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please use valid demo credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Sign in to your account" subtitle="Enter your credentials to continue.">
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold color-rose-700 text-rose-700">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@stocksense.io"
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* DEMO CREDENTIALS BOX */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">Demo Credentials</h4>
        <div className="space-y-2">
          {demoAccounts.map((acc, idx) => (
            <div
              key={idx}
              onClick={() => handleFillDemo(acc)}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/60 bg-white p-2.5 transition hover:border-blue-400 hover:shadow-sm"
            >
              <div>
                <span className="block text-xs font-bold text-slate-800">{acc.label}</span>
                <span className="block text-[11px] text-slate-500 font-mono">{acc.email} / {acc.password}</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                Autofill →
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-100 via-white to-blue-50 p-5">
      <div className="w-full max-w-md">
        <div className="mb-7 flex items-center justify-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <Package size={23} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">StockSense</span>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
