import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';

function TransactionForm({ closeForm }) {
  const { addTransaction } = useFinance();
  const [type, setType] = useState("expense");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Food",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }
const rawAmount = parseFloat(formData.amount);
const finalAmount =
  type === "expense" ? -Math.abs(rawAmount) : Math.abs(rawAmount);
    addTransaction({
      id: Date.now(),
      name: formData.name,
      amount: finalAmount,
      category: formData.category, // Fixed: lowercase 'f'
      date: new Date().toISOString().split('T')[0], // Standard YYYY-MM-DD format
    });

    closeForm(); // Closes the modal
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 shadow-2xl"
    >
      <h2 className="text-xl font-bold text-white">Add Transaction</h2>

      {/* NEW: Toggle Buttons for Income/Expense */}
      <div className="flex bg-slate-900 p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
            type === "expense"
              ? "bg-rose-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
            type === "income"
              ? "bg-emerald-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <label className="text-xs text-slate-400 mb-1 block">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-emerald-500"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-xs text-slate-400 mb-1 block">Amount</label>
          <input
            type="number"
            step="1"
            required
            value={formData.amount}
            placeholder="0.00"
            className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none"
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">Category</label>
          <select
            value={formData.category}
            className="bg-slate-900 border border-slate-700 p-3 rounded-xl text-white outline-none"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {type === "expense" ? (
              <>
                <option value="Food">Food</option>
                <option value="Entertainment">Fun</option>
                <option value="Rent">Rent</option>
                <option value="Drink">Drink</option>
              </>
            ) : (
              <>
                <option value="Salary">Salary</option>

                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>
      </div>
      {/* ... inside your TransactionForm.jsx, at the bottom of the <form> ... */}

      <div className="flex gap-3 pt-2">
        {/* CANCEL BUTTON */}
        <button
          type="button" // 👈 Crucial: This prevents the button from submitting the form
          onClick={closeForm}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-xl font-semibold transition-all"
        >
          Cancel
        </button>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
        >
          Save Transaction
        </button>
      </div>

      
    </form>
  );
}

export default TransactionForm;