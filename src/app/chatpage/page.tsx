"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { socket, connectSocket } from "@/libs/socket";

export default function ChatPage() {
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [me, setMe] = useState(null);

  /* ================= SOCKET ================= */
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(me);
  }, [me]);
  useEffect(() => {
    connectSocket();

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleError = (err) => {
      console.error("socket error:", err);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("error_message", handleError);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("error_message", handleError);
      socket.disconnect(); // ถ้า chat เป็น feature เดียว
    };
  }, []);

  /* ================= LOAD ROOMS ================= */

  useEffect(() => {
    const getMe = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST_URL;
        const token = localStorage.getItem("token");
        const res = await axios.get(`${host}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(res.data);
      } catch (err) {
        console.error("Error fetching me:", err);
      }
    };

    getMe();
  }, []);

  useEffect(() => {
    const getChatsRoom = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${host}/chat/rooms/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    getChatsRoom();
  }, []);

  /* ================= LOAD MESSAGES ================= */

  const loadMessages = async (roomId) => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST_URL;
      const token = localStorage.getItem("token");

      const res = await axios.get(`${host}/chat/rooms/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(res.data);
    } catch (err) {
      console.error("load messages error", err);
    }
  };

  /* ================= SEND MESSAGE ================= */

  const sendMessage = () => {
    if (!message.trim() || !active) return;

    socket.emit("send_message", {
      roomId: active._id,
      message,
    });

    setMessage("");
  };

  /* ================= CREATE ROOM ================= */

  const createRoom = async () => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST_URL;
      const token = localStorage.getItem("token");

      await axios.post(
        `${host}/chat/rooms`,
        {
          name: `${selectedUser.firstName} ${selectedUser.lastName}`,
          members: [selectedUser._id],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error creating new chat room:", err);
    }
  };

  /* ================= LOAD USERS ================= */

  const openModal = async () => {
    setIsOpen(true);

    try {
      const host = process.env.NEXT_PUBLIC_HOST_URL;
      const token = localStorage.getItem("token");

      const res = await axios.get(`${host}/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen rounded-2xl bg-linear-to-br from-[#9cc9ff] to-[#4c6b8a] p-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl h-[90vh] flex overflow-hidden">
          {/* ========== SIDEBAR ========== */}
          <div className="w-80 bg-white flex flex-col border-r">
            <div className="p-4 border-b flex justify-between">
              <h2 className="font-semibold">Chat</h2>
              <button
                onClick={openModal}
                className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded"
              >
                + New
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => {
                    if (active?._id === room._id) return;

                    setActive(room);
                    setMessages([]);

                    socket.emit("leave_all_rooms");
                    socket.emit("join_room", room._id);
                    loadMessages(room._id);
                  }}
                  className={`px-4 py-3 cursor-pointer border-b
                    ${
                      active?._id === room._id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <p className="font-medium text-sm">{room.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ========== CHAT AREA ========== */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b font-semibold">
              {active?.name || "เลือกห้องแชท"}
            </div>

            <div className="flex-1 p-6 space-y-3 overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-md p-3 rounded-xl shadow text-sm
                    ${
                      msg.senderId?._id === me?._id
                        ? "ml-auto bg-blue-500 text-white"
                        : "bg-white border"
                    }`}
                >
                  <p className="text-xs opacity-60 mb-1">
                    {msg.senderId?.username}
                  </p>
                  {msg.message}
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 rounded-xl px-4 py-2 border"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-5 rounded-xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODAL ========== */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-xl p-5">
            <h3 className="font-semibold mb-3">เริ่มแชทใหม่</h3>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left px-3 py-2 rounded border
                    ${
                      selectedUser?._id === user._id
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsOpen(false)}>ยกเลิก</button>
              <button
                onClick={createRoom}
                disabled={!selectedUser}
                className="bg-blue-500 text-white px-4 py-1.5 rounded disabled:opacity-40"
              >
                สร้างแชท
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
