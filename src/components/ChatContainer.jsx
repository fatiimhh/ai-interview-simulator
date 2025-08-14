import React, { useState, useEffect } from 'react'; 
import { getGroqReply } from '../utils/groqAPI';
import InputBar from './InputBar';
import ChatBox from './ChatBox';

function ChatContainer({ role, onBack }) {
  const systemPrompt = {
    sender: 'system',
    text: `You are a professional interviewer. Start a mock interview for the role of ${role}. Ask one question at a time. Wait for the user's answer before continuing. After each user response, provide concise feedback (1-2 sentences) on how they can improve, then ask the next relevant question.`,
  };

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the first question from AI
  useEffect(() => {
    const initInterview = async () => {
      setIsLoading(true);
      const reply = await getGroqReply([systemPrompt], role);
      setMessages([{ sender: 'ai', text: reply, type: 'question' }]);
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

    // Split feedback & next question if AI includes "Next question:"
    let feedback = reply;
    let question = '';
    const splitIndex = reply.indexOf('Next question:');
    if (splitIndex !== -1) {
      feedback = reply.slice(0, splitIndex).trim();
      question = reply.slice(splitIndex).trim();
    }

    const aiMessages = [];
    if (feedback) aiMessages.push({ sender: 'ai', text: feedback, type: 'feedback' });
    if (question) aiMessages.push({ sender: 'ai', text: question, type: 'question' });

    setMessages([...newMessages, ...aiMessages]);
    setIsLoading(false);
  };

  // Handle final summary
  const handleSummary = async () => {
    setIsLoading(true);

    const summaryPrompt = {
      sender: 'system',
      text: `You are a professional interviewer. Provide a concise summary of the candidate's performance based on their answers. Highlight strengths and areas for improvement.`,
    };

    // Only pass user messages to the summary
    const userMessages = messages.filter(msg => msg.sender === 'user');
    const messagesForAPI = [summaryPrompt, ...userMessages];

    const summary = await getGroqReply(messagesForAPI, role);

    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: summary, type: 'summary' }
    ]);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          onClick={onBack}
        >
          ← Back to Roles
        </button>
        {messages.some(msg => msg.sender === 'user') && (
          <button
            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={handleSummary}
          >
            Get Final Summary
          </button>
        )}
      </div>

      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatContainer;
