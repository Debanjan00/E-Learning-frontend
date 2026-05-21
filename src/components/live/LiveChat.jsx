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

  const isMobile =
    window.innerWidth <= 768;

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

      style={{
        ...styles.wrapper,

        borderRadius:
          isMobile
            ? "18px"
            : "24px",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          ...styles.header,

          padding: isMobile
            ? "14px 16px"
            : "18px 22px",
        }}
      >

        <div style={styles.liveDot}></div>

        <h3
          style={{
            ...styles.title,

            fontSize: isMobile
              ? "15px"
              : "18px",
          }}
        >
          Live Class Chat
        </h3>

      </div>

      {/* CHAT AREA */}
      <div
        style={{
          ...styles.chatArea,

          height: isMobile
            ? "300px"
            : "350px",

          padding: isMobile
            ? "14px"
            : "20px",
        }}
      >

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

                      maxWidth:
                        isMobile
                          ? "88%"
                          : "75%",

                      padding:
                        isMobile
                          ? "12px 14px"
                          : "14px 16px",

                      fontSize:
                        isMobile
                          ? "13px"
                          : "15px",

                      ...(isMine
                        ? styles.myMessage
                        : styles.otherMessage),
                    }}
                  >

                    <div
                      style={{
                        ...styles.messageUser,

                        fontSize:
                          isMobile
                            ? "11px"
                            : "12px",
                      }}
                    >

                      {!isMine && (
                        <FaRobot />
                      )}

                      {m.user}

                    </div>

                    <div
                      style={{
                        wordBreak:
                          "break-word",
                      }}
                    >
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
      <div
        style={{
          ...styles.inputArea,

          gap: isMobile
            ? "8px"
            : "12px",

          padding: isMobile
            ? "12px"
            : "18px",
        }}
      >

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

          style={{
            ...styles.input,

            padding: isMobile
              ? "13px"
              : "15px",

            fontSize: isMobile
              ? "14px"
              : "15px",

            borderRadius:
              isMobile
                ? "14px"
                : "16px",
          }}
        />

        <motion.button
          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={sendMessage}

          style={{
            ...styles.sendBtn,

            width: isMobile
              ? "48px"
              : "55px",

            height: isMobile
              ? "48px"
              : "55px",

            fontSize: isMobile
              ? "16px"
              : "18px",

            borderRadius:
              isMobile
                ? "14px"
                : "18px",
          }}
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

    overflow: "hidden",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    width: "100%",

    boxSizing:
      "border-box",
  },

  header: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

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

    flexShrink: 0,
  },

  title: {
    margin: 0,
  },

  chatArea: {
    overflowY: "auto",

    background:
      "rgba(255,255,255,0.02)",
  },

  messageRow: {
    display: "flex",

    marginBottom: "14px",

    width: "100%",
  },

  messageBox: {
    borderRadius: "18px",

    color: "white",

    backdropFilter:
      "blur(12px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    overflowWrap:
      "break-word",
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
    marginBottom: "6px",

    display: "flex",

    alignItems: "center",

    gap: "6px",

    opacity: 0.8,
  },

  inputArea: {
    display: "flex",

    alignItems: "center",

    background:
      "rgba(255,255,255,0.03)",
  },

  input: {
    flex: 1,

    border:
      "1px solid rgba(255,140,0,0.2)",

    outline: "none",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    width: "100%",

    boxSizing:
      "border-box",
  },

  sendBtn: {
    border: "none",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.4)",

    flexShrink: 0,
  },
};

export default LiveChat;