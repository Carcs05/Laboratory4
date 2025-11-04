import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [balance, setBalance] = useState(100); 
  const [expenses, setExpenses] = useState([]);

  const addExpense = (description, amount) => {
    if (amount > 0 && amount <= balance) {
      setExpenses([...expenses, { description, amount }]);
      setBalance(balance - amount);
    } else {
      alert('Invalid amount!');
    }
  };

  const addBalance = (amount) => {
    if (amount > 0) {
      setBalance(balance + amount);
    } else {
      alert('Enter a valid amount!');
    }
  };

  return (
    <BudgetContext.Provider value={{ balance, expenses, addExpense, addBalance }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
