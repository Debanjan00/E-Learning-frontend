import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaBolt,
  FaCheckCircle,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";

import { server }
from "../../main";

function BuyCourse() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [course,
    setCourse] =
    useState(null);

  useEffect(() => {

    fetchCourse();

  }, []);

  // FETCH COURSE
  const fetchCourse =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${server}/api/course/${id}`
          );

        setCourse(data);

      } catch (error) {

        console.log(error);
      }
    };

  // BUY
  const handleBuy =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // CREATE ORDER
        const { data } =
          await axios.post(
            `${server}/api/payment/create-order`,
            {
              courseId: id,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const options = {

          key:
            "rzp_test_Siosd3aPa271Y0",

          amount:
            data.order.amount,

          currency:
            data.order.currency,

          name:
            "E-Learning",

          description:
            "Course Purchase",

          order_id:
            data.order.id,

          handler:
            async function (
              response
            ) {

              try {

                await axios.post(
                  `${server}/api/payment/verify`,
                  {
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    courseId: id,
                  },
                  {
                    headers: {
                      Authorization:
                        `Bearer ${token}`,
                    },
                  }
                );

                alert(
                  "Payment Successful ✅"
                );

                navigate(
                  "/dashboard"
                );

              } catch (error) {

                console.log(error);

                alert(
                  "Payment verification failed ❌"
                );
              }
            },

          theme: {
            color:
              "#ff9800",
          },
        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();

      } catch (error) {

        console.log(error);

        alert(
          "Payment failed ❌"
        );
      }
    };

  if (!course) {

    return (

      <div style={styles.loading}>

        Loading...

      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        style={styles.card}
      >

        {/* LEFT */}
        <div style={styles.left}>

          <img
            src={
              course.image ||
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
            }

            alt="course"

            style={styles.image}
          />

        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          <div style={styles.tag}>

            <FaBolt />

            Premium Course

          </div>

          <h1 style={styles.title}>
            {course.title}
          </h1>

          <p style={styles.desc}>
            {
              course.description
            }
          </p>

          {/* FEATURES */}
          <div style={styles.features}>

            <div style={styles.feature}>

              <FaCheckCircle />

              Lifetime Access

            </div>

            <div style={styles.feature}>

              <FaCheckCircle />

              Certificate Included

            </div>

            <div style={styles.feature}>

              <FaCheckCircle />

              AI Powered Learning

            </div>

            <div style={styles.feature}>

              <FaCheckCircle />

              Live Classes Access

            </div>

          </div>

          {/* PRICE */}
          <div style={styles.price}>

            ₹ {course.price}

          </div>

          {/* BUTTONS */}
          <div style={styles.btnGroup}>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.backBtn
              }

              onClick={() =>
                navigate(-1)
              }
            >

              <FaArrowLeft />

              Back

            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.buyBtn
              }

              onClick={
                handleBuy
              }
            >

              <FaLock />

              Buy Now

            </motion.button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    padding: "120px 20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    position: "relative",

    overflow: "hidden",
  },

  glow1: {
    position: "absolute",

    top: "-100px",

    left: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-100px",

    right: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  card: {
    width: "100%",

    maxWidth: "1150px",

    display: "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap: "40px",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.15)",

    borderRadius: "32px",

    overflow: "hidden",

    padding: "35px",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.08)",

    position: "relative",

    zIndex: 2,
  },

  left: {
    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",
  },

  image: {
    width: "100%",

    maxHeight: "450px",

    objectFit: "cover",

    borderRadius: "24px",
  },

  right: {
    color: "white",

    display: "flex",

    flexDirection:
      "column",

    justifyContent:
      "center",
  },

  tag: {
    display: "inline-flex",

    alignItems:
      "center",

    gap: "8px",

    width: "fit-content",

    padding:
      "10px 16px",

    borderRadius: "14px",

    background:
      "rgba(255,140,0,0.15)",

    color: "#ff9800",

    marginBottom: "20px",
  },

  title: {
    fontSize: "46px",

    marginBottom: "18px",

    color: "white",
  },

  desc: {
    color: "#bbb",

    lineHeight: "1.8",

    marginBottom: "25px",
  },

  features: {
    display: "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap: "14px",

    marginBottom: "30px",
  },

  feature: {
    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    color: "#ddd",
  },

  price: {
    fontSize: "42px",

    fontWeight: "bold",

    color: "#ff9800",

    marginBottom: "30px",

    textShadow:
      "0 0 18px rgba(255,140,0,0.3)",
  },

  btnGroup: {
    display: "flex",

    gap: "18px",
  },

  backBtn: {
    border: "none",

    padding:
      "14px 24px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",

    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    cursor: "pointer",

    fontWeight: "bold",
  },

  buyBtn: {
    border: "none",

    padding:
      "14px 28px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    display: "flex",

    alignItems:
      "center",

    gap: "10px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.3)",
  },

  loading: {
    minHeight: "100vh",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    background:
      "#111827",

    color: "white",

    fontSize: "24px",
  },
};

export default BuyCourse;