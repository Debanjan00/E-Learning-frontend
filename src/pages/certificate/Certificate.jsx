import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import axios from "axios";

import { server } from "../../main";

import { motion } from "framer-motion";

import {
  FaAward,
  FaDownload,
  FaMedal,
  FaLock,
} from "react-icons/fa";

function Certificate() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [progress, setProgress] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const certificateRef = useRef();

  const today =
    new Date().toLocaleDateString();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const courses = await axios.get(
        `${server}/api/user/my-courses`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const myCourse =
        courses.data[0] ||
        courses.data.courses?.[0];

      if (!myCourse) {
        setLoading(false);
        return;
      }

      const progressData =
        await axios.get(
          `${server}/api/progress/${myCourse._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const completed =
        progressData.data
          ?.completedLectures?.length || 0;

      const courseData =
        await axios.get(
          `${server}/api/course/${myCourse._id}`
        );

      const total =
        courseData.data?.lectures?.length || 0;

      const percent =
        total > 0
          ? Math.round(
              (completed / total) * 100
            )
          : 0;

      setProgress(percent);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // PRINT FUNCTION
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "150px",
        }}
      >
        Loading...
      </div>
    );
  }

  // LOCKED
  if (progress < 100) {
    return (
      <div style={styles.page}>
        <div style={styles.lockCard}>
          <FaLock size={60} />

          <h1>Certificate Locked</h1>

          <p>
            Complete the course 100%
            to unlock your certificate.
          </p>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            ></div>
          </div>

          <h2>{progress}% Completed</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* PRINT CSS */}
      <style>
        {`
          @media print {

            body * {
              visibility: hidden;
            }

            #certificate-print,
            #certificate-print * {
              visibility: visible;
            }

            #certificate-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white;
            }

            button {
              display: none !important;
            }
          }
        `}
      </style>

      <div style={styles.page}>
        {/* GLOW */}
        <div style={styles.glow1}></div>

        <div style={styles.glow2}></div>

        {/* CERTIFICATE */}
        <motion.div
          ref={certificateRef}
          id="certificate-print"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          style={styles.card}
        >
          {/* ICON */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            style={styles.iconBox}
          >
            <FaAward />
          </motion.div>

          {/* TITLE */}
          <h1 style={styles.title}>
            Certificate
            <br />
            of Completion
          </h1>

          <p style={styles.subText}>
            Proudly presented to
          </p>

          {/* NAME */}
          <h2 style={styles.name}>
            {user?.name}
          </h2>

          {/* COURSE */}
          <p style={styles.subText}>
            for successfully completing
          </p>

          <div style={styles.courseBox}>
            <FaMedal />

            <h3 style={styles.course}>
              Full Stack Development
            </h3>
          </div>

          {/* DATE */}
          <div style={styles.dateBox}>
            <span>Date:</span>

            <span>{today}</span>
          </div>

          {/* SIGNATURE */}
          <div style={styles.signatureArea}>
            <div>
              <div style={styles.line}></div>

              <p style={styles.sign}>
                Instructor
              </p>
            </div>

            <div>
              <div style={styles.line}></div>

              <p style={styles.sign}>
                Director
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            style={styles.btn}
            onClick={handlePrint}
          >
            <FaDownload />

            Download PDF
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
    overflow: "hidden",
    position: "relative",
  },

  lockCard: {
    background:
      "rgba(255,255,255,0.05)",
    padding: "50px",
    borderRadius: "30px",
    textAlign: "center",
    color: "white",
    width: "100%",
    maxWidth: "500px",
    border:
      "1px solid rgba(255,140,0,0.2)",
  },

  progressBar: {
    width: "100%",
    height: "14px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.1)",
    overflow: "hidden",
    marginTop: "30px",
    marginBottom: "20px",
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
  },

  glow1: {
    position: "absolute",
    top: "-100px",
    left: "-100px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(255,140,0,0.18)",
    filter: "blur(100px)",
  },

  glow2: {
    position: "absolute",
    bottom: "-100px",
    right: "-100px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(255,94,0,0.18)",
    filter: "blur(100px)",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background:
      "rgba(255,255,255,0.05)",
    backdropFilter: "blur(18px)",
    borderRadius: "30px",
    border:
      "2px solid rgba(255,140,0,0.2)",
    padding: "60px",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  iconBox: {
    width: "100px",
    height: "100px",
    margin: "auto",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "45px",
    color: "white",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
  },

  title: {
    color: "white",
    marginTop: "30px",
    fontSize: "52px",
  },

  subText: {
    color: "#bbb",
    marginTop: "20px",
  },

  name: {
    marginTop: "20px",
    fontSize: "48px",
    color: "#ffb74d",
    fontWeight: "bold",
  },

  courseBox: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    color: "#ff9800",
  },

  course: {
    color: "white",
  },

  dateBox: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    color: "#ccc",
  },

  signatureArea: {
    marginTop: "60px",
    display: "flex",
    justifyContent: "space-between",
  },

  line: {
    width: "220px",
    borderBottom:
      "2px solid rgba(255,140,0,0.5)",
    marginBottom: "10px",
  },

  sign: {
    color: "#aaa",
  },

  btn: {
    marginTop: "50px",
    padding: "16px 28px",
    border: "none",
    borderRadius: "18px",
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Certificate;