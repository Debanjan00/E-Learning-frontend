import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import { server }
from "../../main";

import {
  motion,
} from "framer-motion";

function StudentTest() {

  const { id } =
    useParams();

  const [test,
    setTest] =
    useState(null);

  const [answers,
    setAnswers] =
    useState({});

  const [score,
    setScore] =
    useState(null);

  const [submitted,
    setSubmitted] =
    useState(false);

  useEffect(() => {

    fetchTest();

  }, []);

  // ✅ FETCH TEST
  const fetchTest =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/test/${id}`
          );

        setTest(data);

      } catch (error) {

        console.log(error);
      }
    };

  // ✅ SELECT ANSWER
  const selectAnswer =
    (
      questionIndex,
      option
    ) => {

      setAnswers({
        ...answers,

        [questionIndex]:
          option,
      });
    };

  // ✅ SUBMIT TEST
  const submitTest =
    async () => {

      let correct = 0;

      test.questions.forEach(
        (q, index) => {

          if (
            answers[index] ===
            q.correctAnswer
          ) {

            correct++;
          }
        }
      );

      const finalScore =
        Math.round(
          (correct /
            test.questions.length) *
            100
        );

      setScore(finalScore);

      setSubmitted(true);

      // ✅ SAVE RESULT
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          `${server}/api/test/save-result`,
          {
            testId:
              test._id,

            score:
              correct,

            totalQuestions:
              test.questions.length,

            percentage:
              finalScore,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Result saved ✅"
        );

      } catch (error) {

        console.log(error);
      }
    };

  // LOADING
  if (!test)
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );

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

        {/* TITLE */}
        <h1 style={styles.title}>
          {test.title}
        </h1>

        <p style={styles.sub}>
          Difficulty:
          {" "}
          {test.difficulty}
        </p>

        {/* QUESTIONS */}
        {test.questions.map(
          (
            q,
            index
          ) => (

            <div
              key={index}

              style={
                styles.questionBox
              }
            >

              <h3
                style={
                  styles.question
                }
              >

                {index + 1}.
                {" "}
                {q.question}

              </h3>

              {q.options.map(
                (
                  option,
                  i
                ) => (

                  <button
                    key={i}

                    onClick={() =>
                      selectAnswer(
                        index,
                        option
                      )
                    }

                    style={{
                      ...styles.option,

                      background:
                        answers[
                          index
                        ] ===
                        option
                          ? "#ff9800"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >

                    {option}

                  </button>
                )
              )}

            </div>
          )
        )}

        {/* SUBMIT BUTTON */}
        {!submitted && (

          <motion.button
            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.96,
            }}

            style={
              styles.submitBtn
            }

            onClick={
              submitTest
            }
          >

            Submit Test

          </motion.button>
        )}

        {/* RESULT */}
        {submitted && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            style={
              styles.resultBox
            }
          >

            <h2>
              Your Score:
              {" "}
              {score}%
            </h2>

            {score >= 70 ? (

              <p
                style={{
                  color:
                    "#4ade80",

                  fontWeight:
                    "bold",
                }}
              >

                Passed ✅

              </p>

            ) : (

              <p
                style={{
                  color:
                    "#f87171",

                  fontWeight:
                    "bold",
                }}
              >

                Failed ❌

              </p>
            )}

          </motion.div>
        )}

      </motion.div>

    </div>
  );
}

const styles = {

  loading: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    background:
      "#0f0f0f",

    color: "white",

    fontSize: "22px",
  },

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    padding: "40px",

    display: "flex",

    justifyContent:
      "center",
  },

  card: {
    width: "100%",

    maxWidth: "900px",

    padding: "40px",

    borderRadius: "30px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(14px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.08)",
  },

  title: {
    color: "white",

    textAlign:
      "center",

    fontSize: "42px",

    marginBottom: "10px",
  },

  sub: {
    textAlign:
      "center",

    color: "#aaa",

    marginBottom: "35px",
  },

  questionBox: {
    marginBottom: "30px",

    padding: "22px",

    borderRadius: "22px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,140,0,0.1)",
  },

  question: {
    color: "white",

    marginBottom: "18px",

    lineHeight: "1.5",
  },

  option: {
    width: "100%",

    padding: "14px",

    marginBottom: "12px",

    border: "none",

    borderRadius: "14px",

    color: "white",

    cursor: "pointer",

    textAlign: "left",

    transition:
      "0.3s",

    fontSize: "15px",
  },

  submitBtn: {
    width: "100%",

    padding: "18px",

    border: "none",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.3)",
  },

  resultBox: {
    marginTop: "35px",

    padding: "30px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.05)",

    textAlign:
      "center",

    color: "white",

    border:
      "1px solid rgba(255,140,0,0.15)",
  },
};

export default StudentTest;