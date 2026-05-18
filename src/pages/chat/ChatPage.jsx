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

  const messagesEndRef =
    useRef(null);

  const chatBoxRef =
    useRef(null);

  const recognitionRef =
    useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

        setMessages((prev) => [
          ...prev,
          data,
        ]);
      }
    );

    fetchUsers();

    return () => {

      socket.off(
        "receiveMessage"
      );

      // STOP MIC ON UNMOUNT
      if (
        recognitionRef.current
      ) {

        recognitionRef.current.stop();
      }
    };

  }, []);

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem("token");

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

  // LOAD CHAT
  const loadMessages = async (
    receiverId
  ) => {

    try {

      setSelectedUser(receiverId);

      const token =
        localStorage.getItem("token");

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

      setMessages(data.messages);

    } catch (error) {

      console.log(error);
    }
  };

  // SEND MESSAGE
  const sendMessage = async () => {

    if (
      !message.trim() ||
      !selectedUser
    )
      return;

    try {

      const token =
        localStorage.getItem("token");

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
          senderId: user._id,

          receiverId:
            selectedUser,

          message,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: user._id,

          message,
        },
      ]);

      setMessage("");

    } catch (error) {

      console.log(error);
    }
  };

  // START VOICE
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // NOT SUPPORTED
    if (!SpeechRecognition) {

      alert(
        "Voice recognition not supported in this browser"
      );

      return;
    }

    // STOP OLD SESSION
    if (
      recognitionRef.current
    ) {

      recognitionRef.current.stop();
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    recognitionRef.current =
      recognition;

    // START
    recognition.start();

    setIsListening(true);

    // RESULT
    recognition.onresult = (
      event
    ) => {

      let transcript = "";

      for (
        let i =
          event.resultIndex;
        i <
        event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript;
      }

      setMessage(transcript);
    };

    // END
    recognition.onend = () => {

      setIsListening(false);
    };

    // ERROR
    recognition.onerror = (
      e
    ) => {

      console.log(
        "Speech error:",
        e.error
      );

      setIsListening(false);

      // AUTO FIX
      if (
        e.error === "network"
      ) {

        alert(
          "Microphone blocked or internet issue"
        );
      }
    };
  };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      <div style={styles.container}>

        {/* SIDEBAR */}
        <div style={styles.sidebar}>

          <div style={styles.sideHeader}>

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
              }}

              onClick={() =>
                loadMessages(
                  u._id
                )
              }
            >

              <div style={styles.avatar}>

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
                      "13px",
                  }}
                >
                  {u.role}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* CHAT AREA */}
        <div style={styles.chatArea}>

          {/* HEADER */}
          <div style={styles.chatHeader}>

            <h3>
              {selectedUser
                ? "Live Chat ⚡"
                : "Select a user"}
            </h3>

          </div>

          {/* CHAT BOX */}
          <div
            ref={chatBoxRef}
            style={styles.chatBox}
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
                      ? styles.myMessage
                      : styles.otherMessage
                  }
                >

                  {msg.message}

                </motion.div>
              )
            )}

            <div
              ref={
                messagesEndRef
              }
              style={{
                height: "1px",
              }}
            ></div>

          </div>

          {/* INPUT */}
          <div style={styles.bottom}>

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

              style={
                styles.input
              }
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

              style={
                styles.sendBtn
              }
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
    height: "90vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    paddingTop: "120px",

    paddingLeft: "30px",

    paddingRight: "30px",

    paddingBottom: "30px",

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

    height:
      "calc(100vh - 160px)",

    borderRadius:
      "30px",

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
    width: "320px",

    borderRight:
      "1px solid rgba(255,255,255,0.06)",

    padding: "20px",

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
      "25px",

    fontSize: "22px",
  },

  userCard: {
    padding: "16px",

    borderRadius:
      "18px",

    marginBottom:
      "14px",

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
    width: "50px",

    height: "50px",

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

    fontSize: "20px",
  },

  chatArea: {
    flex: 1,

    display: "flex",

    flexDirection:
      "column",
  },

  chatHeader: {
    padding: "22px",

    borderBottom:
      "1px solid rgba(255,255,255,0.06)",

    color: "white",

    background:
      "rgba(255,255,255,0.03)",
  },

  chatBox: {
    flex: 1,

    padding: "25px",

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

    maxWidth: "70%",

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

    maxWidth: "70%",

    border:
      "1px solid rgba(255,255,255,0.08)",

    wordBreak:
      "break-word",
  },

  bottom: {
    display: "flex",

    padding: "20px",

    gap: "12px",

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
      "transparent",

    color: "white",

    fontSize: "16px",

    paddingLeft: "10px",
  },

  sendBtn: {
    width: "60px",

    border: "none",

    borderRadius:
      "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "18px",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",
  },
};

export default ChatPage;