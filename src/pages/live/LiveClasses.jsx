import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import { server }
  from "../../main";

import LiveChat
  from "../../components/live/LiveChat";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaVideo,
  FaBolt,
  FaRobot,
  FaComments,
  FaTrash,
  FaPlay,
  FaCalendarAlt,
  FaUserTie,
  FaBook,
} from "react-icons/fa";

function LiveClasses() {

  const [classes,
    setClasses] =
    useState([]);

  const [user,
    setUser] =
    useState(null);

  const [
    activeChat,
    setActiveChat,
  ] = useState(null);

  const navigate =
    useNavigate();

  const isMobile =
    window.innerWidth <= 768;

  useEffect(() => {

    fetchClasses();

    const u =
      localStorage.getItem(
        "user"
      );

    if (u) {

      setUser(
        JSON.parse(u)
      );
    }

  }, []);

  // FETCH
  const fetchClasses =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/live`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setClasses(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load live classes ❌"
        );
      }
    };

  // JOIN
  const joinClass = (
    link
  ) => {

    if (!link) {

      toast.error(
        "No meeting link ❌"
      );

      return;
    }

    if (
      !link.startsWith(
        "http"
      )
    ) {

      link =
        "https://" +
        link;
    }

    toast.success(
      "Joining live class 🚀"
    );

    window.open(
      link,
      "_blank"
    );
  };

  // END CLASS
  const endClass =
    async (id) => {

      try {

        const confirmDelete =
          window.confirm(
            "End this live class?"
          );

        if (
          !confirmDelete
        )
          return;

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `${server}/api/live/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setClasses(
          classes.filter(
            (c) =>
              c._id !== id
          )
        );

        toast.success(
          "Live class ended ✅"
        );

      } catch (error) {

        console.log(
          error.response?.data
        );

        toast.error(
          "Failed to end class ❌"
        );
      }
    };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

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

            duration: 4,
          }}

          style={styles.logo}
        >

          <FaRobot />

        </motion.div>

        <div>

          <h1 style={styles.title}>
            Live Classes
          </h1>

          <p style={styles.subtitle}>
            Futuristic live
            learning experience ⚡
          </p>

        </div>

      </div>

      {/* CREATE LIVE BUTTON */}
      {(user?.role ===
        "admin" ||
        user?.role ===
          "instructor") && (

          <div
            style={
              styles.topBar
            }
          >

            <button
              style={
                styles.createBtn
              }

              onClick={() =>
                navigate(
                  "/create-live"
                )
              }
            >

              + Create Live Class

            </button>

          </div>
        )}

      {/* EMPTY */}
      {classes.length ===
        0 ? (

        <div style={styles.empty}>

          <FaBolt />

          No live classes
          available

        </div>

      ) : (

        <div style={styles.grid}>

          {classes.map(
            (
              cls,
              index
            ) => (

              <motion.div
                key={
                  cls._id
                }

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index *
                    0.08,
                }}

                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}

                style={
                  styles.card
                }
              >

                {/* TOP */}
                <div
                  style={
                    styles.top
                  }
                >

                  <div
                    style={
                      styles.liveBadge
                    }
                  >

                    🔴 LIVE

                  </div>

                  <div
                    style={
                      styles.iconBox
                    }
                  >

                    <FaVideo />

                  </div>

                </div>

                {/* TITLE */}
                <h2
                  style={
                    styles.cardTitle
                  }
                >

                  {cls.title}

                </h2>

                {/* INFO */}
                <div style={styles.info}>

                  <p style={styles.infoRow}>

                    <FaBook />

                    <span>
                      {cls.course?.title}
                    </span>

                  </p>

                  <p style={styles.infoRow}>

                    <FaUserTie />

                    <span>
                      {
                        cls
                          .instructor
                          ?.name
                      }
                    </span>

                  </p>

                  <p style={styles.infoRow}>

                    <FaCalendarAlt />

                    <span>
                      {new Date(
                        cls.date
                      ).toLocaleString()}
                    </span>

                  </p>

                </div>

                {/* JOIN */}
                <motion.button
                  type="button"

                  whileHover={{
                    scale:
                      1.03,
                  }}

                  whileTap={{
                    scale:
                      0.95,
                  }}

                  style={
                    styles.joinBtn
                  }

                  onClick={() =>
                    joinClass(
                      cls.meetingLink
                    )
                  }
                >

                  <FaPlay />

                  Join Class

                </motion.button>

                {/* CHAT */}
                <button
                  type="button"

                  style={
                    styles.chatBtn
                  }

                  onClick={() =>
                    setActiveChat(
                      activeChat ===
                        cls._id
                        ? null
                        : cls._id
                    )
                  }
                >

                  <FaComments />

                  {activeChat ===
                    cls._id
                    ? "Close Chat"
                    : "Open Chat"}

                </button>

                {/* END */}
                {(user?.role ===
                  "instructor" ||
                  user?.role ===
                    "admin") && (
                    <button
                      type="button"

                      style={
                        styles.endBtn
                      }

                      onClick={() =>
                        endClass(
                          cls._id
                        )
                      }
                    >

                      <FaTrash />

                      End Class

                    </button>
                  )}

                {/* CHAT BOX */}
                <AnimatePresence>

                  {activeChat ===
                    cls._id && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}

                        animate={{
                          opacity: 1,
                          height:
                            "auto",
                        }}

                        exit={{
                          opacity: 0,
                          height: 0,
                        }}

                        transition={{
                          duration: 0.3,
                        }}

                        style={{
                          overflow:
                            "hidden",
                        }}
                      >

                        <div
                          style={
                            styles.chatBox
                          }
                        >

                          <LiveChat
                            classId={
                              cls._id
                            }
                          />

                        </div>

                      </motion.div>
                    )}

                </AnimatePresence>

              </motion.div>
            )
          )}

        </div>
      )}

    </div>
  );
}

const styles = {

  page: {
    minHeight:
      "calc(100vh - 80px)",

    paddingTop:
      window.innerWidth <= 768
        ? "80px"
        : "90px",

    paddingBottom:
      window.innerWidth <= 768
        ? "20px"
        : "40px",

    paddingLeft:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    paddingRight:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflowX: "hidden",

    overflowY: "auto",

    boxSizing:
      "border-box",
  },

  glow1: {
    position: "absolute",

    top: "-100px",

    left: "-100px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-100px",

    right: "-100px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  header: {
    display: "flex",

    flexDirection:
      window.innerWidth <= 768
        ? "column"
        : "row",

    alignItems:
      window.innerWidth <= 768
        ? "flex-start"
        : "center",

    gap:
      window.innerWidth <= 768
        ? "14px"
        : "18px",

    maxWidth: "1200px",

    margin:
      "0 auto 30px auto",

    position: "relative",

    zIndex: 2,
  },

  topBar: {
    display: "flex",

    justifyContent:
      window.innerWidth <= 768
        ? "stretch"
        : "flex-end",

    maxWidth: "1200px",

    margin:
      "0 auto 25px auto",

    position: "relative",

    zIndex: 2,
  },

  createBtn: {
    width:
      window.innerWidth <= 768
        ? "100%"
        : "auto",

    padding:
      window.innerWidth <= 768
        ? "14px"
        : "14px 22px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize:
      window.innerWidth <= 768
        ? "14px"
        : "15px",

    boxShadow:
      "0 0 18px rgba(255,140,0,0.22)",
  },

  logo: {
    width:
      window.innerWidth <= 768
        ? "60px"
        : "70px",

    height:
      window.innerWidth <= 768
        ? "60px"
        : "70px",

    borderRadius: "22px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize:
      window.innerWidth <= 768
        ? "24px"
        : "30px",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.35)",
  },

  title: {
    color: "white",

    margin: 0,

    fontSize:
      window.innerWidth <= 768
        ? "30px"
        : "40px",
  },

  subtitle: {
    marginTop: "5px",

    color: "#aaa",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "15px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      window.innerWidth <= 768
        ? "1fr"
        : "repeat(auto-fit,minmax(280px,320px))",

    justifyContent: "center",

    gap:
      window.innerWidth <= 768
        ? "18px"
        : "25px",

    maxWidth: "1300px",

    margin: "auto",

    position: "relative",

    zIndex: 2,
  },

  card: {
    borderRadius:
      window.innerWidth <= 768
        ? "22px"
        : "28px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",

    padding:
      window.innerWidth <= 768
        ? "18px"
        : "24px",

    overflow: "hidden",
  },

  top: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "20px",
  },

  liveBadge: {
    padding:
      window.innerWidth <= 768
        ? "7px 12px"
        : "8px 14px",

    borderRadius: "12px",

    background:
      "rgba(255,0,0,0.15)",

    color: "#ff4d4d",

    fontWeight: "bold",

    fontSize:
      window.innerWidth <= 768
        ? "11px"
        : "13px",

    border:
      "1px solid rgba(255,0,0,0.2)",
  },

  iconBox: {
    width:
      window.innerWidth <= 768
        ? "48px"
        : "55px",

    height:
      window.innerWidth <= 768
        ? "48px"
        : "55px",

    borderRadius: "18px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize:
      window.innerWidth <= 768
        ? "18px"
        : "22px",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },

  cardTitle: {
    color: "white",

    fontSize:
      window.innerWidth <= 768
        ? "22px"
        : "24px",

    marginBottom: "18px",

    lineHeight: "1.4",
  },

  info: {
    color: "#bbb",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "14px",

    lineHeight: "1.8",

    marginBottom: "22px",
  },

  infoRow: {
    display: "flex",

    alignItems: "center",

    gap: "10px",

    marginBottom: "10px",

    wordBreak: "break-word",
  },

  joinBtn: {
    width: "100%",

    border: "none",

    padding:
      window.innerWidth <= 768
        ? "13px"
        : "14px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: "10px",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "14px",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",
  },

  chatBtn: {
    width: "100%",

    border:
      "1px solid rgba(255,255,255,0.1)",

    padding:
      window.innerWidth <= 768
        ? "13px"
        : "14px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: "10px",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "14px",
  },

  endBtn: {
    width: "100%",

    border: "none",

    padding:
      window.innerWidth <= 768
        ? "13px"
        : "14px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff2d55,#ff0044)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: "10px",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "14px",
  },

  chatBox: {
    marginTop: "18px",

    padding:
      window.innerWidth <= 768
        ? "12px"
        : "16px",

    borderRadius: "18px",

    background:
      "rgba(0,0,0,0.25)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    overflowX: "hidden",
  },

  empty: {
    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "12px",

    fontSize:
      window.innerWidth <= 768
        ? "16px"
        : "20px",

    marginTop: "80px",

    textAlign: "center",

    padding:
      window.innerWidth <= 768
        ? "0 20px"
        : "0",
  },
};

export default LiveClasses;