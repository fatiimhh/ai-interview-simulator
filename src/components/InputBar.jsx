import React, { useState } from 'react';

function InputBar({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
        placeholder="Type your answer..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
      >
        Send
      </button>
    </form>
  );
}

export default InputBar;
