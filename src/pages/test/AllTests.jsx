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

import {
  motion,
} from "framer-motion";

import {
  FaRobot,
  FaClock,
  FaSignal,
  FaBook,
  FaTrash,
  FaPlus,
  FaChartBar,
} from "react-icons/fa";

import { server }
from "../../main";

function AllTests() {

  const [tests,
    setTests] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    fetchTests();

  }, []);

  // FETCH TESTS
  const fetchTests =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/test`
          );

        setTests(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load tests ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  // DELETE TEST
  const deleteTest =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const confirmDelete =
          window.confirm(
            "Delete this test?"
          );

        if (!confirmDelete)
          return;

        await axios.delete(
          `${server}/api/test/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setTests(
          tests.filter(
            (t) =>
              t._id !== id
          )
        );

        // ✅ SUCCESS TOAST
        toast.success(
          "Test deleted ✅"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete failed ❌"
        );
      }
    };

  if (loading)
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );

  return (
    <div style={styles.page}>

      <motion.h1
        initial={{
          opacity: 0,
          y: -20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        style={styles.heading}
      >

        AI Smart Tests 🚀

      </motion.h1>

      {/* ADMIN ACTIONS */}
      {(user?.role ===
        "admin" ||
        user?.role ===
          "instructor") && (

        <div
          style={
            styles.topBar
          }
        >

          <div
            style={
              styles.actionButtons
            }
          >

            {/* CREATE TEST */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.96,
              }}

              style={
                styles.createBtn
              }

              onClick={() =>
                navigate(
                  "/create-test"
                )
              }
            >

              <FaPlus />

              Create AI Test

            </motion.button>

            {/* RESULTS */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.96,
              }}

              style={
                styles.resultBtn
              }

              onClick={() =>
                navigate(
                  "/test-results"
                )
              }
            >

              <FaChartBar />

              View Results

            </motion.button>

          </div>

        </div>
      )}

      {tests.length === 0 ? (

        <p style={styles.noTest}>
          No tests available
        </p>

      ) : (

        <div style={styles.grid}>

          {tests.map(
            (test) => (

              <motion.div
                key={test._id}

                whileHover={{
                  y: -5,
                }}

                style={styles.card}
              >

                {/* ICON */}
                <div
                  style={
                    styles.logo
                  }
                >

                  <FaRobot />

                </div>

                {/* TITLE */}
                <h2
                  style={
                    styles.title
                  }
                >

                  {test.title}

                </h2>

                {/* COURSE */}
                <p style={styles.info}>

                  <FaBook />

                  {
                    test.course
                      ?.title
                  }

                </p>

                {/* DIFFICULTY */}
                <p style={styles.info}>

                  <FaSignal />

                  {
                    test.difficulty
                  }

                </p>

                {/* QUESTIONS */}
                <p style={styles.info}>

                  <FaClock />

                  {
                    test.questions
                      ?.length
                  }
                  {" "}
                  Questions

                </p>

                {/* START BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  style={
                    styles.button
                  }

                  onClick={() =>
                    navigate(
                      `/test/${test._id}`
                    )
                  }
                >

                  Start Test

                </motion.button>

                {/* DELETE BUTTON */}
                {(user?.role ===
                  "admin" ||
                  user?.role ===
                    "instructor") && (

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    style={
                      styles.deleteBtn
                    }

                    onClick={() =>
                      deleteTest(
                        test._id
                      )
                    }
                  >

                    <FaTrash />

                    Delete Test

                  </motion.button>
                )}

              </motion.div>
            )
          )}

        </div>
      )}

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    padding: "40px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
  },

  heading: {
    color: "white",

    textAlign:
      "center",

    marginBottom: "40px",

    fontSize: "48px",
  },

  topBar: {
    display: "flex",

    justifyContent:
      "flex-end",

    marginBottom: "30px",
  },

  actionButtons: {
    display: "flex",

    gap: "14px",
  },

  createBtn: {
    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    padding:
      "14px 22px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",

    boxShadow:
      "0 0 18px rgba(255,140,0,0.22)",
  },

  resultBtn: {
    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    padding:
      "14px 22px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",

    boxShadow:
      "0 0 18px rgba(37,99,235,0.25)",
  },

  noTest: {
    color: "#aaa",

    textAlign:
      "center",
  },

  loading: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    color: "white",

    background:
      "#0f0f0f",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",

    gap: "25px",
  },

  card: {
    padding: "30px",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(14px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.08)",
  },

  logo: {
    width: "70px",

    height: "70px",

    borderRadius: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    color: "white",

    fontSize: "28px",

    marginBottom: "20px",
  },

  title: {
    color: "white",

    marginBottom: "20px",
  },

  info: {
    color: "#ccc",

    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    marginBottom: "10px",
  },

  button: {
    width: "100%",

    marginTop: "20px",

    padding: "15px",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "15px",
  },

  deleteBtn: {
    width: "100%",

    marginTop: "12px",

    padding: "14px",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff3d00,#ff1744)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "14px",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    gap: "8px",
  },
};

export default AllTests;