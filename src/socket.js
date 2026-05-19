// socket.js

import { io } from "socket.io-client";

const socket = io(
  "https://e-learning-backend-render.onrender.com",
  "https://e-learning-backend-iota.vercel.app",
  {
    transports: ["websocket"],

    withCredentials: true,

    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);

export default socket;