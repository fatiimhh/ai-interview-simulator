import React, { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import ChatContainer from './components/ChatContainer';
import SavedChats from './components/SavedChats';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [savedChats, setSavedChats] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedChats')) || [];
    setSavedChats(stored);
  }, []);

  const saveChat = (role, messages) => {
    const newChat = { role, messages, id: Date.now() };
    const updatedChats = [newChat, ...savedChats];
    setSavedChats(updatedChats);
    localStorage.setItem('savedChats', JSON.stringify(updatedChats));
  };

  const handleSelectSavedChat = (chat) => {
    setSelectedRole(chat.role);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SavedChats savedChats={savedChats} onSelectChat={handleSelectSavedChat} />

      <div className="flex-1 p-4">
        {!selectedRole && <RoleSelector onRoleSelect={setSelectedRole} />}
        {selectedRole && (
          <ChatContainer
            role={selectedRole}
            onBack={() => setSelectedRole(null)}
            onSave={saveChat}
          />
        )}
      </div>
    </div>
  );
}

export default App;
