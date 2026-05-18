import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  motion,
} from "framer-motion";

import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaVideo,
  FaChartBar,
  FaRupeeSign,
} from "react-icons/fa";

import { server }
from "../../main";

function AdminAnalytics() {

  const [analytics,
    setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  // FETCH ANALYTICS
  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/admin/analytics`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAnalytics(
          data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const cards = [

    {
      title:
        "Users",

      value:
        analytics
          ?.totalUsers,

      icon:
        <FaUsers />,

      color:
        "#3b82f6",
    },

    {
      title:
        "Courses",

      value:
        analytics
          ?.totalCourses,

      icon:
        <FaBook />,

      color:
        "#10b981",
    },

    {
      title:
        "Tests",

      value:
        analytics
          ?.totalTests,

      icon:
        <FaClipboardList />,

      color:
        "#f59e0b",
    },

    {
      title:
        "Live Classes",

      value:
        analytics
          ?.totalLiveClasses,

      icon:
        <FaVideo />,

      color:
        "#ef4444",
    },

    {
      title:
        "Results",

      value:
        analytics
          ?.totalResults,

      icon:
        <FaChartBar />,

      color:
        "#8b5cf6",
    },

    {
      title:
        "Revenue",

      value:
        `₹${analytics?.totalRevenue}`,

      icon:
        <FaRupeeSign />,

      color:
        "#14b8a6",
    },
  ];

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>
        Analytics Dashboard 📊
      </h1>

      <div style={styles.grid}>

        {cards.map(
          (
            card,
            index
          ) => (

            <motion.div
              key={index}

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
                  index * 0.1,
              }}

              whileHover={{
                scale: 1.03,
              }}

              style={{
                ...styles.card,

                borderColor:
                  card.color,
              }}
            >

              <div
                style={{
                  ...styles.icon,

                  background:
                    card.color,
                }}
              >

                {card.icon}

              </div>

              <h2
                style={
                  styles.value
                }
              >

                {card.value}

              </h2>

              <p
                style={
                  styles.title
                }
              >

                {card.title}

              </p>

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

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "25px",
  },

  card: {
    padding: "30px",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(14px)",

    border:
      "2px solid",

    textAlign: "center",

    boxShadow:
      "0 0 25px rgba(255,255,255,0.05)",
  },

  icon: {
    width: "70px",

    height: "70px",

    borderRadius: "20px",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    margin:
      "0 auto 20px auto",

    color: "white",

    fontSize: "30px",
  },

  value: {
    color: "white",

    fontSize: "38px",

    marginBottom: "10px",
  },

  title: {
    color: "#aaa",

    fontSize: "18px",
  },
};

export default AdminAnalytics;