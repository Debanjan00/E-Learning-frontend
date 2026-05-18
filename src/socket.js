import { io } from "socket.io-client";

const socket = io(
  "https://e-learning-backend-iota.vercel.app"
);

export default socket;
