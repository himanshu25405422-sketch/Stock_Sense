import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Input } from "../components/UI";

export default function ForgotPassword() {
  return <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-100 via-white to-blue-50 p-5">
    <div className="w-full max-w-md">
      <div className="mb-7 flex items-center justify-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white"><Package size={23}/></div><span className="text-2xl font-bold">StockSense</span></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
        <h1 className="text-2xl font-bold">Reset password</h1><p className="mt-1 mb-6 text-sm text-slate-500">Enter your email and we'll send an OTP.</p>
        <form onSubmit={(e)=>e.preventDefault()} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@company.com"/>
          <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">Send OTP</button>
        </form>
        <Link to="/login" className="mt-6 block text-center text-sm font-semibold text-blue-600">Back to login</Link>
      </div>
    </div>
  </div>;
}
