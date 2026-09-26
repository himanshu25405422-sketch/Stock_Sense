import { Link, useNavigate } from "react-router-dom";
import { Package, LockKeyhole } from "lucide-react";
import { Input } from "../components/UI";

export default function Login() {
  const navigate = useNavigate();
  return (
    <AuthShell title="Welcome back" subtitle="Login to manage your inventory.">
      <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-blue-600">Forgot password?</Link></div>
        <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">Login</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Don't have an account? <Link to="/signup" className="font-semibold text-blue-600">Create account</Link></p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-100 via-white to-blue-50 p-5">
    <div className="w-full max-w-md">
      <div className="mb-7 flex items-center justify-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white"><Package size={23}/></div><span className="text-2xl font-bold">StockSense</span></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50">
        <div className="mb-6"><h1 className="text-2xl font-bold">{title}</h1><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{children}
      </div>
    </div>
  </div>;
}
