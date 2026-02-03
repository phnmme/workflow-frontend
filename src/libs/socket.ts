import { io } from "socket.io-client";

// const host = process.env.NEXT_PUBLIC_HOST_URL;
const host = "http://localhost:4000";

export const socket = io(host, {
  autoConnect: false,
});

export const connectSocket = () => {
  socket.auth = {
    token: localStorage.getItem("token"),
  };
  socket.connect();
};
