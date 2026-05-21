import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import axios from "axios";

import { server } from "../../main";

import socket from "../../socket";

import {
  motion,
} from "framer-motion";

import {
  FaPaperPlane,
  FaRobot,
  FaUserAstronaut,
  FaMicrophone,
} from "react-icons/fa";

function ChatPage() {

  const [users, setUsers] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [isListening, setIsListening] =
    useState(false);

  const chatBoxRef =
    useRef(null);

  const recognitionRef =
    useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isMobile =
    window.innerWidth <= 768;

  // AUTO SCROLL
  useEffect(() => {

    if (
      chatBoxRef.current
    ) {

      chatBoxRef.current.scrollTop =
        chatBoxRef.current.scrollHeight;
    }

  }, [messages]);

  // SOCKET
  useEffect(() => {

    if (user?._id) {

      socket.emit(
        "join",
        user._id
      );
    }

    socket.on(
      "receiveMessage",
      (data) => {

        setMessages((prev) => {

          const exists =
            prev.some(
              (msg) =>
                msg.message ===
                  data.message &&
                (
                  msg.sender ===
                    data.senderId ||
                  msg.senderId ===
                    data.senderId
                )
            );

          if (exists)
            return prev;

          return [
            ...prev,
            {
              sender:
                data.senderId,

              message:
                data.message,
            },
          ];
        });
      }
    );

    fetchUsers();

    return () => {

      socket.off(
        "receiveMessage"
      );

      if (
        recognitionRef.current
      ) {

        recognitionRef.current.stop();
      }
    };

  }, []);

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/chat/users/all`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUsers(data.users);

      } catch (error) {

        console.log(error);
      }
    };

  // LOAD MESSAGES
  const loadMessages =
    async (receiverId) => {

      try {

        setSelectedUser(
          receiverId
        );

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/chat/${receiverId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMessages(
          data.messages
        );

      } catch (error) {

        console.log(error);
      }
    };

  // SEND MESSAGE
  const sendMessage =
    async () => {

      if (
        !message.trim() ||
        !selectedUser
      )
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          `${server}/api/chat/send`,
          {
            receiverId:
              selectedUser,

            message,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        socket.emit(
          "sendMessage",
          {
            senderId:
              user._id,

            receiverId:
              selectedUser,

            message,
          }
        );

        setMessages(
          (prev) => [
            ...prev,
            {
              sender:
                user._id,

              message,
            },
          ]
        );

        setMessage("");

      } catch (error) {

        console.log(error);
      }
    };

  // VOICE
  const startListening =
    () => {

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {

        alert(
          "Voice recognition not supported"
        );

        return;
      }

      if (
        recognitionRef.current
      ) {

        recognitionRef.current.stop();
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.continuous =
        false;

      recognition.interimResults =
        true;

      recognition.maxAlternatives =
        1;

      recognitionRef.current =
        recognition;

      recognition.start();

      setIsListening(true);

      recognition.onresult =
        (event) => {

          let transcript =
            "";

          for (
            let i =
              event.resultIndex;
            i <
            event.results
              .length;
            i++
          ) {

            transcript +=
              event.results[
                i
              ][0]
                .transcript;
          }

          setMessage(
            transcript
          );
        };

      recognition.onend =
        () => {

          setIsListening(
            false
          );
        };

      recognition.onerror =
        (e) => {

          console.log(
            "Speech error:",
            e.error
          );

          setIsListening(
            false
          );
        };
    };

  return (
    <div
      style={{
        ...styles.page,

        paddingTop:
          isMobile
            ? "85px"
            : "120px",

        paddingLeft:
          isMobile
            ? "10px"
            : "30px",

        paddingRight:
          isMobile
            ? "10px"
            : "30px",

        paddingBottom:
          isMobile
            ? "10px"
            : "30px",
      }}
    >

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* CONTAINER */}
      <div
        style={{
          ...styles.container,

          flexDirection:
            isMobile
              ? "column"
              : "row",

          height:
            isMobile
              ? "auto"
              : "calc(100vh - 160px)",

          minHeight:
            isMobile
              ? "calc(100vh - 100px)"
              : "auto",

          borderRadius:
            isMobile
              ? "20px"
              : "30px",
        }}
      >

        {/* SIDEBAR */}
        <div
          style={{
            ...styles.sidebar,

            width:
              isMobile
                ? "100%"
                : "320px",

            maxHeight:
              isMobile
                ? "220px"
                : "100%",

            borderRight:
              isMobile
                ? "none"
                : "1px solid rgba(255,255,255,0.06)",

            borderBottom:
              isMobile
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",

            padding:
              isMobile
                ? "14px"
                : "20px",
          }}
        >

          <div
            style={{
              ...styles.sideHeader,

              fontSize:
                isMobile
                  ? "18px"
                  : "22px",
            }}
          >

            <FaRobot />

            <h2>
              Chats
            </h2>

          </div>

          {users.map((u) => (

            <motion.div
              whileHover={{
                scale: 1.03,
              }}

              key={u._id}

              style={{
                ...styles.userCard,

                background:
                  selectedUser ===
                    u._id
                    ? "linear-gradient(135deg,#ff9800,#ff5e00)"
                    : "rgba(255,255,255,0.04)",

                padding:
                  isMobile
                    ? "12px"
                    : "16px",
              }}

              onClick={() =>
                loadMessages(
                  u._id
                )
              }
            >

              <div
                style={{
                  ...styles.avatar,

                  width:
                    isMobile
                      ? "42px"
                      : "50px",

                  height:
                    isMobile
                      ? "42px"
                      : "50px",

                  fontSize:
                    isMobile
                      ? "17px"
                      : "20px",
                }}
              >

                <FaUserAstronaut />

              </div>

              <div>

                <h4
                  style={{
                    margin: 0,
                    color:
                      "white",
                  }}
                >
                  {u.name}
                </h4>

                <p
                  style={{
                    margin: 0,
                    color:
                      "#aaa",

                    fontSize:
                      isMobile
                        ? "12px"
                        : "13px",
                  }}
                >
                  {u.role}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* CHAT AREA */}
        <div
          style={
            styles.chatArea
          }
        >

          {/* HEADER */}
          <div
            style={{
              ...styles.chatHeader,

              padding:
                isMobile
                  ? "16px"
                  : "22px",
            }}
          >

            <h3
              style={{
                margin: 0,
                fontSize:
                  isMobile
                    ? "16px"
                    : "20px",
              }}
            >
              {selectedUser
                ? "Live Chat ⚡"
                : "Select a user"}
            </h3>

          </div>

          {/* CHAT BOX */}
          <div
            ref={chatBoxRef}
            style={{
              ...styles.chatBox,

              padding:
                isMobile
                  ? "14px"
                  : "25px",

              minHeight:
                isMobile
                  ? "300px"
                  : "auto",
            }}
          >

            {messages.map(
              (
                msg,
                index
              ) => (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  key={index}

                  style={
                    msg.sender ===
                      user._id
                      ? {
                          ...styles.myMessage,

                          maxWidth:
                            isMobile
                              ? "85%"
                              : "70%",

                          fontSize:
                            isMobile
                              ? "14px"
                              : "15px",
                        }
                      : {
                          ...styles.otherMessage,

                          maxWidth:
                            isMobile
                              ? "85%"
                              : "70%",

                          fontSize:
                            isMobile
                              ? "14px"
                              : "15px",
                        }
                  }
                >

                  {msg.message}

                </motion.div>
              )
            )}

          </div>

          {/* INPUT */}
          <div
            style={{
              ...styles.bottom,

              padding:
                isMobile
                  ? "12px"
                  : "20px",

              gap:
                isMobile
                  ? "8px"
                  : "12px",
            }}
          >

            <input
              type="text"

              placeholder="Speak or type message..."

              value={message}

              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }

              onKeyDown={(
                e
              ) => {

                if (
                  e.key ===
                  "Enter"
                ) {

                  e.preventDefault();

                  sendMessage();
                }
              }}

              style={{
                ...styles.input,

                fontSize:
                  isMobile
                    ? "14px"
                    : "16px",
              }}
            />

            {/* MIC */}
            <motion.button
              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={
                startListening
              }

              style={{
                ...styles.sendBtn,

                width:
                  isMobile
                    ? "50px"
                    : "60px",

                height:
                  isMobile
                    ? "50px"
                    : "60px",

                fontSize:
                  isMobile
                    ? "16px"
                    : "18px",

                background:
                  isListening
                    ? "red"
                    : "linear-gradient(135deg,#ff9800,#ff5e00)",
              }}
            >

              <FaMicrophone />

            </motion.button>

            {/* SEND */}
            <motion.button
              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={(
                e
              ) => {

                e.preventDefault();

                sendMessage();
              }}

              style={{
                ...styles.sendBtn,

                width:
                  isMobile
                    ? "50px"
                    : "60px",

                height:
                  isMobile
                    ? "50px"
                    : "60px",

                fontSize:
                  isMobile
                    ? "16px"
                    : "18px",
              }}
            >

              <FaPaperPlane />

            </motion.button>

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflowX: "hidden",

    boxSizing:
      "border-box",
  },

  glow1: {
    position:
      "absolute",

    top: "-100px",

    left: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter:
      "blur(90px)",
  },

  glow2: {
    position:
      "absolute",

    bottom: "-100px",

    right: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter:
      "blur(90px)",
  },

  container: {
    display: "flex",

    overflow: "hidden",

    backdropFilter:
      "blur(18px)",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    position:
      "relative",

    zIndex: 2,
  },

  sidebar: {
    overflowY: "auto",

    background:
      "rgba(255,255,255,0.03)",
  },

  sideHeader: {
    display: "flex",

    alignItems:
      "center",

    gap: "12px",

    color: "white",

    marginBottom:
      "20px",
  },

  userCard: {
    borderRadius:
      "18px",

    marginBottom:
      "12px",

    cursor: "pointer",

    display: "flex",

    alignItems:
      "center",

    gap: "14px",

    transition:
      "0.3s",

    border:
      "1px solid rgba(255,140,0,0.12)",
  },

  avatar: {
    borderRadius:
      "16px",

    display: "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",
  },

  chatArea: {
    flex: 1,

    display: "flex",

    flexDirection:
      "column",

    minHeight: 0,
  },

  chatHeader: {
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",

    color: "white",

    background:
      "rgba(255,255,255,0.03)",
  },

  chatBox: {
    flex: 1,

    overflowY: "auto",

    scrollBehavior:
      "smooth",
  },

  myMessage: {
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    padding:
      "14px 18px",

    borderRadius:
      "20px",

    width: "fit-content",

    marginLeft:
      "auto",

    marginTop: "12px",

    wordBreak:
      "break-word",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.25)",
  },

  otherMessage: {
    background:
      "rgba(255,255,255,0.06)",

    color: "white",

    padding:
      "14px 18px",

    borderRadius:
      "20px",

    width: "fit-content",

    marginTop: "12px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    wordBreak:
      "break-word",
  },

  bottom: {
    display: "flex",

    borderTop:
      "1px solid rgba(255,255,255,0.06)",

    background:
      "rgba(255,255,255,0.03)",
  },

  input: {
    flex: 1,

    border: "none",

    outline: "none",

    background:
      "rgba(255,255,255,0.06)",

    color: "white",

    paddingLeft: "14px",

    borderRadius:
      "14px",
  },

  sendBtn: {
    border: "none",

    borderRadius:
      "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",

    flexShrink: 0,
  },
};

export default ChatPage;