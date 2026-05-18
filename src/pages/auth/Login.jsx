import React, {
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaRobot,
  FaSignInAlt,
} from "react-icons/fa";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // LOGIN
  const submitHandler = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const { data } =
        await axios.post(
          `${server}/api/auth/login`,
          {
            email,
            password,
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
          "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* LOGIN CARD */}
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
          Welcome Back
        </h1>

        <p style={styles.subtitle}>
          Login to your futuristic
          AI learning platform ⚡
        </p>

        {/* FORM */}
        <form
          onSubmit={
            submitHandler
          }

          style={styles.form}
        >

          {/* EMAIL */}
          <div style={styles.inputBox}>

            <FaEnvelope
              style={styles.icon}
            />

            <input
              type="email"

              placeholder="Enter email"

              value={email}

              className="futuristic-input"

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              style={styles.input}
            />

          </div>

          {/* PASSWORD */}
          <div style={styles.inputBox}>

            <FaLock
              style={styles.icon}
            />

            <input
              type="password"

              placeholder="Enter password"

              value={password}

              className="futuristic-input"

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              style={styles.input}
            />

          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,

              boxShadow:
                "0 0 40px rgba(255,140,0,0.45)",
            }}

            whileTap={{
              scale: 0.95,
            }}

            className="common-btn"

            style={styles.btn}
          >

            <FaSignInAlt />

            {loading
              ? "Logging in..."
              : "Login"}

          </motion.button>

        </form>

        {/* FORGOT PASSWORD */}
        <div style={styles.bottom}>

          <Link
            to="/forgot-password"

            style={
              styles.forgot
            }
          >
            Forgot Password?
          </Link>

        </div>

        {/* REGISTER */}
        <div style={styles.registerBox}>

          <p style={styles.registerText}>
            Don't have an account?
          </p>

          <Link
            to="/register"

            style={
              styles.registerLink
            }
          >
            Create Account
          </Link>

        </div>

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

    background:
      "rgba(0,0,0,0.45)",

    border:
      "1px solid rgba(255,140,0,0.25)",

    outline: "none",

    color: "white",

    fontSize: "15px",

    padding: "14px",

    borderRadius: "12px",

    boxShadow:
      "0 0 12px rgba(255,140,0,0.08)",
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

  bottom: {
    marginTop: "20px",
    textAlign: "right",
  },

  forgot: {
    color: "#ff9800",

    textDecoration: "none",

    fontWeight: "bold",
  },

  registerBox: {
    marginTop: "30px",
  },

  registerText: {
    color: "#aaa",
    marginBottom: "8px",
  },

  registerLink: {
    color: "#ff9800",

    textDecoration: "none",

    fontWeight: "bold",
  },
};

export default Login;