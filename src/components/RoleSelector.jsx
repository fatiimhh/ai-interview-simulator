import React, { useState } from 'react';

const initialRoles = ['Frontend Developer', 'Backend Developer', 'Data Scientist', 'Product Manager'];

function RoleSelector({ onRoleSelect }) {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleSelect = (role) => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  const addCustomRole = () => {
    const trimmed = newRole.trim();
    if (trimmed && !roles.includes(trimmed)) {
      setRoles([...roles, trimmed]);
      setNewRole('');
      setSelectedRole(trimmed);
      onRoleSelect(trimmed);
    }
  };

  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">Select a role to start your interview:</p>
      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add custom role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addCustomRole}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;
