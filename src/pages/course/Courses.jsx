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

  const isMobile =
    window.innerWidth <= 768;

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
      <div
        style={{
          ...styles.header,

          flexDirection:
            isMobile
              ? "column"
              : "row",

          alignItems:
            isMobile
              ? "flex-start"
              : "center",

          gap:
            isMobile
              ? "14px"
              : "18px",
        }}
      >

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

          style={{
            ...styles.logo,

            width:
              isMobile
                ? "65px"
                : "75px",

            height:
              isMobile
                ? "65px"
                : "75px",

            fontSize:
              isMobile
                ? "28px"
                : "34px",
          }}
        >

          <FaBolt />

        </motion.div>

        <div>

          <h1
            style={{
              ...styles.title,

              fontSize:
                isMobile
                  ? "32px"
                  : "42px",
            }}
          >
            Explore Courses
          </h1>

          <p
            style={{
              ...styles.subtitle,

              fontSize:
                isMobile
                  ? "14px"
                  : "16px",
            }}
          >
            Upgrade your skills
            with futuristic
            learning ⚡
          </p>

        </div>

      </div>

      {/* GRID */}
      <div
        style={{
          ...styles.grid,

          gridTemplateColumns:
            isMobile
              ? "1fr"
              : "repeat(auto-fit,minmax(300px,1fr))",

          gap:
            isMobile
              ? "20px"
              : "28px",
        }}
      >

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

              style={{
                ...styles.card,

                borderRadius:
                  isMobile
                    ? "22px"
                    : "28px",
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

                  style={{
                    ...styles.image,

                    height:
                      isMobile
                        ? "200px"
                        : "220px",
                  }}
                />

                <div
                  style={{
                    ...styles.overlay,

                    fontSize:
                      isMobile
                        ? "12px"
                        : "13px",

                    padding:
                      isMobile
                        ? "8px 14px"
                        : "10px 16px",
                  }}
                >

                  <FaBookOpen />

                  Premium Course

                </div>

              </div>

              {/* CONTENT */}
              <div
                style={{
                  ...styles.content,

                  padding:
                    isMobile
                      ? "18px"
                      : "24px",
                }}
              >

                <h2
                  style={{
                    ...styles.courseTitle,

                    fontSize:
                      isMobile
                        ? "22px"
                        : "24px",
                  }}
                >
                  {
                    course.title
                  }
                </h2>

                <p
                  style={{
                    ...styles.desc,

                    fontSize:
                      isMobile
                        ? "14px"
                        : "15px",

                    minHeight:
                      isMobile
                        ? "auto"
                        : "75px",
                  }}
                >
                  {
                    course.description
                  }
                </p>

                {/* PRICE + BUTTON */}
                <div
                  style={{
                    ...styles.bottom,

                    flexDirection:
                      isMobile
                        ? "column"
                        : "row",

                    alignItems:
                      isMobile
                        ? "stretch"
                        : "center",

                    gap:
                      isMobile
                        ? "16px"
                        : "0px",
                  }}
                >

                  {/* PRICE */}
                  <div
                    style={{
                      ...styles.price,

                      fontSize:
                        isMobile
                          ? "22px"
                          : "24px",
                    }}
                  >

                    ₹{" "}
                    {
                      course.price
                    }

                  </div>

                  {/* BUTTONS */}
                  <div
                    style={{
                      ...styles.btnGroup,

                      width:
                        isMobile
                          ? "100%"
                          : "auto",

                      flexDirection:
                        isMobile
                          ? "column"
                          : "row",
                    }}
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

                      style={{
                        ...styles.btn,

                        width:
                          isMobile
                            ? "100%"
                            : "auto",

                        justifyContent:
                          "center",

                        padding:
                          isMobile
                            ? "13px"
                            : "12px 20px",

                        fontSize:
                          isMobile
                            ? "14px"
                            : "15px",
                      }}

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

                      style={{
                        ...styles.buyBtn,

                        width:
                          isMobile
                            ? "100%"
                            : "auto",

                        padding:
                          isMobile
                            ? "13px"
                            : "12px 18px",

                        fontSize:
                          isMobile
                            ? "14px"
                            : "15px",
                      }}

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

    paddingTop:
      window.innerWidth <= 768
        ? "80px"
        : "90px",

    paddingBottom:
      window.innerWidth <= 768
        ? "20px"
        : "40px",

    paddingLeft:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    paddingRight:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflowX: "hidden",

    boxSizing:
      "border-box",
  },

  glow1: {
    position: "absolute",

    top: "-120px",

    left: "-120px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-120px",

    right: "-120px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  header: {
    display: "flex",

    maxWidth: "1200px",

    margin:
      "0 auto 35px auto",

    position: "relative",

    zIndex: 2,
  },

  logo: {
    borderRadius: "24px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },

  title: {
    color: "white",

    margin: 0,

    lineHeight: "1.2",
  },

  subtitle: {
    color: "#aaa",

    marginTop: "6px",
  },

  grid: {
    display: "grid",

    maxWidth: "1200px",

    margin: "auto",

    position: "relative",

    zIndex: 2,
  },

  card: {
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

    objectFit: "cover",
  },

  overlay: {
    position: "absolute",

    top: "15px",

    left: "15px",

    display: "flex",

    alignItems: "center",

    gap: "8px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.55)",

    backdropFilter:
      "blur(10px)",

    color: "white",
  },

  content: {},

  courseTitle: {
    color: "white",

    marginBottom: "12px",

    lineHeight: "1.4",
  },

  desc: {
    color: "#bbb",

    lineHeight: "1.7",
  },

  bottom: {
    marginTop: "22px",

    display: "flex",

    justifyContent:
      "space-between",
  },

  price: {
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