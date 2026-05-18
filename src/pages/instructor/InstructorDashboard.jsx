import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  motion,
} from "framer-motion";

import {
  FaBookOpen,
  FaUsers,
  FaVideo,
  FaRobot,
  FaBolt,
  FaCalendarAlt,
} from "react-icons/fa";

function InstructorDashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  // FETCH STATS
  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/instructor/stats`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
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
            Instructor Dashboard
          </h1>

          <p style={styles.subtitle}>
            AI-powered futuristic
            analytics ⚡
          </p>

        </div>

      </div>

      {/* STATS */}
      <div style={styles.grid}>

        <StatCard
          icon={<FaBookOpen />}
          number={
            stats.totalCourses
          }
          label="Courses"
        />

        <StatCard
          icon={<FaUsers />}
          number={
            stats.totalStudents
          }
          label="Students"
        />

        <StatCard
          icon={<FaVideo />}
          number={
            stats.totalLiveClasses
          }
          label="Live Classes"
        />

      </div>

      {/* RECENT COURSES */}
      <SectionTitle
        icon={<FaBolt />}
        title="Recent Courses"
      />

      {stats.recentCourses
        .length === 0 ? (

        <div style={styles.empty}>
          No courses yet
        </div>

      ) : (

        <div style={styles.listGrid}>

          {stats.recentCourses.map(
            (
              course,
              index
            ) => (

              <motion.div
                key={
                  course._id
                }

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index *
                    0.08,
                }}

                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}

                style={
                  styles.listCard
                }
              >

                <div
                  style={
                    styles.courseIcon
                  }
                >

                  <FaBookOpen />

                </div>

                <div>

                  <h3
                    style={
                      styles.cardTitle
                    }
                  >

                    {
                      course.title
                    }

                  </h3>

                  <p
                    style={
                      styles.cardText
                    }
                  >
                    AI Learning
                    Course
                  </p>

                </div>

              </motion.div>
            )
          )}

        </div>
      )}

      {/* UPCOMING */}
      <SectionTitle
        icon={
          <FaCalendarAlt />
        }
        title="Upcoming Live Classes"
      />

      {stats.upcomingClasses
        .length === 0 ? (

        <div style={styles.empty}>
          No upcoming classes
        </div>

      ) : (

        <div style={styles.listGrid}>

          {stats.upcomingClasses.map(
            (
              cls,
              index
            ) => (

              <motion.div
                key={cls._id}

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index *
                    0.08,
                }}

                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}

                style={
                  styles.liveCard
                }
              >

                <div
                  style={
                    styles.liveIcon
                  }
                >

                  <FaVideo />

                </div>

                <div>

                  <h3
                    style={
                      styles.cardTitle
                    }
                  >

                    {cls.title}

                  </h3>

                  <p
                    style={
                      styles.cardText
                    }
                  >

                    {
                      cls.course
                        ?.title
                    }

                  </p>

                  <p
                    style={
                      styles.date
                    }
                  >

                    {new Date(
                      cls.date
                    ).toLocaleString()}

                  </p>

                </div>

              </motion.div>
            )
          )}

        </div>
      )}

    </div>
  );
}

// STAT CARD
function StatCard({
  icon,
  number,
  label,
}) {

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}

      style={styles.statCard}
    >

      <div style={styles.statIcon}>
        {icon}
      </div>

      <h2 style={styles.statNumber}>
        {number}
      </h2>

      <p style={styles.statLabel}>
        {label}
      </p>

    </motion.div>
  );
}

// SECTION TITLE
function SectionTitle({
  icon,
  title,
}) {

  return (
    <div style={styles.sectionTitle}>

      {icon}

      <h2>{title}</h2>

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
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: "22px",

    marginBottom: "50px",

    position: "relative",

    zIndex: 2,
  },

  statCard: {
    padding: "30px",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    textAlign: "center",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  statIcon: {
    width: "70px",

    height: "70px",

    borderRadius: "20px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    margin:
      "0 auto 18px auto",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "28px",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },

  statNumber: {
    color: "white",

    fontSize: "42px",

    marginBottom: "6px",
  },

  statLabel: {
    color: "#aaa",

    fontSize: "15px",
  },

  sectionTitle: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    color: "white",

    marginBottom: "20px",

    marginTop: "10px",

    fontSize: "22px",

    position: "relative",

    zIndex: 2,
  },

  listGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "22px",

    marginBottom: "40px",

    position: "relative",

    zIndex: 2,
  },

  listCard: {
    display: "flex",

    alignItems: "center",

    gap: "16px",

    padding: "24px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  liveCard: {
    display: "flex",

    alignItems: "center",

    gap: "16px",

    padding: "24px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  courseIcon: {
    width: "65px",

    height: "65px",

    borderRadius: "18px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "24px",
  },

  liveIcon: {
    width: "65px",

    height: "65px",

    borderRadius: "18px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "24px",
  },

  cardTitle: {
    color: "white",

    marginBottom: "6px",
  },

  cardText: {
    color: "#aaa",

    fontSize: "14px",
  },

  date: {
    marginTop: "8px",

    color: "#ffb347",

    fontSize: "13px",
  },

  empty: {
    padding: "22px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    color: "#aaa",

    textAlign: "center",

    marginBottom: "35px",

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

export default InstructorDashboard;