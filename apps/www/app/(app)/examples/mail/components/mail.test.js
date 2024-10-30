// Mail.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mail } from './Mail'; // Adjust the import path as necessary
import { Mail as MailType } from "@/app/(app)/examples/mail/data"; // Import your Mail type
import { Inbox } from 'lucide-react'; // Import any icons you use in your tests

describe('Mail Component main test', () => {
  const accounts = [
    { label: 'Personal', email: 'user@example.com', icon: <Inbox /> },
    { label: 'Work', email: 'user@work.com', icon: <Inbox /> },
  ];

  const mails = [
    { id: 1, subject: 'Hello World', read: false },
    { id: 2, subject: 'Test Email', read: true },
  ];


  // Check text and input elements
  test('renders Mail component', () => {
    render(<Mail accounts={accounts} mails={mails} navCollapsedSize={50} />);

    expect(screen.getByText(/Inbox/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  test('toggles account switcher', () => {
    render(<Mail accounts={accounts} mails={mails} navCollapsedSize={50} />);

    const accountSwitcher = screen.getByText(/Personal/i);
    // Verify the account switcher is initially visible
    expect(accountSwitcher).toBeInTheDocument();

    // Assuming your account switcher can collapse/expand, simulate a toggle
    // You would need to add the logic in your AccountSwitcher component
    fireEvent.click(accountSwitcher);

    // Check for some change, like a different account being displayed or an element being toggled
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });

  test('navigates between tabs', () => {
    render(<Mail accounts={accounts} mails={mails} navCollapsedSize={50} />);

    // Check that the 'All mail' tab is active by default
    expect(screen.getByText(/All mail/i)).toHaveClass('text-zinc-600');

    // Click on 'Unread' tab
    fireEvent.click(screen.getByText(/Unread/i));

    // Check that 'Unread' tab is now active
    expect(screen.getByText(/Unread/i)).toHaveClass('text-zinc-600');
    expect(screen.getByText(/All mail/i)).not.toHaveClass('text-zinc-600');

    // Verify that unread mails are displayed
    expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Email/i)).not.toBeInTheDocument();
  });
});
