import React from "react";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaChartLine,
  FaFileAlt,
  FaDownload,
  FaLaptopCode,
  FaUserGraduate,
  FaRocket,
  FaShieldAlt,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

function About() {

  const features = [

    {
      icon: <FaRobot />,
      title: "AI Resume Builder",
      desc:
        "Generate smart ATS-friendly resumes instantly using AI technology.",
    },

    {
      icon: <FaChartLine />,
      title: "Advanced ATS Score",
      desc:
        "Realistic ATS scoring system specially optimized for MCA students and developers.",
    },

    {
      icon: <FaFileAlt />,
      title: "Modern Resume Design",
      desc:
        "Beautiful futuristic resume templates for placements and internships.",
    },

    {
      icon: <FaDownload />,
      title: "PDF Export",
      desc:
        "Download professional resumes instantly in high-quality PDF format.",
    },

    {
      icon: <FaLaptopCode />,
      title: "Skill Analysis",
      desc:
        "Detects technical skills like React, Node.js, Java, Python, DBMS, AI and more.",
    },

    {
      icon: <FaUserGraduate />,
      title: "Student Focused",
      desc:
        "Perfect for MCA students, freshers, developers and placement preparation.",
    },

  ];

  return (

    <div style={styles.page}>

      {/* BACKGROUND GLOW */}

      <div style={styles.blur1}></div>

      <div style={styles.blur2}></div>

      {/* HERO */}

      <div style={styles.heroSection}>

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          style={styles.left}
        >

          <div style={styles.badge}>

            <FaRocket />

            Next Gen Learning

          </div>

          <h1 style={styles.heading}>
            About Our
            <br />
            AI Platform 🚀
          </h1>

          <p style={styles.desc}>

            A futuristic AI-powered E-Learning and Resume Building platform specially designed for MCA students, developers and freshers.

            <br /><br />

            Learn skills, build ATS-friendly resumes, prepare for placements, practice tests and improve your career with modern AI tools.

          </p>

          <div style={styles.statsRow}>

            <div style={styles.statCard}>

              <h2 style={styles.statNumber}>
                100+
              </h2>

              <p style={styles.statText}>
                AI Features
              </p>

            </div>

            <div style={styles.statCard}>

              <h2 style={styles.statNumber}>
                ATS
              </h2>

              <p style={styles.statText}>
                Smart Resume
              </p>

            </div>

            <div style={styles.statCard}>

              <h2 style={styles.statNumber}>
                MCA
              </h2>

              <p style={styles.statText}>
                Student Focused
              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          style={styles.right}
        >

          <div style={styles.robotCard}>

            <FaRobot style={styles.robotIcon} />

          </div>

        </motion.div>

      </div>

      {/* FEATURES */}

      <div style={styles.featureGrid}>

        {features.map(
          (item, index) => (

            <motion.div
              key={index}
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
                  index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              style={styles.featureCard}
            >

              <div style={styles.featureIcon}>
                {item.icon}
              </div>

              <h2 style={styles.featureTitle}>
                {item.title}
              </h2>

              <p style={styles.featureDesc}>
                {item.desc}
              </p>

            </motion.div>

          )
        )}

      </div>

      {/* WHY CHOOSE */}

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
          delay: 0.5,
        }}
        style={styles.bottomBox}
      >

        <div style={styles.bottomLeft}>

          <h1 style={styles.bottomHeading}>
            Why Choose Us?
          </h1>

          <p style={styles.bottomDesc}>

            Unlike normal resume builders and learning platforms, this system combines AI learning, resume optimization and placement preparation into one modern platform.

          </p>

        </div>

        <div style={styles.checkList}>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            ATS Friendly Resume Builder
          </div>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            AI Tutor & Smart Learning
          </div>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            Placement Preparation
          </div>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            Modern UI Experience
          </div>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            MCA Technical Focus
          </div>

          <div style={styles.checkItem}>
            <FaCheckCircle />
            Smart Skill Detection
          </div>

        </div>

      </motion.div>

    </div>

  );

}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#050816,#0b1120)",
    padding: "60px 8%",
    position: "relative",
    overflow: "hidden",
  },

  blur1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background:
      "rgba(255,140,0,0.15)",
    filter: "blur(120px)",
    top: "-100px",
    left: "-100px",
    borderRadius: "50%",
  },

  blur2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background:
      "rgba(255,140,0,0.12)",
    filter: "blur(120px)",
    bottom: "-120px",
    right: "-120px",
    borderRadius: "50%",
  },

  heroSection: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    alignItems: "center",
    gap: "60px",
    marginBottom: "90px",
    position: "relative",
    zIndex: 2,
  },

  left: {
    display: "flex",
    flexDirection: "column",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 22px",
    borderRadius: "18px",
    background:
      "rgba(255,140,0,0.08)",
    border:
      "1px solid rgba(255,140,0,0.18)",
    color: "#ff9800",
    fontWeight: "600",
    width: "fit-content",
    marginBottom: "28px",
  },

  heading: {
    fontSize: "72px",
    lineHeight: "1.1",
    color: "white",
    marginBottom: "24px",
    fontWeight: "800",
  },

  desc: {
    color: "#c9c9c9",
    lineHeight: "1.9",
    fontSize: "18px",
    maxWidth: "700px",
  },

  statsRow: {
    display: "flex",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
  },

  statCard: {
    padding: "22px 28px",
    borderRadius: "24px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.15)",
    minWidth: "160px",
  },

  statNumber: {
    color: "#ff9800",
    fontSize: "34px",
    marginBottom: "8px",
  },

  statText: {
    color: "#bbb",
  },

  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  robotCard: {
    width: "420px",
    height: "420px",
    borderRadius: "50px",
    background:
      "linear-gradient(135deg,#ff9800,#ff6a00)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0 0 80px rgba(255,140,0,0.35)",
  },

  robotIcon: {
    fontSize: "170px",
    color: "white",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "30px",
    marginBottom: "90px",
    position: "relative",
    zIndex: 2,
  },

  featureCard: {
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.12)",
    borderRadius: "30px",
    padding: "35px",
    backdropFilter:
      "blur(18px)",
  },

  featureIcon: {
    width: "75px",
    height: "75px",
    borderRadius: "24px",
    background:
      "rgba(255,140,0,0.12)",
    color: "#ff9800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    marginBottom: "25px",
  },

  featureTitle: {
    color: "white",
    fontSize: "26px",
    marginBottom: "14px",
  },

  featureDesc: {
    color: "#bbb",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  bottomBox: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "50px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.15)",
    borderRadius: "35px",
    padding: "50px",
    backdropFilter:
      "blur(18px)",
    position: "relative",
    zIndex: 2,
  },

  bottomLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  bottomHeading: {
    color: "white",
    fontSize: "52px",
    marginBottom: "20px",
  },

  bottomDesc: {
    color: "#bbb",
    lineHeight: "1.9",
    fontSize: "17px",
  },

  checkList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
  },

  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    color: "white",
    fontSize: "17px",
    background:
      "rgba(255,255,255,0.03)",
    padding: "18px 22px",
    borderRadius: "18px",
    border:
      "1px solid rgba(255,140,0,0.08)",
  },

};

export default About;