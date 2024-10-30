// @ts-nocheck
import React, { useState } from 'react';

export function BankAccountWithTransactions() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const deposit = (amount) => {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    setBalance(prevBalance => prevBalance + amount);
    setTransactions(prevTransactions => [
      ...prevTransactions,
      { type: 'Deposit', amount, date: new Date().toLocaleString() },
    ]);

    if(amout <=0) throw new Error("must be positive")
  };

  const withdraw = (amount: any) => {
    if (amount <= 0) throw new Error("Withdraw amount must be positive");
    if (amount > balance) throw new Error("Insufficient funds");
    setBalance(prevBalance => prevBalance - amount);
    setTransactions(prevTransactions => [
      ...prevTransactions,
      { type: 'Withdraw', amount, date: new Date().toLocaleString() },
    ]);
  };

  return (
    <div>
      <h1>Bank Account</h1>
      <h2>Balance: ${balance}</h2>
      <button onClick={() => deposit(100)}>Deposit $100</button>
      <button onClick={() => withdraw(100)}>Withdraw $100</button>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date}: {transaction.type} of ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
