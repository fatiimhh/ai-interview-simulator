import React, { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import ChatContainer from './components/ChatContainer';
import SavedChats from './components/SavedChats';
import { auth, provider } from './firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [savedChats, setSavedChats] = useState([]);
  const [initialMessages, setInitialMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load saved chats from localStorage per user
        const stored = JSON.parse(localStorage.getItem(`savedChats_${currentUser.uid}`)) || [];
        setSavedChats(stored);
      } else {
        setSavedChats([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Save or update chat
  const saveChat = (role, messages, chatId = null) => {
    if (!messages || messages.length === 0 || !user) return;

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

      localStorage.setItem(`savedChats_${user.uid}`, JSON.stringify(updatedChats));
      setCurrentChatId(chatId); // track current chat
      return updatedChats;
    });
  };

  //  Delete chat
  const deleteChat = (chatId) => {
    if (!user) return;
    setSavedChats(prevChats => {
      const updatedChats = prevChats.filter(chat => chat.id !== chatId);
      localStorage.setItem(`savedChats_${user.uid}`, JSON.stringify(updatedChats));
      return updatedChats;
    });

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

  // Google login
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with login/logout */}
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="font-bold text-lg">Welcome to your AI interview simulator</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, {user.displayName}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={login} className="bg-blue-500 text-white px-3 py-1 rounded">
            Sign in with Google
          </button>
        )}
      </header>

      <div className="flex flex-1">
        {user && (
          <SavedChats
            savedChats={savedChats}
            onSelectChat={handleSelectSavedChat}
            onDeleteChat={deleteChat}
          />
        )}

        <div className="flex-1 p-4">
          {!user ? (
            <p className="text-center mt-10 text-gray-600">
              Please sign in with Google to start interviews.
            </p>
          ) : !selectedRole ? (
            <RoleSelector onRoleSelect={handleRoleSelect} />
          ) : (
            <ChatContainer
              key={`${selectedRole}-${initialMessages.length}`}
              role={selectedRole}
              initialMessages={initialMessages}
              chatId={currentChatId}
              onBack={handleBack}
              onSave={saveChat}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
