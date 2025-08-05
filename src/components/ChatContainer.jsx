import React, { useState, useEffect } from 'react';
import { getGroqReply } from '../utils/groqAPI';
import InputBar from './InputBar';
import ChatBox from './ChatBox';

function ChatContainer({ role }) {
  const [messages, setMessages] = useState([
    {
      sender: 'system',
      text: `You are a professional interviewer. Start a mock interview for the role of ${role}. Ask one question at a time. Wait for the user's answer before continuing.`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the first question from AI
  useEffect(() => {
    const initInterview = async () => {
      setIsLoading(true);
      const reply = await getGroqReply(messages, role);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsLoading(false);
    };

    initInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle user responses
  const handleSend = async (userText) => {
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    const reply = await getGroqReply(newMessages, role);
    setMessages([...newMessages, { sender: 'ai', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div>
      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatContainer;
