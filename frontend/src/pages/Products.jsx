import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Search, Plus } from "lucide-react";
import { PageHeader, Card, StatusBadge } from "../components/UI";
import { products } from "../data";

export default function Products() {
  return <div>
    <PageHeader title="Products" subtitle="Manage your products, categories and stock information." action actionText="＋ Add Product" to="/products/new"/>
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 text-slate-400" size={17}/><input className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" placeholder="Search by name, SKU or category..."/></div><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All Categories</option></select><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All Locations</option></select></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{["Product","SKU / Code","Category","Unit","Total Stock","Status","Actions"].map(h=><th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{products.map(p=><tr key={p.id} className="hover:bg-slate-50"><td className="px-5 py-4"><Link to={`/products/${p.id}`} className="font-semibold hover:text-blue-600">{p.name}</Link></td><td className="px-5 text-slate-500">{p.id}</td><td className="px-5 text-slate-500">{p.category}</td><td className="px-5">{p.unit}</td><td className={`px-5 font-semibold ${p.stock===0?"text-red-600":""}`}>{p.stock}</td><td className="px-5"><StatusBadge status={p.status}/></td><td className="px-5"><div className="flex gap-1"><Link to={`/products/${p.id}`} className="rounded-lg p-2 hover:bg-blue-50 hover:text-blue-600"><Eye size={16}/></Link><button className="rounded-lg p-2 hover:bg-slate-100"><Pencil size={16}/></button><button className="rounded-lg p-2 hover:bg-red-50 text-red-500"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
    </Card>
  </div>;
}
