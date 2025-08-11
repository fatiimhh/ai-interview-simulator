import React, { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import ChatContainer from './components/ChatContainer';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleBack = () => {
    setSelectedRole(null);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-4"> 
              <h1 className="font-semibold mb-10">Here’s your AI interviewer!</h1>

        {!selectedRole && <RoleSelector onRoleSelect={setSelectedRole} />}
        {selectedRole && <ChatContainer role={selectedRole} onBack={handleBack} />}
      </div>
    </div>
  );
}

export default App;
