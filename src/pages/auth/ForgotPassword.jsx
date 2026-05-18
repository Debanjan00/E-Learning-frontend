import React, {
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaLock,
  FaEnvelope,
  FaRobot,
} from "react-icons/fa";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // SUBMIT
  const submitHandler = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const { data } =
        await axios.post(
          `${server}/api/auth/forgot-password`,
          { email }
        );

      alert(data.message);

      navigate(
        "/reset-password",
        {
          state: { email },
        }
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
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
          Forgot Password
        </h1>

        <p style={styles.subtitle}>
          AI secured password
          recovery ⚡
        </p>

        {/* FORM */}
        <form
          onSubmit={
            submitHandler
          }

          style={styles.form}
        >

          <div style={styles.inputBox}>

            <FaEnvelope
              style={styles.icon}
            />

            <input
              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              style={styles.input}
            />

          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.95,
            }}

            type="submit"

            style={styles.btn}
          >

            <FaLock />

            {loading
              ? "Sending..."
              : "Send OTP"}

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
    maxWidth: "420px",

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

    marginBottom: "30px",
  },

  form: {
    marginTop: "20px",
  },

  inputBox: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    padding:
      "14px 18px",

    borderRadius: "16px",
  },

  icon: {
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

  btn: {
    width: "100%",

    marginTop: "25px",

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
  },
};

export default ForgotPassword;