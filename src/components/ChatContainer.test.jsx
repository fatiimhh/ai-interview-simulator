import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatContainer from './ChatContainer';

jest.mock('../utils/groqAPI', () => ({
  getGroqReply: jest.fn(() => Promise.resolve(''))
}));

describe('ChatContainer basic UI', () => {
  const role = 'Frontend Developer';
  let onBackMock;

  beforeEach(() => {
    onBackMock = jest.fn();
  });

  test('renders input bar for user messages', () => {
    render(<ChatContainer role={role} onSave={jest.fn()} onBack={onBackMock} />);
    expect(screen.getByPlaceholderText(/Type your answer/i)).toBeInTheDocument();
    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });

  test('calls onBack when Back button is clicked', () => {
    render(<ChatContainer role={role} onSave={jest.fn()} onBack={onBackMock} />);
    const backButton = screen.getByText(/← Back to Roles/i);
    backButton.click();
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });
});
