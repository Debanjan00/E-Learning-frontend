import React from "react";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaFileAlt,
  FaDownload,
  FaChartLine,
  FaUserGraduate,
  FaLaptopCode,
} from "react-icons/fa";

function About() {

  const features = [

    {
      icon: <FaRobot />,
      title: "AI Resume Generator",
      desc:
        "Generate professional ATS-friendly resume summaries instantly using AI.",
    },

    {
      icon: <FaChartLine />,
      title: "Smart ATS Score",
      desc:
        "Advanced ATS system specially designed for MCA students and tech resumes.",
    },

    {
      icon: <FaFileAlt />,
      title: "Professional Resume",
      desc:
        "Build clean and modern resumes suitable for internships and placements.",
    },

    {
      icon: <FaDownload />,
      title: "PDF Download",
      desc:
        "Download high-quality resumes instantly in PDF format.",
    },

    {
      icon: <FaLaptopCode />,
      title: "Tech Skill Detection",
      desc:
        "Detects important technical skills like React, Node.js, Java, Python, DBMS, and more.",
    },

    {
      icon: <FaUserGraduate />,
      title: "MCA Focused",
      desc:
        "Specially optimized for MCA students, freshers, and developers.",
    },

  ];

  return (

    <div style={styles.page}>

      {/* HERO */}

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
        style={styles.hero}
      >

        <div style={styles.logo}>
          <FaRobot />
        </div>

        <h1 style={styles.title}>
          About AI Resume Builder
        </h1>

        <p style={styles.subtitle}>
          AI-powered ATS Resume Builder specially designed for MCA students, freshers, and developers 🚀
        </p>

      </motion.div>

      {/* FEATURES */}

      <div style={styles.grid}>

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
                y: -8,
              }}
              style={styles.card}
            >

              <div style={styles.icon}>
                {item.icon}
              </div>

              <h2 style={styles.cardTitle}>
                {item.title}
              </h2>

              <p style={styles.cardDesc}>
                {item.desc}
              </p>

            </motion.div>

          )
        )}

      </div>

      {/* ABOUT SECTION */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        style={styles.aboutBox}
      >

        <h2 style={styles.aboutTitle}>
          Why This Resume Builder?
        </h2>

        <p style={styles.aboutText}>

          This platform helps MCA students create professional ATS-friendly resumes for internships, campus placements, and developer jobs.

          <br /><br />

          Unlike basic resume builders, this system intelligently analyzes:
          skills,
          projects,
          technical keywords,
          role matching,
          action words,
          and resume quality.

          <br /><br />

          It also prevents fake ATS scores by detecting meaningless content and weak resume sections.

        </p>

      </motion.div>

    </div>

  );

}

const styles = {

  page: {
    minHeight: "100vh",
    padding: "50px 30px",
    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
  },

  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },

  logo: {
    width: "100px",
    height: "100px",
    margin: "0 auto 25px",
    borderRadius: "30px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "42px",
  },

  title: {
    color: "white",
    fontSize: "52px",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#bbb",
    maxWidth: "800px",
    margin: "auto",
    lineHeight: "1.8",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
  },

  card: {
    background:
      "rgba(255,255,255,0.04)",
    padding: "30px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,140,0,0.15)",
    backdropFilter:
      "blur(12px)",
  },

  icon: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background:
      "rgba(255,140,0,0.12)",
    color: "#ff9800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },

  cardTitle: {
    color: "white",
    marginBottom: "12px",
    fontSize: "24px",
  },

  cardDesc: {
    color: "#bbb",
    lineHeight: "1.7",
  },

  aboutBox: {
    marginTop: "70px",
    padding: "40px",
    borderRadius: "30px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.15)",
    backdropFilter:
      "blur(12px)",
  },

  aboutTitle: {
    color: "white",
    fontSize: "36px",
    marginBottom: "20px",
  },

  aboutText: {
    color: "#bbb",
    lineHeight: "2",
    fontSize: "17px",
  },

};

export default About;