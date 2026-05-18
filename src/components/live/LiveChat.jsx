import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { io } from "socket.io-client";

import { server } from "../../main";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaPaperPlane,
  FaRobot,
} from "react-icons/fa";

function LiveChat({ classId }) {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [socket, setSocket] =
    useState(null);

  const messagesEndRef =
    useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  // SOCKET
  useEffect(() => {

    if (!classId) return;

    const newSocket =
      io(server);

    setSocket(newSocket);

    newSocket.emit(
      "joinRoom",
      classId
    );

    newSocket.on(
      "receiveMessage",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data,
        ]);
      }
    );

    return () => {
      newSocket.disconnect();
    };

  }, [classId]);

  // SEND MESSAGE
  const sendMessage = () => {

    if (
      !message.trim() ||
      !socket
    )
      return;

    socket.emit(
      "sendMessage",
      {
        classId,

        message,

        user:
          user?.name ||
          "Anonymous",
      }
    );

    setMessage("");
  };

  // ENTER KEY
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      style={styles.wrapper}
    >

      {/* HEADER */}
      <div style={styles.header}>

        <div style={styles.liveDot}></div>

        <h3 style={styles.title}>
          Live Class Chat
        </h3>

      </div>

      {/* CHAT AREA */}
      <div style={styles.chatArea}>

        <AnimatePresence>

          {messages.map(
            (m, i) => {

              const isMine =
                m.user ===
                user?.name;

              return (
                <motion.div
                  key={i}

                  initial={{
                    opacity: 0,
                    x: isMine
                      ? 30
                      : -30,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  exit={{
                    opacity: 0,
                  }}

                  transition={{
                    duration: 0.3,
                  }}

                  style={{
                    ...styles.messageRow,

                    justifyContent:
                      isMine
                        ? "flex-end"
                        : "flex-start",
                  }}
                >

                  <div
                    style={{
                      ...styles.messageBox,

                      ...(isMine
                        ? styles.myMessage
                        : styles.otherMessage),
                    }}
                  >

                    <div
                      style={
                        styles.messageUser
                      }
                    >

                      {!isMine && (
                        <FaRobot />
                      )}

                      {m.user}

                    </div>

                    <div>
                      {m.message}
                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </AnimatePresence>

        <div ref={messagesEndRef}></div>

      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>

        <input
          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          placeholder="Send a futuristic message..."

          style={styles.input}
        />

        <motion.button
          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={sendMessage}

          style={styles.sendBtn}
        >

          <FaPaperPlane />

        </motion.button>

      </div>

    </motion.div>
  );
}

const styles = {

  wrapper: {
    marginTop: "20px",

    background:
      "rgba(15,15,15,0.75)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    borderRadius: "24px",

    overflow: "hidden",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",
  },

  header: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    padding: "18px 22px",

    background:
      "linear-gradient(90deg,#ff9800,#ff5e00)",

    color: "white",
  },

  liveDot: {
    width: "12px",

    height: "12px",

    borderRadius: "50%",

    background: "#00ff99",

    boxShadow:
      "0 0 15px #00ff99",
  },

  title: {
    margin: 0,

    fontSize: "18px",
  },

  chatArea: {
    height: "350px",

    overflowY: "auto",

    padding: "20px",

    background:
      "rgba(255,255,255,0.02)",
  },

  messageRow: {
    display: "flex",

    marginBottom: "14px",
  },

  messageBox: {
    maxWidth: "75%",

    padding: "14px 16px",

    borderRadius: "18px",

    color: "white",

    backdropFilter:
      "blur(12px)",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  myMessage: {
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 18px rgba(255,140,0,0.25)",
  },

  otherMessage: {
    background:
      "rgba(255,255,255,0.06)",
  },

  messageUser: {
    fontSize: "12px",

    marginBottom: "6px",

    display: "flex",

    alignItems: "center",

    gap: "6px",

    opacity: 0.8,
  },

  inputArea: {
    display: "flex",

    gap: "12px",

    padding: "18px",

    background:
      "rgba(255,255,255,0.03)",
  },

  input: {
    flex: 1,

    padding: "15px",

    borderRadius: "16px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    outline: "none",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    fontSize: "15px",
  },

  sendBtn: {
    width: "55px",

    height: "55px",

    border: "none",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "18px",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.4)",
  },
};

export default LiveChat;