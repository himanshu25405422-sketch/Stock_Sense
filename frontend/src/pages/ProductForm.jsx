import { useNavigate } from "react-router-dom";
import { FormShell, Card, Input, Select } from "../components/UI";

export default function ProductForm() {
  const navigate = useNavigate();
  return <FormShell title="Create Product" subtitle="Add a new item to your inventory catalog.">
    <Card className="p-6"><div className="grid gap-5 md:grid-cols-2">
      <Input label="Product Name *" placeholder="Steel Rod"/>
      <Input label="SKU / Code *" placeholder="STL-001"/>
      <Select label="Category"><option>Raw Material</option><option>Finished Goods</option><option>Furniture</option><option>Electronics</option></Select>
      <Select label="Unit of Measure"><option>PCS</option><option>KG</option><option>LITRE</option><option>BOX</option></Select>
      <Input label="Initial Stock" type="number" placeholder="0"/>
      <Input label="Reorder Level" type="number" placeholder="20"/>
    </div><div className="mt-6 flex justify-end gap-3 border-t pt-5"><button onClick={()=>navigate("/products")} className="rounded-xl border px-5 py-2.5 text-sm font-semibold">Cancel</button><button onClick={()=>navigate("/products")} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">Create Product</button></div></Card>
  </FormShell>;
}
