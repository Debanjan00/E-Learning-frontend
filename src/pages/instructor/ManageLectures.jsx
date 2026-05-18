import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useParams,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaTrash,
  FaVideo,
  FaRobot,
  FaBolt,
  FaPlay,
} from "react-icons/fa";

function ManageLectures() {

  const [lectures, setLectures] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { id } =
    useParams();

  useEffect(() => {

    fetchLectures();

  }, []);

  // FETCH
  const fetchLectures =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/lecture/${id}`
          );

        setLectures(
          data.lectures
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // DELETE
  const deleteLecture =
    async (
      lectureId
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const confirmDelete =
          window.confirm(
            "Delete this lecture?"
          );

        if (
          !confirmDelete
        )
          return;

        await axios.delete(
          `${server}/api/lecture/${lectureId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setLectures(
          lectures.filter(
            (
              lecture
            ) =>
              lecture._id !==
              lectureId
          )
        );

        alert(
          "Lecture deleted ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed ❌"
        );
      }
    };

  // LOADING
  if (loading) {

    return (
      <div style={styles.loading}>

        <motion.div
          animate={{
            rotate: 360,
          }}

          transition={{
            repeat:
              Infinity,

            duration: 1,

            ease: "linear",
          }}

          style={styles.loader}
        >

          <FaRobot />

        </motion.div>

      </div>
    );
  }

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
            Manage Lectures
          </h1>

          <p style={styles.subtitle}>
            AI-powered futuristic
            lecture management ⚡
          </p>

        </div>

      </div>

      {/* EMPTY */}
      {lectures.length ===
      0 ? (

        <div style={styles.empty}>

          <FaBolt />

          No lectures found

        </div>

      ) : (

        <div style={styles.grid}>

          <AnimatePresence>

            {lectures.map(
              (
                lecture,
                index
              ) => (

                <motion.div
                  key={
                    lecture._id
                  }

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  exit={{
                    opacity: 0,
                    scale: 0.8,
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
                        styles.videoIcon
                      }
                    >

                      <FaVideo />

                    </div>

                    <div
                      style={
                        styles.badge
                      }
                    >

                      LIVE VIDEO

                    </div>

                  </div>

                  {/* TITLE */}
                  <h2
                    style={
                      styles.cardTitle
                    }
                  >

                    {
                      lecture.title
                    }

                  </h2>

                  {/* ACTIONS */}
                  <div
                    style={
                      styles.actions
                    }
                  >

                    {/* PLAY */}
                    <motion.a
                      whileHover={{
                        scale:
                          1.03,
                      }}

                      whileTap={{
                        scale:
                          0.95,
                      }}

                      href={
                        lecture.videoUrl
                      }

                      target="_blank"

                      rel="noreferrer"

                      style={
                        styles.playBtn
                      }
                    >

                      <FaPlay />

                      Watch

                    </motion.a>

                    {/* DELETE */}
                    <motion.button
                      whileHover={{
                        scale:
                          1.03,
                      }}

                      whileTap={{
                        scale:
                          0.95,
                      }}

                      style={
                        styles.deleteBtn
                      }

                      onClick={() =>
                        deleteLecture(
                          lecture._id
                        )
                      }
                    >

                      <FaTrash />

                      Delete

                    </motion.button>

                  </div>

                </motion.div>
              )
            )}

          </AnimatePresence>

        </div>
      )}

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    padding:
      "40px 30px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflow: "hidden",
  },

  glow1: {
    position: "absolute",

    top: "-120px",

    left: "-120px",

    width: "320px",

    height: "320px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-120px",

    right: "-120px",

    width: "320px",

    height: "320px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  header: {
    display: "flex",

    alignItems: "center",

    gap: "20px",

    marginBottom: "40px",

    position: "relative",

    zIndex: 2,
  },

  logo: {
    width: "80px",

    height: "80px",

    borderRadius: "24px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "34px",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },

  title: {
    color: "white",

    fontSize: "42px",

    marginBottom: "6px",
  },

  subtitle: {
    color: "#aaa",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "25px",

    position: "relative",

    zIndex: 2,
  },

  card: {
    padding: "26px",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  top: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "22px",
  },

  videoIcon: {
    width: "65px",

    height: "65px",

    borderRadius: "20px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "26px",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },

  badge: {
    padding:
      "8px 14px",

    borderRadius: "12px",

    background:
      "rgba(255,140,0,0.12)",

    color: "#ffb347",

    fontWeight: "bold",

    fontSize: "12px",

    border:
      "1px solid rgba(255,140,0,0.2)",
  },

  cardTitle: {
    color: "white",

    fontSize: "24px",

    marginBottom: "28px",

    lineHeight: "1.4",
  },

  actions: {
    display: "flex",

    gap: "12px",
  },

  playBtn: {
    flex: 1,

    textDecoration:
      "none",

    border: "none",

    padding: "14px",

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

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",
  },

  deleteBtn: {
    flex: 1,

    border: "none",

    padding: "14px",

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
  },

  empty: {
    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "12px",

    color: "#aaa",

    padding: "30px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    fontSize: "18px",

    position: "relative",

    zIndex: 2,
  },

  loading: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
  },

  loader: {
    width: "90px",

    height: "90px",

    borderRadius: "28px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "40px",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },
};

export default ManageLectures;