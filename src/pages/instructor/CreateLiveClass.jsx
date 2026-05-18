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

import { server } from "../../main";

import {
  motion,
} from "framer-motion";

import {
  FaVideo,
  FaRobot,
  FaLink,
  FaCalendarAlt,
  FaClock,
  FaBookOpen,
  FaBolt,
} from "react-icons/fa";

function CreateLiveClass() {

  const navigate =
    useNavigate();

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      link: "",
      course: "",
      date: "",
      time: "",
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

  // SUBMIT
  const submitHandler =
    async () => {

      try {

        if (
          !form.title ||
          !form.link ||
          !form.course ||
          !form.date ||
          !form.time
        ) {

          toast.error(
            "Fill all fields ❌"
          );

          return;
        }

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const payload = {
          title:
            form.title,

          courseId:
            form.course,

          meetingLink:
            form.link,

          date:
            `${form.date}T${form.time}`,
        };

        const { data } =
          await axios.post(
            `${server}/api/live/create`,
            payload,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // ✅ SUCCESS TOAST
        toast.success(
          "Live Class Created 📹"
        );

        // ✅ REDIRECT
        navigate("/live");

      } catch (error) {

        console.log(
          error.response?.data
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Error ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

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

        style={styles.card}
      >

        {/* LOGO */}
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

        {/* TITLE */}
        <h1 style={styles.title}>
          Create Live Class
        </h1>

        <p style={styles.subtitle}>
          Launch futuristic AI
          powered live learning 🚀
        </p>

        {/* TITLE */}
        <div style={styles.inputBox}>

          <FaBolt style={styles.icon} />

          <input
            placeholder="Live Class Title"

            value={form.title}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />

        </div>

        {/* LINK */}
        <div style={styles.inputBox}>

          <FaLink style={styles.icon} />

          <input
            placeholder="Google Meet Link"

            value={form.link}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                link:
                  e.target.value,
              })
            }
          />

        </div>

        {/* COURSE */}
        <div style={styles.inputBox}>

          <FaBookOpen
            style={styles.icon}
          />

          <select
            value={form.course}

            style={styles.select}

            onChange={(e) =>
              setForm({
                ...form,
                course:
                  e.target.value,
              })
            }
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
              (c) => (

                <option
                  key={c._id}

                  value={c._id}

                  style={{
                    background:
                      "#1f2937",

                    color:
                      "white",
                  }}
                >

                  {c.title}

                </option>
              )
            )}

          </select>

        </div>

        {/* DATE */}
        <div style={styles.inputBox}>

          <FaCalendarAlt
            style={styles.icon}
          />

          <input
            type="date"

            value={form.date}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                date:
                  e.target.value,
              })
            }
          />

        </div>

        {/* TIME */}
        <div style={styles.inputBox}>

          <FaClock
            style={styles.icon}
          />

          <input
            type="time"

            value={form.time}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                time:
                  e.target.value,
              })
            }
          />

        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}

          whileTap={{
            scale: 0.95,
          }}

          style={styles.button}

          onClick={
            submitHandler
          }

          disabled={
            loading
          }
        >

          <FaVideo />

          {loading
            ? "Creating..."
            : "Create Live Class"}

        </motion.button>

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

    alignItems: "center",

    padding: "30px",

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
      "rgba(255,140,0,0.18)",

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
      "rgba(255,94,0,0.18)",

    filter: "blur(90px)",
  },

  card: {
    width: "100%",

    maxWidth: "520px",

    padding: "42px",

    borderRadius: "30px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 40px rgba(255,140,0,0.08)",

    position: "relative",

    zIndex: 2,
  },

  logo: {
    width: "85px",

    height: "85px",

    borderRadius: "26px",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    margin:
      "0 auto 24px auto",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontSize: "38px",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.35)",
  },

  title: {
    textAlign: "center",

    color: "white",

    fontSize: "40px",

    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",

    color: "#aaa",

    marginBottom: "35px",

    lineHeight: "1.7",
  },

  inputBox: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    marginBottom: "18px",

    padding:
      "14px 18px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.04)",

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

    border: "none",

    padding: "16px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    gap: "10px",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    marginTop: "10px",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.35)",
  },
};

export default CreateLiveClass;