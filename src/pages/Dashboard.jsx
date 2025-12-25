import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Layout from "../components/Layout";
import { useFinance } from "../contexts/FinanceContext";
import TransactionForm from "../components/TransactionForm";
 function Dashboard() {
   const { transactions } = useFinance();

   const totalBalance = transactions.reduce((acc, curr) => {
     return acc + Number(curr.amount);
   }, 0);
   const totalExpenses = transactions
     .filter((t) => Number(t.amount) < 0)
     .reduce((acc, curr) => acc + Number(curr.amount), 0);

   // 3. Total Income: Sum of only the positive numbers
   const totalIncome = transactions
     .filter((t) => Number(t.amount) > 0)
     .reduce((acc, curr) => acc + Number(curr.amount), 0);
   const savingsRate =
     totalIncome > 0
       ? ((totalIncome - Math.abs(totalExpenses)) / totalIncome) * 100
       : 0;

   const categoryData = transactions
     .filter((t) => t.amount < 0)
     .reduce((acc, curr) => {
       const existing = acc.find((item) => item.name === curr.category);
       if (existing) {
         existing.value += Math.abs(curr.amount);
       } else {
         acc.push({ name: curr.category, value: Math.abs(curr.amount) });
       }
       return acc;
     }, []);

   const COLORS = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6"];
   // This prepares the data for the graph
const chartData = transactions
  .slice() // Make a copy
  .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort Oldest to Newest
  .reduce((acc, curr) => {
    // Get the balance from the previous day (or 0 if it's the first day)
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].amount : 0;

    // Add the current transaction (Income adds, Expense subtracts)
    const newBalance = previousBalance + Number(curr.amount);

    const date = curr.date;
    const existingDate = acc.find((item) => item.date === date);

    if (existingDate) {
      // If same day, just update the balance for that day
      existingDate.amount = newBalance;
    } else {
      // Otherwise, add a new day point
      acc.push({ date, amount: newBalance });
    }
    return acc;
  }, []);
   
   return (
     <Layout>
       <div className="space-y-8">
         {/* TOP STATS GRID */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatCard title="Total Balance" amount={totalBalance} />
           <StatCard title="Total Expenses" amount={totalExpenses} isExpense />
           <StatCard title="Savings Rate" amount={savingsRate} isPercent />
         </section>

         {/* CHARTS SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Main Line Chart */}
           <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-80">
             <h3 className="text-slate-200 font-semibold mb-4">
               Spending Trend
             </h3>
             <ResponsiveContainer width="100%" height="90%">
               <AreaChart data={chartData}>
                 <XAxis
                   dataKey="date"
                   stroke="#94a3b8"
                   fontSize={12}
                   tickLine={false}
                   axisLine={false}
                   dy={10}
                 />
                 <YAxis
                   stroke="#94a3b8"
                   fontSize={12}
                   tickLine={false}
                   axisLine={false}
                   tickFormatter={(value) => `$${value}`}
                   domain={[0, "auto"]} // Forces the bottom of the chart to be $0
                 />
                 {/* Use a Gradient for a professional look */}
                 <defs>
                   <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                   </linearGradient>
                 </defs>
                 <Area
                   type="monotone" // Use 'stepAfter' if you want a more "banking" look
                   dataKey="amount"
                   stroke="#10b981"
                   fillOpacity={1}
                   fill="url(#colorAmount)"
                   strokeWidth={3}
                 />
                 <Tooltip
                   contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                 />
                 {/* <Area */}
                 /
               </AreaChart>
             </ResponsiveContainer>
           </div>

           {/* Pie Chart */}
           <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-80 flex flex-col">
             <h3 className="text-slate-200 font-semibold mb-4">Expense Breakdown by Categories</h3>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={categoryData}
                   innerRadius={50}
                   outerRadius={100}
                   dataKey="value"
                 >
                   {categoryData.map((entry, index) => (
                     <Cell
                       key={`cell-${index}`}
                       fill={COLORS[index % COLORS.length]}
                     />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
         </div>
       </div>
     </Layout>
   );
 }

function StatCard({ title, amount, isExpense, isPercent }) {
  const formatted = isPercent 
    ? `${amount.toFixed(0)}%` 
    : `$${Math.abs(amount).toLocaleString()}`;
return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 shadow-sm">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${isExpense ? 'text-rose-400' : isPercent ? 'text-sky-400' : 'text-white'}`}>
        {formatted}
      </h2>
    </div>
  );}
  export default Dashboard;
