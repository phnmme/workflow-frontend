"use client";

import { useState } from "react";

const chats = [
  { id: 1, name: "DDD DDDD", msg: "Hello", time: "12:30" },
  { id: 2, name: "GGGG GGGG", msg: "How are you?", time: "11:40" },
  { id: 3, name: "MMMM WWWW", msg: "Test message", time: "10:20" },
  { id: 4, name: "John Doe", msg: "Hey!", time: "Yesterday" },
  { id: 5, name: "Pretty Kitty", msg: "Meow 🐱", time: "Yesterday" },
];

export default function ChatPage() {
  const [active, setActive] = useState(3);
  const [message, setMessage] = useState("");

  const activeChat = chats.find(c => c.id === active);

  return (
    <div className="min-h-screen rounded-2xl bg-linear-to-br from-[#9cc9ff] to-[#4c6b8a] p-6">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl h-[90vh] flex overflow-hidden border border-white/40">

        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl flex flex-col border-r border-blue-200">

          {/* Header */}
          <div className="p-4 border-b border-gray-200/60">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-700">Chat</h2>

              {/* New Chat Button */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg shadow"
              >
                + New
              </button>
            </div>

            <input
              className="w-full bg-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Search..."
            />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActive(chat.id)}
                className={`
                  px-4 py-3 flex justify-between cursor-pointer
                  border-b border-gray-100
                  transition
                  ${active === chat.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : "hover:bg-gray-50"
                  }
                `}
              >
                <div>
                  <p className="font-medium text-sm text-gray-700">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate w-40">
                    {chat.msg}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">

          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200/60">
            <h2 className="font-semibold text-gray-700">
              {activeChat?.name}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Leslie Alexander</span>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 shadow" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-linear-to-b from-gray-50 to-white">
            <div className="max-w-md bg-white p-3 rounded-xl shadow border border-gray-200 text-sm">
              Hi! Can you help me with the leave request system?
            </div>

            <div className="max-w-md ml-auto bg-blue-500 text-white p-3 rounded-xl shadow text-sm">
              Sure! What do you need?
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200/60 flex gap-3 bg-white">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 rounded-xl px-4 py-2
                      bg-white/70 backdrop-blur
                        border border-white/30
                        focus:outline-none
                      focus:border-blue-400
                        focus:ring-2 focus:ring-blue-300
                        transition shadow-sm"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-xl shadow">
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
