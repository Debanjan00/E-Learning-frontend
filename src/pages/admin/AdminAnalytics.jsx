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
  FaRobot,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

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

  // CARDS
  const cards = [

    {
      title: "Users",

      value:
        analytics?.totalUsers || 0,

      icon:
        FaUsers,

      color:
        "#ff9800",
    },

    {
      title:
        "Courses",

      value:
        analytics?.totalCourses || 0,

      icon:
        FaBook,

      color:
        "#ff5e00",
    },

    {
      title:
        "Tests",

      value:
        analytics?.totalTests || 0,

      icon:
        FaClipboardList,

      color:
        "#10b981",
    },

    {
      title:
        "Live Classes",

      value:
        analytics?.totalLiveClasses || 0,

      icon:
        FaVideo,

      color:
        "#ef4444",
    },

    {
      title:
        "Results",

      value:
        analytics?.totalResults || 0,

      icon:
        FaChartBar,

      color:
        "#8b5cf6",
    },

    {
      title:
        "Revenue",

      value:
        analytics?.totalRevenue || 0,

      icon:
        FaRupeeSign,

      color:
        "#14b8a6",
    },
  ];

  // BAR DATA
  const barData = [

    {
      name:
        "Users",

      value:
        analytics?.totalUsers || 0,
    },

    {
      name:
        "Courses",

      value:
        analytics?.totalCourses || 0,
    },

    {
      name:
        "Tests",

      value:
        analytics?.totalTests || 0,
    },

    {
      name:
        "Classes",

      value:
        analytics?.totalLiveClasses || 0,
    },
  ];

  // PIE DATA
  const pieData = [

    {
      name:
        "Revenue",

      value:
        analytics?.totalRevenue || 0,
    },

    {
      name:
        "Results",

      value:
        analytics?.totalResults || 0,
    },
  ];

  const COLORS = [
    "#ff9800",
    "#ff5e00",
  ];

  // LINE DATA
  const lineData = [

    {
      month: "Jan",
      revenue: 5000,
    },

    {
      month: "Feb",
      revenue: 9000,
    },

    {
      month: "Mar",
      revenue: 12000,
    },

    {
      month: "Apr",
      revenue: 18000,
    },

    {
      month: "May",
      revenue: 25000,
    },
  ];

  return (
    <div style={styles.page}>

      {/* HEADING */}
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

        Futuristic Analytics 🚀

      </motion.h1>

      {/* CARDS */}
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

                {React.createElement(
                  card.icon
                )}

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

      {/* CHARTS */}
      <div style={styles.chartGrid}>

        {/* BAR CHART */}
        <div style={styles.chartCard}>

          <h2 style={styles.chartTitle}>
            Platform Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={barData}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"

                fill="#ff9800"

                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}
        <div style={styles.chartCard}>

          <h2 style={styles.chartTitle}>
            Revenue Ratio
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}

                dataKey="value"

                outerRadius={100}

                label
              >

                {pieData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}

                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LINE CHART */}
      <div style={styles.chartCard}>

        <h2 style={styles.chartTitle}>
          Revenue Growth
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={lineData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"

              dataKey="revenue"

              stroke="#ff9800"

              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* AI CARD */}
      <motion.div
        whileHover={{
          scale: 1.02,
        }}

        style={styles.aiCard}
      >

        <FaRobot
          style={styles.aiIcon}
        />

        <div>

          <h2 style={styles.aiTitle}>
            AI Tutor Activity
          </h2>

          <p style={styles.aiText}>
            1,240 AI conversations
            this month 🚀
          </p>

        </div>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    padding: "20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    overflowX:
      "hidden",
  },

  heading: {
    color: "white",

    textAlign:
      "center",

    marginBottom: "30px",

    fontSize:
      "clamp(28px,6vw,52px)",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: "20px",

    marginBottom: "30px",
  },

  card: {
    padding: "22px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(14px)",

    border:
      "2px solid",

    textAlign: "center",

    boxShadow:
      "0 0 30px rgba(255,152,0,0.1)",
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

    fontSize:
      "clamp(28px,6vw,40px)",

    marginBottom: "10px",
  },

  title: {
    color: "#aaa",

    fontSize:
      "clamp(14px,3vw,18px)",
  },

  chartGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "25px",

    marginBottom: "30px",
  },

  chartCard: {
    background:
      "rgba(255,255,255,0.05)",

    borderRadius: "24px",

    padding: "18px",

    backdropFilter:
      "blur(14px)",

    boxShadow:
      "0 0 25px rgba(255,255,255,0.05)",
  },

  chartTitle: {
    color: "white",

    marginBottom: "20px",

    textAlign: "center",
  },

  aiCard: {
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    borderRadius: "26px",

    padding: "22px",

    display: "flex",

    flexWrap: "wrap",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap: "18px",

    color: "white",

    textAlign: "center",

    boxShadow:
      "0 0 40px rgba(255,152,0,0.3)",
  },

  aiIcon: {
    fontSize: "60px",
  },

  aiTitle: {
    fontSize:
      "clamp(22px,5vw,30px)",
  },

  aiText: {
    marginTop: "8px",

    opacity: 0.9,
  },
};

export default AdminAnalytics;