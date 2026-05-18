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
  FaPlus,
  FaPlay,
  FaTrash,
  FaVideo,
  FaCertificate,
  FaBolt,
  FaRobot,
} from "react-icons/fa";

function Dashboard() {

  const [courses, setCourses] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchMyCourses();

    const u =
      localStorage.getItem(
        "user"
      );

    if (u) {

      setUser(
        JSON.parse(u)
      );
    }

  }, []);

  // FETCH COURSES
  const fetchMyCourses =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/user/my-courses`,
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        if (
          Array.isArray(data)
        ) {

          setCourses(data);

        } else if (
          Array.isArray(
            data.courses
          )
        ) {

          setCourses(
            data.courses
          );

        } else {

          setCourses([]);
        }

      } catch (error) {

        console.log(error);

        alert(
          "Error loading dashboard ❌"
        );
      }
    };

  // DELETE COURSE
  const deleteCourse =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const confirmDelete =
          window.confirm(
            "Delete this course?"
          );

        if (
          !confirmDelete
        )
          return;

        await axios.delete(
          `${server}/api/course/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setCourses(
          courses.filter(
            (c) =>
              c &&
              c._id !== id
          )
        );

        alert(
          "Course deleted ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed ❌"
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

        <div style={styles.left}>

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
              Dashboard
            </h1>

            <p style={styles.subtitle}>
              Welcome back ⚡
            </p>

          </div>

        </div>

        {/* ADD COURSE */}
        {user?.role ===
          "instructor" && (

          <motion.button
            type="button"

            whileHover={{
              scale: 1.05,
            }}

            whileTap={{
              scale: 0.95,
            }}

            style={
              styles.addBtn
            }

            onClick={() =>
              navigate(
                "/create-course"
              )
            }
          >

            <FaPlus />

            Add Course

          </motion.button>
        )}

      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {!courses ||
        courses.length ===
          0 ? (

          <div style={styles.empty}>

            <FaBolt />

            No courses available

          </div>

        ) : (

          courses
            .filter(
              (course) =>
                course
            )
            .map(
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
                    y: 30,
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
                    y: -6,
                    scale: 1.02,
                  }}

                  style={
                    styles.card
                  }
                >

                  {/* IMAGE */}
                  <div
                    style={
                      styles.imageWrapper
                    }
                  >

                    <img
                      src={
                        course?.image ||
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

                      AI Learning

                    </div>

                  </div>

                  {/* TITLE */}
                  <h2
                    style={
                      styles.courseTitle
                    }
                  >
                    {
                      course.title
                    }
                  </h2>

                  {/* START */}
                  <motion.button
                    type="button"

                    whileHover={{
                      scale:
                        1.03,
                    }}

                    whileTap={{
                      scale:
                        0.95,
                    }}

                    style={
                      styles.mainBtn
                    }

                    onClick={() =>
                      navigate(
                        `/course/${course._id}`
                      )
                    }
                  >

                    <FaPlay />

                    Start

                  </motion.button>

                  {/* CERTIFICATE */}
                  <button
                    type="button"

                    style={
                      styles.certificateBtn
                    }

                    onClick={() =>
                      navigate(
                        "/certificate",
                        {
                          state:
                            {
                              courseName:
                                course.title,
                            },
                        }
                      )
                    }
                  >

                    <FaCertificate />

                    Certificate

                  </button>

                  {/* ADMIN */}
                  {(user?.role ===
                    "instructor" ||
                    user?.role ===
                      "admin") && (
                    <>

                      {/* ADD LECTURE */}
                      <button
                        type="button"

                        style={
                          styles.lectureBtn
                        }

                        onClick={() =>
                          navigate(
                            `/add-lecture/${course._id}`
                          )
                        }
                      >

                        <FaVideo />

                        Add Lecture

                      </button>

                      {/* MANAGE */}
                      <button
                        type="button"

                        style={
                          styles.manageBtn
                        }

                        onClick={() =>
                          navigate(
                            `/manage-lectures/${course._id}`
                          )
                        }
                      >

                        <FaVideo />

                        Manage Lectures

                      </button>

                      {/* DELETE */}
                      <button
                        type="button"

                        style={
                          styles.deleteBtn
                        }

                        onClick={() =>
                          deleteCourse(
                            course._id
                          )
                        }
                      >

                        <FaTrash />

                        Delete Course

                      </button>

                    </>
                  )}

                </motion.div>
              )
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

    top: "-100px",

    left: "-100px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-100px",

    right: "-100px",

    width: "350px",

    height: "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  header: {
    maxWidth: "1200px",

    margin:
      "0 auto 35px auto",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    position: "relative",

    zIndex: 2,
  },

  left: {
    display: "flex",

    alignItems: "center",

    gap: "16px",
  },

  logo: {
    width: "65px",

    height: "65px",

    borderRadius: "22px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "28px",

    color: "white",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.35)",
  },

  title: {
    margin: 0,

    color: "white",

    fontSize: "34px",
  },

  subtitle: {
    marginTop: "4px",

    color: "#aaa",

    fontSize: "14px",
  },

  addBtn: {
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

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,280px))",

    justifyContent: "center",

    gap: "22px",

    maxWidth: "1200px",

    margin: "auto",

    position: "relative",

    zIndex: 2,
  },

  card: {
    borderRadius: "24px",

    overflow: "hidden",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.08)",

    paddingBottom: "12px",

    transition: "0.3s",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",

    height: "160px",

    objectFit: "cover",
  },

  overlay: {
    position: "absolute",

    top: "12px",

    left: "12px",

    display: "flex",

    alignItems: "center",

    gap: "6px",

    padding:
      "8px 14px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.55)",

    backdropFilter:
      "blur(10px)",

    color: "white",

    fontSize: "12px",
  },

  courseTitle: {
    color: "white",

    padding:
      "18px 18px 8px 18px",

    margin: 0,

    fontSize: "19px",

    minHeight: "48px",
  },

  mainBtn: {
    margin:
      "0 18px 8px 18px",

    width:
      "calc(100% - 36px)",

    border: "none",

    padding: "12px",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "8px",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",
  },

  certificateBtn: {
    margin:
      "0 18px 8px 18px",

    width:
      "calc(100% - 36px)",

    border:
      "1px solid rgba(255,140,0,0.3)",

    padding: "12px",

    borderRadius: "14px",

    background:
      "rgba(255,255,255,0.04)",

    color: "#ff9800",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "8px",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",
  },

  lectureBtn: {
    margin:
      "0 18px 8px 18px",

    width:
      "calc(100% - 36px)",

    border: "none",

    padding: "12px",

    borderRadius: "14px",

    background:
      "#007bff",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "8px",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",
  },

  manageBtn: {
    margin:
      "0 18px 8px 18px",

    width:
      "calc(100% - 36px)",

    border: "none",

    padding: "12px",

    borderRadius: "14px",

    background:
      "#6c757d",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "8px",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",
  },

  deleteBtn: {
    margin:
      "0 18px 8px 18px",

    width:
      "calc(100% - 36px)",

    border: "none",

    padding: "12px",

    borderRadius: "14px",

    background:
      "#ff2d55",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "8px",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",
  },

  empty: {
    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    gap: "12px",

    fontSize: "18px",

    padding: "60px",
  },
};

export default Dashboard;