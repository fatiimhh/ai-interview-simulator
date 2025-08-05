import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import InputBar from './components/InputBar';
import RoleSelector from './components/RoleSelector';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Welcome to the AI Interview Simulator! Please select a role to begin.' }
  ]);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setMessages([
      { sender: 'ai', text: `Great! Let's begin your mock interview for the role of **${role}**. Here's your first question:` },
      { sender: 'ai', text: getFirstQuestion(role) }
    ]);
  };

  const handleSendMessage = (userText) => {
    const newMessage = { sender: 'user', text: userText };
    setMessages((prev) => [...prev, newMessage]);

    // Optional: Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Thanks for your answer. Let's move on.` }
      ]);
    }, 1000);
  };

  const getFirstQuestion = (role) => {
    switch (role) {
      case 'Frontend Developer':
        return 'Can you explain the difference between client-side rendering and server-side rendering?';
      case 'Backend Developer':
        return 'What are the key considerations when designing a RESTful API?';
      case 'Data Scientist':
        return 'How do you handle missing data in a dataset?';
      case 'Product Manager':
        return 'How would you prioritize features in a new product roadmap?';
      default:
        return 'Let’s get started!';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-4">
        {!selectedRole && <RoleSelector onRoleSelect={handleRoleSelect} />}
        <ChatBox messages={messages} />
        {selectedRole && <InputBar onSend={handleSendMessage} />}
      </div>
    </div>
  );
}

export default App;
