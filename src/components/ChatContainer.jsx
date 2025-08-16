import React, { useEffect, useRef, useState } from 'react';
import { getGroqReply } from '../utils/groqAPI';
import InputBar from './InputBar';
import ChatBox from './ChatBox';

function ChatContainer({ role, onBack, onSave, initialMessages = [], chatId: initialChatId = null }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const chatIdRef = useRef(initialChatId || Date.now());
  const bootstrappedRef = useRef(false);
  const savedOnceRef = useRef(!!initialChatId); // track if this chat was already saved before

  const systemPrompt = {
    sender: 'system',
    text: `You are a professional interviewer. Start a mock interview for the role of ${role}. Ask one question at a time. Wait for the user's answer before continuing. After each user response, provide concise feedback (1-2 sentences) on how they can improve, then ask the next relevant question. Use "Next question:" before the next question only.`
  };

  const splitFeedbackAndQuestion = (reply) => {
    if (!reply || typeof reply !== 'string') return { feedback: '', question: '' };
    const marker = /next\s*question\s*:/i;
    const match = reply.match(marker);
    if (!match) return { feedback: '', question: reply.trim() };

    const idx = match.index ?? -1;
    if (idx === -1) return { feedback: '', question: reply.trim() };

    const before = reply.slice(0, idx).trim();
    const after = reply.slice(idx + match[0].length).trim();
    return { feedback: before, question: after };
  };

  // Start interview (only if new)
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (bootstrappedRef.current) return;
      bootstrappedRef.current = true;

      if (initialMessages.length > 0) return;

      setIsLoading(true);
      try {
        const reply = await getGroqReply([systemPrompt], role);
        const { feedback, question } = splitFeedbackAndQuestion(reply);

        const aiMessages = [];
        if (feedback) aiMessages.push({ sender: 'ai', text: feedback, type: 'feedback' });
        if (question) aiMessages.push({ sender: 'ai', text: question, type: 'question' });

        if (!mounted) return;
        setMessages(aiMessages);

      } catch (err) {
        console.error('Error starting interview:', err);
        if (mounted) setMessages([{ sender: 'ai', text: 'Failed to start interview. Please try again.' }]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    init();
    return () => { mounted = false; };
  }, [role, initialMessages]);

  const handleSend = async (userText) => {
    if (!userText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const reply = await getGroqReply([systemPrompt, ...newMessages], role);
      const { feedback, question } = splitFeedbackAndQuestion(reply);

      const aiMessages = [];
      if (feedback) aiMessages.push({ sender: 'ai', text: feedback, type: 'feedback' });
      if (question) aiMessages.push({ sender: 'ai', text: question, type: 'question' });

      const updated = [...newMessages, ...aiMessages];
      setMessages(updated);

      // Save automatically after each message
      const idToUse = savedOnceRef.current ? chatIdRef.current : null;
      onSave(role, updated, idToUse);
      savedOnceRef.current = true;

    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error getting AI response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummary = async () => {
    setIsLoading(true);
    const summaryPrompt = {
      sender: 'system',
      text: `Provide a concise summary of the candidate's performance based on their answers. Highlight strengths and areas for improvement.`
    };

    const userOnly = messages.filter(m => m.sender === 'user');

    try {
      const summary = await getGroqReply([summaryPrompt, ...userOnly], role);
      const updated = [...messages, { sender: 'ai', text: summary, type: 'summary' }];
      setMessages(updated);

      const idToUse = savedOnceRef.current ? chatIdRef.current : null;
      onSave(role, updated, idToUse);
      savedOnceRef.current = true;

    } catch (err) {
      console.error('Error generating summary:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error generating summary.' }]);
    } finally {
      setIsLoading(false);
    }
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

        {messages.some(m => m.sender === 'user') && (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={handleSummary}
            >
              Get Final Summary
            </button>
          {/*  <button
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={() => {
                const idToUse = savedOnceRef.current ? chatIdRef.current : null;
                onSave(role, messages, idToUse);
                savedOnceRef.current = true;
              }}
            >
              Save Chat
            </button>*/} 
          </div>
        )}
      </div>

      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatContainer;
