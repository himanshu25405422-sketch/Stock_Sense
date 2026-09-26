import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { PageHeader, Card, StatusBadge } from "../components/UI";
const rows=[["REC-001","ABC Steel Pvt Ltd","Steel Rod","100 KG","Done"],["REC-018","Global Plastics","Plastic Sheet","200 PCS","Ready"],["REC-019","Metro Metals","Steel Rod","250 KG","Waiting"]];
export default function Receipts(){return <div><PageHeader title="Receipts" subtitle="Track incoming stock from suppliers." action actionText="＋ New Receipt" to="/receipts/new"/><ListCard rows={rows} headers={["Receipt","Supplier","Product","Quantity","Status"]}/></div>}
function ListCard({rows,headers}){return <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{headers.map(h=><th className="px-5 py-3" key={h}>{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map(r=><tr key={r[0]}>{r.map((x,i)=><td className={`px-5 py-4 ${i===0?"font-semibold text-blue-600":""}`} key={i}>{i===r.length-1?<StatusBadge status={x}/>:x}</td>)}</tr>)}</tbody></table></div></Card>}
