import React, { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import ChatContainer from './components/ChatContainer';
import SavedChats from './components/SavedChats';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [savedChats, setSavedChats] = useState([]);
  const [initialMessages, setInitialMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load saved chats once on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedChats')) || [];
    setSavedChats(stored);
  }, []);

  // Save or update chat
  const saveChat = (role, messages, chatId = null) => {
    if (!messages || messages.length === 0) return;

    setSavedChats(prevChats => {
      let updatedChats;

      if (chatId) {
        // Update existing chat
        updatedChats = prevChats.map(chat =>
          chat.id === chatId ? { ...chat, role, messages } : chat
        );
      } else {
        // New chat
        chatId = Date.now();
        updatedChats = [{ id: chatId, role, messages }, ...prevChats];
      }

      localStorage.setItem('savedChats', JSON.stringify(updatedChats));
      setCurrentChatId(chatId); // track current chat
      return updatedChats;
    });
  };

  //  Delete chat
  const deleteChat = (chatId) => {
    setSavedChats(prevChats => {
      const updatedChats = prevChats.filter(chat => chat.id !== chatId);
      localStorage.setItem('savedChats', JSON.stringify(updatedChats));
      return updatedChats;
    });

    // if the deleted chat is the one currently open, reset state
    if (chatId === currentChatId) {
      setSelectedRole(null);
      setInitialMessages([]);
      setCurrentChatId(null);
    }
  };

  const handleSelectSavedChat = (chat) => {
    setSelectedRole(chat.role);
    setInitialMessages(chat.messages || []);
    setCurrentChatId(chat.id);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setInitialMessages([]);
    setCurrentChatId(null);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setInitialMessages([]);
    setCurrentChatId(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SavedChats 
        savedChats={savedChats} 
        onSelectChat={handleSelectSavedChat} 
        onDeleteChat={deleteChat}   // pass delete function
      />

      <div className="flex-1 p-4">
        {!selectedRole ? (
          <RoleSelector onRoleSelect={handleRoleSelect} />
        ) : (
          <ChatContainer
            key={`${selectedRole}-${initialMessages.length}`}
            role={selectedRole}
            initialMessages={initialMessages}
            chatId={currentChatId}
            onBack={handleBack}
            onSave={saveChat} // pass save function
          />
        )}
      </div>
    </div>
  );
}

export default App;
