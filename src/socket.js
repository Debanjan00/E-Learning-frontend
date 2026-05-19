// socket.js

import { io } from "socket.io-client";

const socket = io(
  "https://e-learning-backend-render.onrender.com",
  {
    transports: ["websocket"],

    withCredentials: true,

    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);

export default socket;