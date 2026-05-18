import React, {
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaRobot,
  FaKey,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

function Verify() {

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const email =
    location.state?.email;

  // VERIFY OTP
  const submitHandler = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const { data } =
        await axios.post(
          `${server}/api/auth/verify`,
          {
            email,
            otp,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert(data.message);

      navigate("/");

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          "Invalid OTP"
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* CARD */}
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

        {/* ROBOT */}
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

        <h1 style={styles.title}>
          Verify OTP
        </h1>

        <p style={styles.subtitle}>
          Secure AI verification ⚡
        </p>

        {/* EMAIL */}
        <div style={styles.emailBox}>

          <FaEnvelope />

          <span>
            {email}
          </span>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            submitHandler
          }

          style={styles.form}
        >

          {/* OTP */}
          <div style={styles.inputBox}>

            <FaKey
              style={styles.icon}
            />

            <input
              type="text"

              placeholder="Enter OTP"

              value={otp}

              className="futuristic-input"

              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }

              style={styles.input}
            />

          </div>

          {/* VERIFY BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,

              boxShadow:
                "0 0 40px rgba(255,140,0,0.45)",
            }}

            whileTap={{
              scale: 0.95,
            }}

            style={styles.btn}
          >

            <FaShieldAlt />

            {loading
              ? "Verifying..."
              : "Verify OTP"}

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

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    overflow: "hidden",

    position: "relative",

    padding: "20px",
  },

  glow1: {
    position: "absolute",

    top: "-120px",

    left: "-120px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.18)",

    filter: "blur(100px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-120px",

    right: "-120px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.18)",

    filter: "blur(100px)",
  },

  card: {
    width: "100%",
    maxWidth: "430px",

    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(18px)",

    borderRadius: "28px",

    padding: "40px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    textAlign: "center",

    position: "relative",

    zIndex: 2,
  },

  robot: {
    width: "85px",

    height: "85px",

    margin: "auto",

    borderRadius: "24px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    fontSize: "38px",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.4)",
  },

  title: {
    color: "white",

    marginTop: "25px",

    fontSize: "34px",
  },

  subtitle: {
    color: "#aaa",

    marginBottom: "25px",
  },

  emailBox: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    gap: "10px",

    padding: "14px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    color: "#ffb74d",

    marginBottom: "25px",

    fontSize: "14px",

    wordBreak: "break-all",
  },

  form: {
    marginTop: "20px",
  },

  inputBox: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    background:
      "rgba(255,255,255,0.03)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    padding:
      "10px 14px",

    borderRadius: "18px",

    marginBottom: "20px",

    boxShadow:
      "0 0 12px rgba(255,140,0,0.08)",
  },

  icon: {
    color: "#ff9800",

    fontSize: "18px",
  },

  input: {
    flex: 1,

    border: "none",

    outline: "none",

    background:
      "transparent",

    color: "white",

    fontSize: "15px",
  },

  btn: {
    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "18px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",

    transition: "0.3s",
  },
};

export default Verify;