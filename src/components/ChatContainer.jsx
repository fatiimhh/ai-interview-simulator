import React, { useState, useEffect } from 'react'; 
import { getGroqReply } from '../utils/groqAPI';
import InputBar from './InputBar';
import ChatBox from './ChatBox';

function ChatContainer({ role, onBack  }) {
  const systemPrompt = {
    sender: 'system',
    text: `You are a professional interviewer. Start a mock interview for the role of ${role}. Ask one question at a time. Wait for the user's answer before continuing.`,
  };


  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the first question from AI
  useEffect(() => {
    const initInterview = async () => {
      setIsLoading(true);
      const reply = await getGroqReply([systemPrompt], role);
      setMessages([{ sender: 'ai', text: reply }]);
      setIsLoading(false);
    };

    initInterview();
  }, [role]);

  // Handle user input and send to API
  const handleSend = async (userText) => {
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    // Send system prompt + conversation messages to API
    const messagesForAPI = [systemPrompt, ...newMessages];

    const reply = await getGroqReply(messagesForAPI, role);
    setMessages([...newMessages, { sender: 'ai', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div>
      <button
        className="mb-4 px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
        onClick={onBack}
      >
        ← Back to Roles
      </button>

      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatContainer;
