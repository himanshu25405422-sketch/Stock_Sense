import { useParams } from "react-router-dom";
import { Card, StatusBadge } from "../components/UI";
import { products } from "../data";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  return <div><div className="mb-6"><h1 className="text-2xl font-bold">{product.name}</h1><p className="mt-1 text-sm text-slate-500">Product details and stock by location.</p></div>
    <div className="grid gap-5 lg:grid-cols-3"><Card className="p-6 lg:col-span-2"><div className="grid gap-6 sm:grid-cols-2"><Info label="SKU / Code" value={product.id}/><Info label="Category" value={product.category}/><Info label="Unit" value={product.unit}/><Info label="Reorder Level" value={`${product.reorder} ${product.unit}`}/></div></Card><Card className="p-6"><div className="text-sm text-slate-500">Current Stock</div><div className="mt-2 text-3xl font-bold">{product.stock}</div><div className="mt-2"><StatusBadge status={product.status}/></div></Card></div>
    <Card className="mt-5 overflow-hidden"><div className="p-5"><h2 className="font-bold">Stock by Location</h2></div><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3">Location</th><th className="px-5 py-3">Quantity</th><th className="px-5 py-3">Status</th></tr></thead><tbody><tr><td className="px-5 py-4">Main Warehouse</td><td className="px-5 py-4 font-semibold">{Math.round(product.stock*.7)} {product.unit}</td><td className="px-5 py-4"><StatusBadge status={product.status}/></td></tr><tr><td className="px-5 py-4">Production Floor</td><td className="px-5 py-4 font-semibold">{Math.round(product.stock*.3)} {product.unit}</td><td className="px-5 py-4"><StatusBadge status="Active"/></td></tr></tbody></table></Card>
  </div>;
}
function Info({label,value}) { return <div><div className="text-xs uppercase tracking-wide text-slate-400">{label}</div><div className="mt-1 font-semibold">{value}</div></div>; }
