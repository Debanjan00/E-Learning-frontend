import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaRobot,
  FaPaperPlane,
  FaUserAstronaut,
  FaBolt,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

function AITutor() {

  const [question, setQuestion] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [listening, setListening] =
    useState(false);

  const chatEndRef =
    useRef(null);

  const recognitionRef =
    useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {

    if (chatEndRef.current) {

      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }

  }, [chat, loading]);

  // =========================
  // VOICE TO TEXT
  // =========================
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // CHECK SUPPORT
    if (!SpeechRecognition) {

      alert(
        "Voice recognition not supported in this browser"
      );

      return;
    }

    // STOP OLD SESSION
    if (recognitionRef.current) {

      recognitionRef.current.stop();
    }

    // TOGGLE STOP
    if (listening) {

      setListening(false);

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.start();

    // RESULT
    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0]
          .transcript;

      // APPEND TEXT
      setQuestion((prev) =>
        prev
          ? prev + " " + transcript
          : transcript
      );
    };

    // ERROR
    recognition.onerror = (event) => {

      console.log(
        "Speech error:",
        event.error
      );

      setListening(false);
    };

    // END
    recognition.onend = () => {

      setListening(false);
    };

    recognitionRef.current =
      recognition;
  };

  // =========================
  // ASK AI
  // =========================
  const askAI = async () => {

    if (!question.trim())
      return;

    const token =
      localStorage.getItem(
        "token"
      );

    const userQuestion =
      question;

    // USER MESSAGE
    const newChat = [
      ...chat,
      {
        type: "user",
        text: userQuestion,
      },
    ];

    setChat(newChat);

    setQuestion("");

    setLoading(true);

    try {

      const { data } =
        await axios.post(
          `${server}/api/ai/ask`,
          {
            question:
              userQuestion,
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setChat([
        ...newChat,
        {
          type: "ai",
          text:
            data.answer ||
            "No response",
        },
      ]);

    } catch (error) {

      console.log(error);

      setChat([
        ...newChat,
        {
          type: "ai",
          text:
            "AI error or unauthorized",
        },
      ]);
    }

    setLoading(false);
  };

  // =========================
  // ENTER KEY
  // =========================
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      askAI();
    }
  };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* MAIN */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        style={styles.container}
      >

        {/* HEADER */}
        <div style={styles.header}>

          <motion.div
            animate={{
              rotate: [
                0,
                5,
                -5,
                0,
              ],
            }}

            transition={{
              repeat:
                Infinity,

              duration: 3,
            }}

            style={styles.robot}
          >

            <FaRobot />

          </motion.div>

          <div>

            <h1 style={styles.title}>
              AI Tutor
            </h1>

            <p style={styles.subtitle}>
              Futuristic learning powered by AI ⚡
            </p>

          </div>

        </div>

        {/* CHAT */}
        <div style={styles.chatBox}>

          <AnimatePresence>

            {chat.map(
              (msg, index) => {

                const isUser =
                  msg.type ===
                  "user";

                return (
                  <motion.div
                    key={index}

                    initial={{
                      opacity: 0,
                      x: isUser
                        ? 40
                        : -40,
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
                      display:
                        "flex",

                      justifyContent:
                        isUser
                          ? "flex-end"
                          : "flex-start",

                      marginBottom:
                        "18px",
                    }}
                  >

                    <div
                      style={{
                        ...(isUser
                          ? styles.userMsg
                          : styles.aiMsg),
                      }}
                    >

                      {/* TOP */}
                      <div
                        style={
                          styles.messageTop
                        }
                      >

                        {isUser ? (
                          <>
                            <FaUserAstronaut />
                            You
                          </>
                        ) : (
                          <>
                            <FaBolt />
                            AI Tutor
                          </>
                        )}

                      </div>

                      {/* MESSAGE */}
                      <div
                        style={{
                          whiteSpace:
                            "pre-wrap",

                          lineHeight:
                            "1.9",
                        }}
                      >

                        {msg.text}

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )}

          </AnimatePresence>

          {/* LOADING */}
          {loading && (

            <motion.div
              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              style={{
                display: "flex",
                justifyContent:
                  "flex-start",
              }}
            >

              <div style={styles.aiMsg}>

                <div
                  style={
                    styles.messageTop
                  }
                >

                  <FaBolt />

                  AI Tutor

                </div>

                Thinking...

              </div>

            </motion.div>
          )}

          <div
            ref={chatEndRef}
            style={{
              height: "1px",
            }}
          ></div>

        </div>

        {/* INPUT AREA */}
        <div style={styles.inputBox}>

          {/* INPUT */}
          <input
            type="text"

            autoComplete="off"

            placeholder="Ask futuristic AI anything..."

            value={question || ""}

            onChange={(e) => {

              setQuestion(
                e.target.value
              );
            }}

            onKeyDown={
              handleKeyDown
            }

            style={styles.input}
          />

          {/* MIC BUTTON */}
          <motion.button
            type="button"

            whileHover={{
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={() => {

              startListening();
            }}

            style={{
              ...styles.btn,

              background:
                listening
                  ? "linear-gradient(135deg,#ef4444,#dc2626)"
                  : "linear-gradient(135deg,#ff9800,#ff5e00)",
            }}
          >

            {listening ? (
              <FaMicrophoneSlash />
            ) : (
              <FaMicrophone />
            )}

          </motion.button>

          {/* SEND BUTTON */}
          <motion.button
            type="button"

            whileHover={{
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={() => {

              askAI();
            }}

            style={styles.btn}
          >

            <FaPaperPlane />

          </motion.button>

        </div>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "30px",

    paddingTop: "100px",

    position: "relative",

    overflowX: "hidden",
  },

  glow1: {
    position: "absolute",

    top: "-100px",

    left: "-100px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-100px",

    right: "-100px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  container: {
    width: "100%",

    maxWidth: "1100px",

    height: "calc(100vh - 140px)",

    display: "flex",

    flexDirection: "column",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    borderRadius: "30px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    overflow: "hidden",

    position: "relative",

    zIndex: 2,
  },

  header: {
    display: "flex",

    alignItems: "center",

    gap: "18px",

    padding: "25px 30px",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.03)",
  },

  robot: {
    width: "70px",

    height: "70px",

    borderRadius: "20px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "32px",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.4)",
  },

  title: {
    margin: 0,

    color: "white",

    fontSize: "34px",
  },

  subtitle: {
    margin: 0,

    color: "#aaa",
  },

  chatBox: {
    flex: 1,

    overflowY: "auto",

    padding: "25px",

    scrollBehavior:
      "smooth",
  },

  userMsg: {
    maxWidth: "75%",

    padding: "18px",

    borderRadius: "22px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.25)",
  },

  aiMsg: {
    maxWidth: "80%",

    padding: "18px",

    borderRadius: "22px",

    background:
      "rgba(255,255,255,0.06)",

    color: "white",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  messageTop: {
    display: "flex",

    alignItems: "center",

    gap: "8px",

    marginBottom: "10px",

    fontSize: "13px",

    opacity: 0.8,
  },

  inputBox: {
    display: "flex",

    gap: "14px",

    padding: "22px",

    borderTop:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.03)",
  },

  input: {
    flex: 1,

    minWidth: 0,

    outline: "none",

    fontSize: "15px",

    padding: "18px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",
  },

  btn: {
    width: "65px",

    border: "none",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "20px",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },
};

export default AITutor;