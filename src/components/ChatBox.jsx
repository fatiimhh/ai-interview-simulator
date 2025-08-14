import React from 'react';

function ChatBox({ messages, isLoading }) {
  return (
    <div className="h-80 overflow-y-auto border rounded p-3 mb-4 bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
        >
          <span
            className={`inline-block px-3 py-2 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-blue-200 text-blue-800'
                : msg.type === 'feedback'
                ? 'bg-yellow-100 text-yellow-900 italic'
                : msg.type === 'summary'
                ? 'bg-purple-100 text-purple-900 font-semibold'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.text}
          </span>
        </div>
      ))}
      {isLoading && <div className="text-gray-400 italic">AI is typing...</div>}
    </div>
  );
}

export default ChatBox;
