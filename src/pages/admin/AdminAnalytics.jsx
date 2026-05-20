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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
        "#ff9800",
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
        "#ff5e00",
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

  // BAR DATA
  const barData = [

    {
      name:
        "Users",

      value:
        analytics
          ?.totalUsers,
    },

    {
      name:
        "Courses",

      value:
        analytics
          ?.totalCourses,
    },

    {
      name:
        "Tests",

      value:
        analytics
          ?.totalTests,
    },

    {
      name:
        "Classes",

      value:
        analytics
          ?.totalLiveClasses,
    },
  ];

  // PIE DATA
  const pieData = [

    {
      name:
        "Revenue",

      value:
        analytics
          ?.totalRevenue || 0,
    },

    {
      name:
        "Results",

      value:
        analytics
          ?.totalResults || 0,
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
      revenue: 2000,
    },

    {
      month: "Feb",
      revenue: 5000,
    },

    {
      month: "Mar",
      revenue: 8000,
    },

    {
      month: "Apr",
      revenue: 12000,
    },

    {
      month: "May",
      revenue: 18000,
    },
  ];

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>
        Analytics Dashboard 📊
      </h1>

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

              <XAxis dataKey="name" />

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

        {/* LINE CHART */}
        <div
          style={{
            ...styles.chartCard,

            gridColumn:
              "1 / -1",
          }}
        >

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

    marginBottom: "40px",
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

  chartGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",

    gap: "30px",
  },

  chartCard: {
    background:
      "rgba(255,255,255,0.05)",

    borderRadius: "28px",

    padding: "25px",

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
};

export default AdminAnalytics;