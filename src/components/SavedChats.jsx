import React from "react";

function SavedChats({ savedChats, onSelectChat, onDeleteChat }) {
  return (
    <div className="w-64 bg-white border-r p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">Saved Interviews</h2>
      {savedChats.length === 0 && (
        <p className="text-gray-500">No saved interviews yet.</p>
      )}
      {savedChats.map((chat) => (
        <div
          key={chat.id}
          className="mb-2 p-2 border rounded hover:bg-gray-100 flex justify-between items-center"
        >
          <div
            className="cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <p className="font-medium">{chat.role}</p>
            <p className="text-xs text-gray-500">
              {chat.messages.length} messages
            </p>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onDeleteChat(chat.id);
            }}
            className="ml-2 text-red-500 hover:text-red-700 text-sm"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default SavedChats;
