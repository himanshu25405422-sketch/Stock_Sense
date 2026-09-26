import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Input } from "../components/UI";

export default function Signup() {
  const navigate = useNavigate();
  return <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-100 via-white to-blue-50 p-5">
    <div className="w-full max-w-md">
      <div className="mb-7 flex items-center justify-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white"><Package size={23}/></div><span className="text-2xl font-bold">StockSense</span></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
        <h1 className="text-2xl font-bold">Create account</h1><p className="mt-1 mb-6 text-sm text-slate-500">Set up your inventory workspace.</p>
        <form onSubmit={(e)=>{e.preventDefault();navigate("/dashboard")}} className="space-y-4">
          <Input label="Full Name" placeholder="Rahul Kumar"/>
          <Input label="Email" type="email" placeholder="you@company.com"/>
          <Input label="Password" type="password" placeholder="Create a password"/>
          <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">Create Account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-blue-600">Login</Link></p>
      </div>
    </div>
  </div>;
}
