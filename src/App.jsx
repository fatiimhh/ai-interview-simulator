import React, { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import ChatContainer from './components/ChatContainer';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-4">
        {!selectedRole && <RoleSelector onRoleSelect={setSelectedRole} />}
        {selectedRole && <ChatContainer role={selectedRole} />}
      </div>
    </div>
  );
}

export default App;
