import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server }
  from "../../main";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaPlay,
  FaBolt,
  FaBookOpen,
} from "react-icons/fa";

function Courses() {

  const [courses, setCourses] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchCourses();

  }, []);

  // FETCH COURSES
  const fetchCourses =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/course`
          );

        setCourses(data);

      } catch (error) {

        alert(
          "Error fetching courses"
        );
      }
    };

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

          <FaBolt />

        </motion.div>

        <div>

          <h1 style={styles.title}>
            Explore Courses
          </h1>

          <p style={styles.subtitle}>
            Upgrade your skills
            with futuristic
            learning ⚡
          </p>

        </div>

      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {courses.map(
          (course, index) => (

            <motion.div
              key={course._id}

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
                  index * 0.08,
              }}

              whileHover={{
                y: -8,
                scale: 1.02,
              }}

              style={styles.card}
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

                  <FaBookOpen />

                  Premium Course

                </div>

              </div>

              {/* CONTENT */}
              <div
                style={
                  styles.content
                }
              >

                <h2
                  style={
                    styles.courseTitle
                  }
                >
                  {
                    course.title
                  }
                </h2>

                <p
                  style={
                    styles.desc
                  }
                >
                  {
                    course.description
                  }
                </p>

                {/* PRICE */}
                <div
                  style={
                    styles.bottom
                  }
                >

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

                  <div
                    style={
                      styles.btnGroup
                    }
                  >

                    {/* VIEW */}
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
                        styles.btn
                      }

                      onClick={() =>
                        navigate(
                          `/course/${course._id}`
                        )
                      }
                    >

                      <FaPlay />

                      View

                    </motion.button>

                    {/* BUY */}
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
                        styles.buyBtn
                      }

                      onClick={() =>
                        navigate(
                          `/buy-course/${course._id}`
                        )
                      }
                    >

                      Buy

                    </motion.button>

                  </div>

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    paddingTop: "90px",

    paddingBottom: "40px",

    paddingLeft: "20px",

    paddingRight: "20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflowX: "hidden",
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

    filter: "blur(90px)",
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

    filter: "blur(90px)",
  },

  header: {
    display: "flex",

    alignItems: "center",

    gap: "18px",

    maxWidth: "1200px",

    margin:
      "0 auto 40px auto",

    position: "relative",

    zIndex: 2,
  },

  logo: {
    width: "75px",

    height: "75px",

    borderRadius: "24px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "34px",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },

  title: {
    color: "white",

    margin: 0,

    fontSize: "42px",
  },

  subtitle: {
    color: "#aaa",

    marginTop: "6px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",

    gap: "28px",

    maxWidth: "1200px",

    margin: "auto",

    position: "relative",

    zIndex: 2,
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

    transition: "0.3s",
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
      "10px 16px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.55)",

    backdropFilter:
      "blur(10px)",

    color: "white",

    fontSize: "13px",
  },

  content: {
    padding: "24px",
  },

  courseTitle: {
    color: "white",

    marginBottom: "12px",

    fontSize: "24px",
  },

  desc: {
    color: "#bbb",

    lineHeight: "1.7",

    fontSize: "15px",

    minHeight: "75px",
  },

  bottom: {
    marginTop: "22px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  price: {
    fontSize: "24px",

    fontWeight: "bold",

    color: "#ff9800",

    textShadow:
      "0 0 15px rgba(255,140,0,0.3)",
  },

  btnGroup: {
    display: "flex",

    gap: "10px",
  },

  btn: {
    border: "none",

    padding:
      "12px 20px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    alignItems: "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.3)",
  },

  buyBtn: {
    border: "none",

    padding:
      "12px 18px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "white",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(34,197,94,0.3)",
  },
};

export default Courses;