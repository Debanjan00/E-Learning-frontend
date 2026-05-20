import React from "react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaRobot,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Footer() {

  return (
    <div style={styles.footer}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      <div style={styles.container}>

        {/* BRAND */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}
        >

          <div style={styles.logoBox}>

            <div style={styles.logoIcon}>
              👩🏻‍💻
            </div>

            <div>
              <h1 style={styles.logo}>
                E-Learning
              </h1>

              <p style={styles.tagline}>
                Smart AI Learning Platform
              </p>
            </div>

          </div>

          <p style={styles.description}>
            Experience futuristic
            AI-powered learning with
            live classes, smart
            tutoring, real-time chat,
            and immersive education.
          </p>

        </motion.div>

        {/* FEATURES */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          style={styles.featureBox}
        >

          <div style={styles.featureCard}>
            <FaRobot />

            <span>
              AI Tutor
            </span>
          </div>

          <div style={styles.featureCard}>
            <FaGraduationCap />

            <span>
              Smart Courses
            </span>
          </div>

          <div style={styles.featureCard}>
            <FaRocket />

            <span>
              Live Learning
            </span>
          </div>

        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
          }}

          style={styles.icons}
        >

          <motion.a
            whileHover={{
              scale: 1.2,
              y: -5,
            }}

            href="https://wa.me/919907667450"

            target="_blank"

            rel="noreferrer"

            style={styles.icon}
          >

            <FaWhatsapp />

          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.2,
              y: -5,
            }}

            href="https://instagram.com/ig_debanjan26"

            target="_blank"

            rel="noreferrer"

            style={styles.icon}
          >

            <FaInstagram />

          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.2,
              y: -5,
            }}

            href="https://facebook.com/yourprofile"

            target="_blank"

            rel="noreferrer"

            style={styles.icon}
          >

            <FaFacebook />

          </motion.a>

        </motion.div>

        {/* CREDIT */}
        <motion.div
          initial={{
            opacity: 0,
          }}

          whileInView={{
            opacity: 1,
          }}

          transition={{
            delay: 0.3,
            duration: 1,
          }}
        >

          <h2 style={styles.madeBy}>
            Made By Debanjan ⚡
          </h2>

          <p style={styles.copy}>
            ©{" "}
            {new Date().getFullYear()}
            {" "}
            E-Learning — All rights
            reserved
          </p>

        </motion.div>
      </div>
    </div>
  );
}

const styles = {

  footer: {
    position: "relative",

    overflow: "hidden",

    background:
      "linear-gradient(180deg,#0d0d0d,#111827)",

    padding:
      "80px 20px 40px",

    marginTop: "80px",

    borderTop:
      "1px solid rgba(255,140,0,0.2)",
  },

  glow1: {
    position: "absolute",

    top: "-120px",

    left: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-120px",

    right: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  container: {
    position: "relative",

    zIndex: 2,

    maxWidth: "1200px",

    margin: "auto",

    textAlign: "center",
  },

  logoBox: {
    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "15px",
  },

  logoIcon: {
    width: "60px",

    height: "60px",

    borderRadius: "18px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "28px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.5)",
  },

  logo: {
    margin: 0,

    color: "white",

    fontSize: "38px",

    fontWeight: "800",

    letterSpacing: "1px",
  },

  tagline: {
    margin: 0,

    color: "#aaa",

    fontSize: "14px",
  },

  description: {
    maxWidth: "700px",

    margin:
      "30px auto",

    color: "#bbb",

    lineHeight: "1.8",

    fontSize: "16px",
  },

  featureBox: {
    display: "flex",

    justifyContent:
      "center",

    gap: "20px",

    flexWrap: "wrap",

    marginBottom: "40px",
  },

  featureCard: {
    display: "flex",

    alignItems: "center",

    gap: "10px",

    padding:
      "14px 22px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(12px)",

    color: "white",

    border:
      "1px solid rgba(255,140,0,0.2)",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.08)",
  },

  icons: {
    display: "flex",

    justifyContent:
      "center",

    gap: "24px",

    marginBottom: "30px",
  },

  icon: {
    width: "58px",

    height: "58px",

    borderRadius: "18px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "24px",

    color: "white",

    textDecoration: "none",

    background:
      "rgba(255,255,255,0.06)",

    backdropFilter:
      "blur(12px)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.12)",
  },

  madeBy: {
    color: "white",

    fontSize: "24px",

    marginBottom: "10px",
  },

  copy: {
    color: "#888",

    fontSize: "14px",
  },
};

export default Footer;