import { useFinance } from "../contexts/FinanceContext";
import TransactionForm from "./TransactionForm";
export default function Sidebar  ()  {
  const { user } = useFinance();
  
  return (
    <aside
      className="w-64  bg-[#1e293b]
 hidden md:flex  flex-col border rounded border-slate-800"
    >
      <div className="items-center border-b px-8 py-6 border-slate-600 text-emerald-500 font-bold text-xl">
        Hello {user}
      </div>
      {/* <hr /> */}
      <nav className="flex-1 p-4 space-y-1">
        <NavItem label="Dashboard" active />
        <NavItem label="Transaction" />

        <NavItem label="Budgeting" />
      </nav>
    </aside>
  );
}
function NavItem({label,active=false}){
return (
  <div
    className={`p-3 rounded-xl cursor-pointer transition-colors ${
      active
        ? "bg-emerald-600/10 text-emerald-400"
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
    }`}
  >
    {label}
  </div>
);
}


