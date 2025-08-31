// src/pages/ChatPage.jsx
import React from 'react';

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar for user list */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        {/* We will build the sidebar components here */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          {/* User list will go here */}
        </div>
      </div>

      {/* Main chat window */}
      <div className="w-3/4 flex flex-col">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold">Selected User Name</h2>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Messages will be displayed here */}
        </div>

        {/* Message input */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* Message input field and send button */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;