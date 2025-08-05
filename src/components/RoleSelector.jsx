import React, { useState } from 'react';

const roles = ['Frontend Developer', 'Backend Developer', 'Data Scientist', 'Product Manager'];

function RoleSelector({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelect = (role) => {
    setSelectedRole(role);
    onRoleSelect(role); // pass role up to parent
  };

  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">Select a role to start your interview:</p>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role}
            className={`px-3 py-1 rounded-full border text-sm ${
              selectedRole === role ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleSelect(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoleSelector;
