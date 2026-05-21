import React from "react";

import {
  motion,
} from "framer-motion";

import {
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaRocket,
  FaBookOpen,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// FIX MARKER ICON ISSUE
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function About() {

  // OFFICE LOCATION
  const officePosition = [
    22.5018,
    88.3611,
  ];

  const features = [

    {
      icon:
        <FaGraduationCap />,

      title:
        "Smart Learning",

      desc:
        "Interactive courses with modern learning experience.",
    },

    {
      icon:
        <FaCertificate />,

      title:
        "Certificates",

      desc:
        "Get certificates after successful course completion.",
    },

    {
      icon:
        <FaUsers />,

      title:
        "Student Community",

      desc:
        "Connect with learners and instructors worldwide.",
    },

    {
      icon:
        <FaRocket />,

      title:
        "Career Growth",

      desc:
        "Build industry-ready skills and grow your career.",
    },

    {
      icon:
        <FaBookOpen />,

      title:
        "AI Powered Tutor",

      desc:
        "AI-assisted learning for smarter education experience.",
    },

    {
      icon:
        <FaGlobe />,

      title:
        "Global Access",

      desc:
        "Learn anytime and anywhere across the world.",
    },
  ];

  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>

        <motion.h1

          initial={{
            opacity: 0,
            y: -40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          style={styles.heading}
        >

          About Our
          E-Learning Platform

          <FaRocket
            style={{
              marginLeft: "15px",
              fontSize: "clamp(30px,5vw,50px)",
              color: "white",
              verticalAlign:
                "middle",
            }}
          />

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.4,
          }}

          style={styles.subtitle}
        >

          Learn smarter with AI-powered education,
          modern courses, certificates,
          analytics, and futuristic learning tools.

        </motion.p>

      </div>

      {/* FEATURES */}
      <div style={styles.grid}>

        {features.map(
          (
            item,
            index
          ) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay:
                  index * 0.1,
              }}

              whileHover={{
                scale: 1.05,
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

      {/* OFFICE LOCATION */}
      <motion.div

        initial={{
          opacity: 0,
          y: 50,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        style={styles.officeSection}
      >

        <h2 style={styles.officeTitle}>

          Registered Office 📍

        </h2>

        <p style={styles.officeText}>

          Visit our registered office location
          and explore our learning ecosystem.

        </p>

        {/* LEAFLET MAP */}
        <MapContainer

          center={officePosition}

          zoom={15}

          scrollWheelZoom={false}

          style={styles.map}
        >

          <TileLayer

            attribution='&copy; OpenStreetMap contributors'

            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={officePosition}>

            <Popup>

              🚀 Registered Office <br />

              375, Prince Anwar Shah Rd, <br />

              South City Complex, <br />

              Jadavpur, Kolkata, <br />

              West Bengal 700068

            </Popup>

          </Marker>

        </MapContainer>

        {/* OFFICE INFO */}
        <div style={styles.officeInfo}>

          <div style={styles.infoCard}>

            <FaMapMarkerAlt />

            <span>
              375, Prince Anwar Shah Rd,
              South City Complex,
              Jadavpur, Kolkata,
              West Bengal 700068
            </span>

          </div>

          <div style={styles.infoCard}>

            <FaClock />

            <span>
              Mon - Sat : 9AM - 7PM
            </span>

          </div>

          <div style={styles.infoCard}>

            <FaGlobe />

            <span>
              https://e-learning-frontend-psi.vercel.app
            </span>

          </div>

        </div>

      </motion.div>

      {/* MISSION */}
      <motion.div

        initial={{
          opacity: 0,
          y: 50,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        style={styles.mission}
      >

        <h2 style={styles.missionTitle}>

          Our Mission 🎯

        </h2>

        <p style={styles.missionText}>

          Our mission is to make education
          accessible, engaging, and futuristic
          for every learner through AI,
          live learning, analytics,
          and practical knowledge.

        </p>

      </motion.div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    color: "white",

    padding: "20px",

    overflow: "hidden",
  },

  hero: {
    textAlign: "center",

    marginBottom: "60px",
  },

  heading: {
    fontSize: "clamp(32px,6vw,52px)",

    fontWeight: "bold",

    marginBottom: "20px",

    lineHeight: "1.3",

    background:
      "linear-gradient(90deg,#ff9800,#ff5e00)",

    WebkitBackgroundClip:
      "text",

    WebkitTextFillColor:
      "transparent",
  },

  subtitle: {
    maxWidth: "800px",

    margin: "auto",

    color: "#cfcfcf",

    fontSize: "clamp(15px,3vw,20px)",

    lineHeight: "1.8",

    padding: "0 10px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(3,1fr)",

    gap: "20px",

    marginBottom: "70px",

    alignItems: "stretch",
  },

  card: {
    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(12px)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    borderRadius: "25px",

    padding: "25px 20px",

    textAlign: "center",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.08)",

    minHeight: "260px",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",
  },

  icon: {
    fontSize: "45px",

    marginBottom: "20px",

    color: "#ff9800",
  },

  cardTitle: {
    fontSize: "24px",

    marginBottom: "15px",
  },

  cardDesc: {
    color: "#bdbdbd",

    lineHeight: "1.7",
  },

  officeSection: {
    width: "100%",

    margin:
      "0 auto 70px auto",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    borderRadius: "30px",

    padding: "25px",

    backdropFilter:
      "blur(12px)",
  },

  officeTitle: {
    fontSize: "clamp(28px,5vw,38px)",

    color: "#ff9800",

    textAlign: "center",

    marginBottom: "15px",
  },

  officeText: {
    textAlign: "center",

    color: "#cfcfcf",

    marginBottom: "30px",

    fontSize: "clamp(14px,3vw,18px)",
  },

  map: {
    width: "100%",

    height: "350px",

    borderRadius: "20px",
  },

  officeInfo: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: "20px",

    marginTop: "30px",
  },

  infoCard: {
    background:
      "rgba(255,255,255,0.06)",

    padding: "18px",

    borderRadius: "18px",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    color: "#fff",

    fontSize: "15px",

    lineHeight: "1.6",

    wordBreak: "break-word",
  },

  mission: {
    maxWidth: "900px",

    margin: "auto",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    borderRadius: "30px",

    padding: "30px 20px",

    textAlign: "center",

    backdropFilter:
      "blur(12px)",
  },

  missionTitle: {
    fontSize: "clamp(28px,5vw,38px)",

    marginBottom: "20px",

    color: "#ff9800",
  },

  missionText: {
    color: "#d1d5db",

    lineHeight: "1.9",

    fontSize: "clamp(15px,3vw,18px)",
  },
};

export default About;