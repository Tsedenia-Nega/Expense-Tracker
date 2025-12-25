import React from 'react'
import Sidebar from './Sidebar'
import { useFinance } from '../contexts/FinanceContext';
import TransactionForm from './TransactionForm';
const Layout = ({children}) => {
  const { isModalOpen, openModal, closeModal } = useFinance();
  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16  flex items-center py-3 justify-between px-8 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-lg font-medium text-slate-400">Overview</h1>
          <button
            onClick={openModal}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20"
          >
            + Add Transaction
          </button>
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Background Blur/Darken */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeModal} // Closes if you click outside the form
          ></div>

          {/* 2. The Form Card */}
          <div className="relative z-10 w-full max-w-md">
            <TransactionForm closeForm={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout
