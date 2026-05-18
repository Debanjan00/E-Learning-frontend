import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server }
from "../../main";

function TestResults() {

  const [results,
    setResults] =
    useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/test/results/all`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setResults(data);

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        Student Test Results
      </h1>

      {results.length === 0 ? (

        <p style={styles.empty}>
          No results found
        </p>

      ) : (

        <div style={styles.grid}>

          {results.map(
            (result) => (

              <div
                key={result._id}
                style={styles.card}
              >

                <h2>
                  {
                    result.student
                      ?.name
                  }
                </h2>

                <p>
                  📧 {
                    result.student
                      ?.email
                  }
                </p>

                <p>
                  📝 Test:
                  {" "}
                  {
                    result.test
                      ?.title
                  }
                </p>

                <p>
                  🎯 Score:
                  {" "}
                  {result.score}
                  /
                  {
                    result.totalQuestions
                  }
                </p>

                <p>
                  📊 Percentage:
                  {" "}
                  {
                    result.percentage
                  }%
                </p>

                <p>
                  ⏰ {
                    new Date(
                      result.createdAt
                    ).toLocaleString()
                  }
                </p>

              </div>
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

    background:
      "#0f0f0f",

    padding: "30px",
  },

  title: {
    color: "white",

    textAlign:
      "center",

    marginBottom: "30px",
  },

  empty: {
    color: "white",

    textAlign:
      "center",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",

    gap: "20px",
  },

  card: {
    background:
      "rgba(255,255,255,0.05)",

    padding: "20px",

    borderRadius: "18px",

    color: "white",

    border:
      "1px solid rgba(255,140,0,0.2)",
  },
};

export default TestResults;