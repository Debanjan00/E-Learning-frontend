import React, {
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaVideo,
  FaUpload,
  FaBolt,
  FaRobot,
} from "react-icons/fa";

function AddLecture() {

  const [title, setTitle] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  // SUBMIT
  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "video",
          video
        );

        const { data } =
          await axios.post(
            `${server}/api/lecture/create/${id}`,
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        alert(
          data.message
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to upload lecture ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        style={styles.card}
      >

        {/* ICON */}
        <motion.div
          animate={{
            rotate: [
              0,
              6,
              -6,
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

        {/* TITLE */}
        <h1 style={styles.title}>
          Add Lecture
        </h1>

        <p style={styles.subtitle}>
          Upload futuristic
          AI-powered learning
          videos ⚡
        </p>

        {/* FORM */}
        <form
          onSubmit={
            submitHandler
          }
        >

          {/* TITLE */}
          <div
            style={
              styles.inputBox
            }
          >

            <FaBolt
              style={
                styles.inputIcon
              }
            />

            <input
              type="text"

              placeholder="Lecture Title"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              style={
                styles.input
              }

              required
            />

          </div>

          {/* FILE */}
          <div
            style={
              styles.uploadBox
            }
          >

            <FaVideo
              style={
                styles.uploadIcon
              }
            />

            <label
              style={
                styles.uploadLabel
              }
            >

              {video
                ? video.name
                : "Choose Lecture Video"}

              <input
                type="file"

                accept="video/*"

                onChange={(e) =>
                  setVideo(
                    e.target
                      .files[0]
                  )
                }

                style={{
                  display:
                    "none",
                }}

                required
              />

            </label>

          </div>

          {/* BUTTON */}
          <motion.button
            type="submit"

            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.95,
            }}

            style={
              styles.btn
            }

            disabled={
              loading
            }
          >

            <FaUpload />

            {loading
              ? "Uploading..."
              : "Upload Lecture"}

          </motion.button>

        </form>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    padding: "30px",

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
      "rgba(255,140,0,0.18)",

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
      "rgba(255,94,0,0.18)",

    filter: "blur(90px)",
  },

  card: {
    width: "100%",

    maxWidth: "480px",

    padding: "40px",

    borderRadius: "30px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 40px rgba(255,140,0,0.08)",

    position: "relative",

    zIndex: 2,
  },

  logo: {
    width: "85px",

    height: "85px",

    borderRadius: "26px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    margin:
      "0 auto 24px auto",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "38px",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },

  title: {
    textAlign: "center",

    color: "white",

    fontSize: "42px",

    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",

    color: "#aaa",

    marginBottom: "35px",

    lineHeight: "1.7",
  },

  inputBox: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    marginBottom: "18px",

    padding:
      "14px 18px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  inputIcon: {
    color: "#ff9800",

    fontSize: "18px",
  },

  input: {
    flex: 1,

    background:
      "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "15px",
  },

  uploadBox: {
    display: "flex",

    alignItems: "center",

    gap: "14px",

    marginBottom: "24px",

    padding:
      "16px 18px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px dashed rgba(255,140,0,0.35)",
  },

  uploadIcon: {
    color: "#ff9800",

    fontSize: "22px",
  },

  uploadLabel: {
    color: "#ddd",

    cursor: "pointer",

    fontSize: "15px",
  },

  btn: {
    width: "100%",

    border: "none",

    padding: "16px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.35)",
  },
};

export default AddLecture;