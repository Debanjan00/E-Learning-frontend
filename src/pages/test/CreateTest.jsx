import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import { server }
from "../../main";

import {
  motion,
} from "framer-motion";

import {
  FaRobot,
  FaBook,
  FaSignal,
  FaListOl,
} from "react-icons/fa";

function CreateTest() {

  const navigate =
    useNavigate();

  const [courses,
    setCourses] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      title: "",
      courseId: "",
      difficulty:
        "Medium",
      totalQuestions: 5,
    });

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

        console.log(error);

        toast.error(
          "Failed to load courses ❌"
        );
      }
    };

  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setForm({
        ...form,

        [e.target.name]:
          e.target.value,
      });
    };

  // SUBMIT
  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.post(
            `${server}/api/test/create`,
            form,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // ✅ SUCCESS TOAST
        toast.success(
          "AI Test Created 🚀"
        );

        // ✅ REDIRECT
        navigate("/tests");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
          "Failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        style={styles.card}
      >

        {/* LOGO */}
        <div style={styles.logo}>
          <FaRobot />
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>
          AI Test Generator
        </h1>

        <p style={styles.subtitle}>
          Create smart AI quizzes
          for students 🚀
        </p>

        <form
          onSubmit={
            submitHandler
          }
        >

          {/* TEST TITLE */}
          <div
            style={
              styles.inputBox
            }
          >

            <FaBook
              style={
                styles.icon
              }
            />

            <input
              type="text"

              name="title"

              placeholder="Test Title"

              value={
                form.title
              }

              onChange={
                handleChange
              }

              style={
                styles.input
              }

              required
            />

          </div>

          {/* COURSE */}
          <div
            style={
              styles.inputBox
            }
          >

            <FaBook
              style={
                styles.icon
              }
            />

            <select
              name="courseId"

              value={
                form.courseId
              }

              onChange={
                handleChange
              }

              style={
                styles.select
              }

              required
            >

              <option
                value=""
                disabled
                hidden

                style={{
                  background:
                    "#1f2937",

                  color:
                    "white",
                }}
              >

                Select Course

              </option>

              {courses.map(
                (course) => (

                  <option
                    key={
                      course._id
                    }

                    value={
                      course._id
                    }

                    style={{
                      background:
                        "#1f2937",

                      color:
                        "white",
                    }}
                  >

                    {
                      course.title
                    }

                  </option>
                )
              )}

            </select>

          </div>

          {/* DIFFICULTY */}
          <div
            style={
              styles.inputBox
            }
          >

            <FaSignal
              style={
                styles.icon
              }
            />

            <select
              name="difficulty"

              value={
                form.difficulty
              }

              onChange={
                handleChange
              }

              style={
                styles.select
              }
            >

              <option
                style={{
                  background:
                    "#1f2937",

                  color:
                    "white",
                }}
              >
                Easy
              </option>

              <option
                style={{
                  background:
                    "#1f2937",

                  color:
                    "white",
                }}
              >
                Medium
              </option>

              <option
                style={{
                  background:
                    "#1f2937",

                  color:
                    "white",
                }}
              >
                Hard
              </option>

            </select>

          </div>

          {/* TOTAL QUESTIONS */}
          <div
            style={
              styles.inputBox
            }
          >

            <FaListOl
              style={
                styles.icon
              }
            />

            <input
              type="number"

              name="totalQuestions"

              min="1"

              max="20"

              value={
                form.totalQuestions
              }

              onChange={
                handleChange
              }

              style={
                styles.input
              }
            />

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.96,
            }}

            type="submit"

            style={
              styles.button
            }
          >

            {loading
              ? "Generating..."
              : "Generate AI Test"}

          </motion.button>

        </form>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    padding: "40px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
  },

  card: {
    width: "100%",

    maxWidth: "500px",

    padding: "40px",

    borderRadius: "30px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(16px)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",
  },

  logo: {
    width: "80px",

    height: "80px",

    margin: "0 auto",

    borderRadius: "22px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    color: "white",

    fontSize: "34px",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.4)",
  },

  title: {
    textAlign: "center",

    color: "white",

    marginTop: "20px",

    fontSize: "38px",
  },

  subtitle: {
    textAlign: "center",

    color: "#aaa",

    marginBottom: "30px",
  },

  inputBox: {
    display: "flex",

    alignItems:
      "center",

    gap: "12px",

    marginBottom: "18px",

    padding:
      "14px 18px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  icon: {
    color: "#ff9800",

    fontSize: "18px",
  },

  input: {
    flex: 1,

    background:
      "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "15px",
  },

  select: {
    flex: 1,

    background:
      "#1f2937",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "15px",

    cursor: "pointer",

    padding: "8px",

    borderRadius: "10px",

    appearance: "none",

    WebkitAppearance:
      "none",

    MozAppearance:
      "none",
  },

  button: {
    width: "100%",

    marginTop: "15px",

    padding: "16px",

    border: "none",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.35)",
  },
};

export default CreateTest;