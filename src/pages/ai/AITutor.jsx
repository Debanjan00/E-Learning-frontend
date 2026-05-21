import React, {
  useState,
  useRef,
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

  const recognitionRef =
    useRef(null);

  const isMobile =
    window.innerWidth <= 768;

  // =========================
  // VOICE TO TEXT
  // =========================
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice recognition not supported in this browser"
      );

      return;
    }

    if (recognitionRef.current) {

      recognitionRef.current.stop();
    }

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

    recognition.onresult =
      (event) => {

        const transcript =
          event.results[0][0]
            .transcript;

        setQuestion((prev) =>
          prev
            ? prev +
              " " +
              transcript
            : transcript
        );
      };

    recognition.onerror =
      (event) => {

        console.log(
          "Speech error:",
          event.error
        );

        setListening(false);
      };

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
    <div
      style={{
        ...styles.page,

        padding: isMobile
          ? "12px"
          : "20px",

        paddingTop: isMobile
          ? "90px"
          : "100px",
      }}
    >

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

        style={{
          ...styles.container,

          borderRadius:
            isMobile
              ? "22px"
              : "30px",

          height: "auto",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            ...styles.header,

            gap: isMobile
              ? "12px"
              : "18px",

            padding: isMobile
              ? "16px"
              : "25px 30px",
          }}
        >

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

            style={{
              ...styles.robot,

              width: isMobile
                ? "55px"
                : "70px",

              height: isMobile
                ? "55px"
                : "70px",

              fontSize:
                isMobile
                  ? "24px"
                  : "32px",
            }}
          >

            <FaRobot />

          </motion.div>

          <div>

            <h1
              style={{
                ...styles.title,

                fontSize:
                  isMobile
                    ? "24px"
                    : "34px",
              }}
            >
              AI Tutor
            </h1>

            <p
              style={{
                ...styles.subtitle,

                fontSize:
                  isMobile
                    ? "12px"
                    : "14px",
              }}
            >
              Futuristic learning powered by AI ⚡
            </p>

          </div>

        </div>

        {/* CHAT */}
        <div
          style={{
            ...styles.chatBox,

            padding: isMobile
              ? "14px"
              : "25px",
          }}
        >

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

                        maxWidth:
                          isMobile
                            ? "92%"
                            : isUser
                            ? "75%"
                            : "80%",

                        padding:
                          isMobile
                            ? "14px"
                            : "18px",

                        borderRadius:
                          isMobile
                            ? "18px"
                            : "22px",

                        fontSize:
                          isMobile
                            ? "14px"
                            : "15px",
                      }}
                    >

                      {/* TOP */}
                      <div
                        style={{
                          ...styles.messageTop,

                          fontSize:
                            isMobile
                              ? "11px"
                              : "13px",
                        }}
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
                            "1.8",

                          wordBreak:
                            "break-word",
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

              <div
                style={{
                  ...styles.aiMsg,

                  maxWidth:
                    isMobile
                      ? "92%"
                      : "80%",

                  padding:
                    isMobile
                      ? "14px"
                      : "18px",
                }}
              >

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

        </div>

        {/* INPUT AREA */}
        <div
          style={{
            ...styles.inputBox,

            gap: isMobile
              ? "8px"
              : "14px",

            padding: isMobile
              ? "12px"
              : "22px",
          }}
        >

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

            style={{
              ...styles.input,

              fontSize:
                isMobile
                  ? "14px"
                  : "15px",

              padding:
                isMobile
                  ? "14px"
                  : "18px",

              borderRadius:
                isMobile
                  ? "14px"
                  : "18px",
            }}
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

              width: isMobile
                ? "50px"
                : "65px",

              height: isMobile
                ? "50px"
                : "65px",

              fontSize:
                isMobile
                  ? "16px"
                  : "20px",

              borderRadius:
                isMobile
                  ? "14px"
                  : "18px",

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

            style={{
              ...styles.btn,

              width: isMobile
                ? "50px"
                : "65px",

              height: isMobile
                ? "50px"
                : "65px",

              fontSize:
                isMobile
                  ? "16px"
                  : "20px",

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

    alignItems: "flex-start",

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

    display: "flex",

    flexDirection: "column",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

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

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.03)",
  },

  robot: {
    borderRadius: "20px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.4)",
  },

  title: {
    margin: 0,

    color: "white",
  },

  subtitle: {
    margin: 0,

    color: "#aaa",
  },

  chatBox: {
    paddingBottom: "10px",

    minHeight: "0px",
  },

  userMsg: {
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.25)",
  },

  aiMsg: {
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

    opacity: 0.8,
  },

  inputBox: {
    display: "flex",

    borderTop:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.03)",

    position: "sticky",

    bottom: 0,

    backdropFilter:
      "blur(18px)",
  },

  input: {
    flex: 1,

    minWidth: 0,

    outline: "none",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",
  },

  btn: {
    border: "none",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",

    flexShrink: 0,
  },
};

export default AITutor;