import React, {
  useEffect,
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
  FaBolt,
  FaRobot,
  FaPlay,
  FaCertificate,
  FaVideo,
  FaArrowRight,
} from "react-icons/fa";

function Home() {

  const [courses, setCourses] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/course`
          );

        setCourses(
          data.slice(0, 3)
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* HERO */}
      <section style={styles.hero}>

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
            duration: 0.8,
          }}

          style={styles.heroContent}
        >

          {/* BADGE */}
          <div style={styles.badge}>

            <FaBolt />

            AI Powered Learning

          </div>

          {/* TITLE */}
          <motion.h1
            style={styles.heroTitle}

            initial={{
              scale: 0.9,
            }}

            animate={{
              scale: 1,
            }}

            transition={{
              duration: 0.5,
            }}
          >

            Learn Without
            Limits 🚀

          </motion.h1>

          <p style={styles.heroText}>

            Upgrade your future
            with futuristic AI
            courses, live classes,
            and premium learning
            experiences.

          </p>

          {/* BUTTONS */}
          <div style={styles.heroButtons}>

            <motion.button
              type="button"

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.primaryBtn
              }

              onClick={() =>
                navigate(
                  "/courses"
                )
              }
            >

              Explore Courses

              <FaArrowRight />

            </motion.button>

            <motion.button
              type="button"

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.secondaryBtn
              }

              onClick={() => {

                const token =
                  localStorage.getItem(
                    "token"
                  );

                if (token) {

                  navigate(
                    "/dashboard"
                  );

                } else {

                  navigate(
                    "/register"
                  );
                }
              }}
            >

              {
                localStorage.getItem(
                  "token"
                )
                  ? "Dashboard"
                  : "Join Free"
              }

            </motion.button>

          </div>

        </motion.div>

        {/* HERO IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          style={styles.heroRight}
        >

          <div style={styles.robotBox}>

            <FaRobot />

          </div>

        </motion.div>

      </section>

      {/* COURSES */}
      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <h2 style={styles.heading}>
            Popular Courses
          </h2>

          <p style={styles.subHeading}>
            Learn trending skills
            with immersive
            futuristic education
          </p>

        </div>

        <div style={styles.grid}>

          {courses.map(
            (
              course,
              index
            ) => (

              <motion.div
                key={
                  course._id
                }

                style={
                  styles.card
                }

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index *
                    0.15,
                }}

                viewport={{
                  once: true,
                }}

                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
              >

                {/* IMAGE */}
                <div
                  style={
                    styles.imageWrapper
                  }
                >

                  <img
                    src={
                      course.image ||
                      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                    }

                    alt="course"

                    style={
                      styles.image
                    }
                  />

                  <div
                    style={
                      styles.overlay
                    }
                  >

                    <FaBolt />

                    Premium

                  </div>

                </div>

                {/* CONTENT */}
                <div
                  style={
                    styles.cardContent
                  }
                >

                  <h3
                    style={
                      styles.courseTitle
                    }
                  >
                    {
                      course.title
                    }
                  </h3>

                  <div
                    style={
                      styles.price
                    }
                  >

                    ₹{" "}
                    {
                      course.price
                    }

                  </div>

                  <motion.button
                    type="button"

                    whileHover={{
                      scale:
                        1.05,
                    }}

                    whileTap={{
                      scale:
                        0.95,
                    }}

                    style={
                      styles.courseBtn
                    }

                    onClick={() =>
                      navigate(
                        `/course/${course._id}`
                      )
                    }
                  >

                    <FaPlay />

                    View Course

                  </motion.button>

                </div>

              </motion.div>
            )
          )}

        </div>

      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>

        <h2 style={styles.heading}>
          Why Choose Us?
        </h2>

        <div style={styles.featuresGrid}>

          {[
            {
              icon:
                <FaBolt />,
              title:
                "AI Learning",
            },

            {
              icon:
                <FaVideo />,
              title:
                "Live Classes",
            },

            {
              icon:
                <FaCertificate />,
              title:
                "Certificates",
            },
          ].map(
            (
              item,
              index
            ) => (

              <motion.div
                key={index}

                style={
                  styles.featureCard
                }

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index *
                    0.2,
                }}

                viewport={{
                  once: true,
                }}

                whileHover={{
                  y: -8,
                }}
              >

                <div
                  style={
                    styles.featureIcon
                  }
                >

                  {
                    item.icon
                  }

                </div>

                <h3
                  style={
                    styles.featureTitle
                  }
                >

                  {
                    item.title
                  }

                </h3>

                <p
                  style={
                    styles.featureText
                  }
                >

                  Experience futuristic
                  education with premium
                  AI-powered systems.

                </p>

              </motion.div>
            )
          )}

        </div>

      </section>

      {/* CTA */}
      <motion.section
        style={styles.cta}

        initial={{
          opacity: 0,
        }}

        whileInView={{
          opacity: 1,
        }}

        transition={{
          duration: 1,
        }}

        viewport={{
          once: true,
        }}
      >

        <h2 style={styles.ctaTitle}>
          Start Your AI Journey
          Today 🚀
        </h2>

        <p style={styles.ctaText}>
          Join thousands of
          students learning
          futuristic skills.

        </p>

        <motion.button
          type="button"

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          style={
            styles.ctaBtn
          }

          onClick={() =>
            navigate(
              "/register"
            )
          }
        >

          Join Now

        </motion.button>

      </motion.section>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    overflowX: "hidden",

    position: "relative",
  },

  glow1: {
    position: "absolute",

    top: "-120px",

    left: "-120px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

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
      "rgba(255,94,0,0.15)",

    filter: "blur(100px)",
  },

  hero: {
    minHeight: "85vh",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "40px",

    paddingTop: "40px",

    paddingBottom: "60px",

    paddingLeft: "8%",

    paddingRight: "8%",

    position: "relative",

    zIndex: 2,

    boxSizing: "border-box",
  },

  heroContent: {
    maxWidth: "620px",
  },

  badge: {
    display: "inline-flex",

    alignItems: "center",

    gap: "10px",

    padding:
      "10px 18px",

    borderRadius: "14px",

    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    color: "#ff9800",

    marginBottom: "25px",
  },

  heroTitle: {
    fontSize: "72px",

    lineHeight: "1.1",

    color: "white",

    marginBottom: "20px",
  },

  heroText: {
    color: "#bdbdbd",

    fontSize: "18px",

    lineHeight: "1.8",

    marginBottom: "35px",
  },

  heroButtons: {
    display: "flex",

    gap: "18px",

    flexWrap: "wrap",
  },

  primaryBtn: {
    border: "none",

    padding:
      "16px 28px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },

  secondaryBtn: {
    border:
      "1px solid rgba(255,255,255,0.12)",

    padding:
      "16px 28px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",
  },

  heroRight: {
    flex: 1,

    display: "flex",

    justifyContent:
      "center",
  },

  robotBox: {
    width: "320px",

    height: "320px",

    borderRadius: "40px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    fontSize: "140px",

    color: "white",

    boxShadow:
      "0 0 80px rgba(255,140,0,0.35)",
  },

  section: {
    padding:
      "60px 8%",
  },

  sectionHeader: {
    textAlign: "center",

    marginBottom: "50px",
  },

  heading: {
    color: "white",

    fontSize: "42px",

    marginBottom: "10px",
  },

  subHeading: {
    color: "#aaa",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "28px",
  },

  card: {
    borderRadius: "28px",

    overflow: "hidden",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",

    height: "220px",

    objectFit: "cover",
  },

  overlay: {
    position: "absolute",

    top: "15px",

    left: "15px",

    display: "flex",

    alignItems: "center",

    gap: "8px",

    padding:
      "8px 14px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.55)",

    color: "white",

    fontSize: "13px",
  },

  cardContent: {
    padding: "24px",
  },

  courseTitle: {
    color: "white",

    fontSize: "24px",

    marginBottom: "18px",
  },

  price: {
    color: "#ff9800",

    fontSize: "24px",

    fontWeight: "bold",

    marginBottom: "20px",
  },

  courseBtn: {
    width: "100%",

    border: "none",

    padding: "14px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",
  },

  featuresSection: {
    padding:
      "60px 8%",

    textAlign: "center",
  },

  featuresGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "28px",

    marginTop: "50px",
  },

  featureCard: {
    padding: "35px",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  featureIcon: {
    width: "70px",

    height: "70px",

    borderRadius: "20px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    margin:
      "0 auto 20px auto",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "28px",
  },

  featureTitle: {
    color: "white",

    marginBottom: "12px",
  },

  featureText: {
    color: "#aaa",

    lineHeight: "1.7",
  },

  cta: {
    padding:
      "80px 8%",

    textAlign: "center",
  },

  ctaTitle: {
    color: "white",

    fontSize: "52px",

    marginBottom: "20px",
  },

  ctaText: {
    color: "#aaa",

    marginBottom: "30px",

    fontSize: "18px",
  },

  ctaBtn: {
    border: "none",

    padding:
      "18px 34px",

    borderRadius: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },
};

export default Home;