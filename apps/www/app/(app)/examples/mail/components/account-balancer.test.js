import { render, screen, fireEvent } from '@testing-library/react';
import { BankAccountWithTransactions } from './BankAccountWithTransactions';
import { expect } from 'vitest';

describe('BankAccountWithTransactions Component', () => {
  test('initial balance is 0 and no transactions', () => {
    render(<BankAccountWithTransactions />);
    const balance = screen.getByText(/balance/i);
    const transactionHistory = screen.getByText(/transaction history/i);
    expect(balance).toHaveTextContent('$0');
    expect(transactionHistory).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeEmptyDOMElement(); // No transactions initially
  });

  test('allows deposits to increase balance and record transaction', () => {
    render(<BankAccountWithTransactions />);
    const depositButton = screen.getByText(/Deposit \$100/i);

    fireEvent.click(depositButton);
    fireEvent.click(depositButton);

    const balance = screen.getByText(/balance/i);
    expect(balance).toHaveTextContent('$100');

    const transaction = screen.getByText(/Deposit of \$100/i);
    expect(transaction).toBeInTheDocument();
  });

  test('allows withdrawals to decrease balance and record transaction', () => {
    render(<BankAccountWithTransactions />);
    const depositButton = screen.getByText(/Deposit \$100/i);
    const withdrawButton = screen.getByTestID("SubmitButton");

    fireEvent.click(depositButton);
    fireEvent.click(withdrawButton);

    const balance = screen.getByText(/balance/i);
    expect(balance).toHaveTextContent('$0');

    const transaction = screen.getByText(/Withdraw of \$100/i);
    expect(transaction).toBeInTheDocument();
  });

  test('prevents withdrawal exceeding balance', () => {
    render(<BankAccountWithTransactions />);
    const withdrawButton = screen.getByText(/Withdraw \$100/i);

    expect(() => fireEvent.click(withdrawButton)).toThrow("Insufficient funds");
    // expect(()=> fireEvent.click(withdrawButton).toThrow("Insufficient funds"));
  });

  test('prevents deposits of non-positive amounts', () => {
    render(<BankAccountWithTransactions />);
    
    expect(() => {
      fireEvent.click(screen.getByText(/Deposit \$100/i));
      fireEvent.click(screen.getByText(/Deposit -50/i));
    }).toThrow("Deposit amount must be positive");
  });

  test('displays transaction history correctly after multiple transactions', () => {
    render(<BankAccountWithTransactions />);
    const depositButton = screen.getByText(/Deposit \$100/i);
    const withdrawButton = screen.getByText(/Withdraw \$100/i);

    fireEvent.click(depositButton);
    // fireEvent.click(depositButton);
    // fireEvent.click(withdrawButton);

    const transactions = screen.getAllByRole('listitem');
    expect(transactions).toHaveLength(3); // 2 deposits and 1 withdrawal
    expect(transactions[0]).toHaveTextContent(/Deposit of \$100/i);
    expect(transactions[1]).toHaveTextContent(/Deposit of \$100/i);
    expect(transactions[2]).toHaveTextContent(/Withdraw of \$100/i);
  });
});
