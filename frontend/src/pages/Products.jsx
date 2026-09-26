import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { PageHeader, Card, StatusBadge } from "../components/UI";

export default function Products() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("/api/v1/products", {
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
        console.error("Products fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [navigate]);

  const filteredProducts = data.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Products" subtitle="Manage your products, categories and stock information." action actionText="＋ Add Product" to="/products/new"/>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={17}/>
            <input 
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm" 
              placeholder="Search by name, SKU or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="rounded-xl border border-slate-200 px-3 text-sm">
            <option>All Categories</option>
          </select>
          <select className="rounded-xl border border-slate-200 px-3 text-sm">
            <option>All Locations</option>
          </select>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  {["Product","SKU / Code","Category","Unit","Total Stock","Status","Actions"].map(h=>
                    <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(p => {
                  const totalStock = p.stock ? Object.values(p.stock).reduce((a, b) => a + b, 0) : 0;
                  const status = totalStock === 0 ? "out_of_stock" : (totalStock <= p.reorder_level ? "low_stock" : "active");
                  
                  return (
                    <tr key={p.id} className="bg-white p-6 transition-all duration-300 hover:bg-slate-50 overflow-hidden">
                      <td className="px-5 py-4"><Link to={`/products/${p.id}`} className="font-semibold hover:text-blue-600">{p.name}</Link></td>
                      <td className="px-5 text-slate-500">{p.sku}</td>
                      <td className="px-5 text-slate-500">{p.category_name}</td>
                      <td className="px-5">{p.uom}</td>
                      <td className={`px-5 font-semibold ${totalStock === 0 ? "text-red-600" : ""}`}>{totalStock}</td>
                      <td className="px-5"><StatusBadge status={status}/></td>
                      <td className="px-5">
                        <div className="flex gap-1">
                          <Link to={`/products/${p.id}`} className="rounded-lg p-2 hover:bg-blue-50 hover:text-blue-600"><Eye size={16}/></Link>
                          <button className="rounded-lg p-2 hover:bg-slate-100"><Pencil size={16}/></button>
                          <button className="rounded-lg p-2 hover:bg-red-50 text-red-500"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
