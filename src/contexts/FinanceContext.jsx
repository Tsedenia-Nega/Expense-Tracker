import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'
const FinanceProvider = createContext();

export default function FinanceContext({children}) {
     const [isModalOpen, setIsModalOpen] = useState(false); // New state

     const openModal = () => setIsModalOpen(true);
     const closeModal = () => setIsModalOpen(false);
const [transactions,setTransactions]= useState(()=>{
   
    const savedData= localStorage.getItem("my_transaction");
    return savedData ? JSON.parse(savedData) : [] ;
});
const [user,setUser]= useState(()=>{
    const savedUser= localStorage.getItem("user_name");
    return savedUser ? JSON.parse(savedUser) : "Tsedenia";
});
useEffect(()=>{
    localStorage.setItem("my_transaction",JSON.stringify(transactions));
},[transactions]);


useEffect(() => {
    localStorage.setItem("user_name",JSON.stringify(user));
}, [user]);
const addTransaction= (item)=>{
 setTransactions((prev)=>[item, ...prev]);
}
const deleteTransaction=(id)=>{
    setTransactions((prev)=>prev.filter((t)=>t.id !== id));
}
const updateUserName = (newName) => {
  setUser(newName);
};
  return (
    <FinanceProvider.Provider
      value={{
        transactions,
        user,
        addTransaction,
        deleteTransaction,
        updateUserName,
        isModalOpen, 
        openModal, 
        closeModal,
      }}
    >
      {children}
    </FinanceProvider.Provider>
  );
}
// Custom Hook: This is what you call in your components
export const useFinance = () => {
  const context = useContext(FinanceProvider);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
