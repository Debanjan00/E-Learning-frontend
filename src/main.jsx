import React from "react";

import ReactDOM
from "react-dom/client";

import App
from "./App.jsx";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";

import {
  ToastContainer,
} from "react-toastify";

export const server =
  "https://e-learning-backend-render.onrender.com";
 

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(

  <React.StrictMode>

    <App />

    {/* 🔔 TOAST NOTIFICATIONS */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />

  </React.StrictMode>
);