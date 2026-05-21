import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaPlay,
  FaLock,
  FaVideo,
  FaBolt,
} from "react-icons/fa";

function CourseDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  const [
    isPurchased,
    setIsPurchased,
  ] = useState(false);

  const [
    completedLectures,
    setCompletedLectures,
  ] = useState([]);

  const isMobile =
    window.innerWidth <= 768;

  useEffect(() => {

    fetchCourse();

    checkPurchase();

    fetchProgress();

  }, [id]);

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

        alert(
          "Error loading course"
        );
      }
    };

  // CHECK PURCHASE
  const checkPurchase =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token)
          return;

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

        const myCourses =
          data.courses ||
          data;

        const found =
          myCourses.find(
            (c) =>
              c &&
              c._id === id
          );

        if (found) {

          setIsPurchased(
            true
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  // FETCH PROGRESS
  const fetchProgress =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            `${server}/api/progress/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCompletedLectures(
          data.completedLectures ||
            []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // MARK COMPLETE
  const markComplete =
    async (lectureId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          `${server}/api/progress/complete`,
          {
            courseId: id,
            lectureId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setCompletedLectures(
          [
            ...completedLectures,
            lectureId,
          ]
        );

      } catch (error) {

        console.log(error);
      }
    };

  // PAYMENT
  const handlePayment =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          navigate(
            "/login"
          );

          return;
        }

        const { data } =
          await axios.post(
            `${server}/api/payment/create-order`,
            {
              courseId:
                String(id),
            },
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        const order =
          data.order;

        const options = {
          key:
            "rzp_test_Siosd3aPa271Y0",

          amount:
            order.amount,

          currency:
            "INR",

          name:
            "E-Learning",

          description:
            "Course Purchase",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              await axios.post(
                `${server}/api/payment/verify`,
                {
                  ...response,

                  courseId:
                    String(id),
                },
                {
                  headers: {
                    Authorization:
                      token,
                  },
                }
              );

              alert(
                "Payment successful 🎉"
              );

              setIsPurchased(
                true
              );

              navigate(
                "/dashboard"
              );
            },

          theme: {
            color:
              "#ff8c00",
          },
        };

        const rzp =
          new window.Razorpay(
            options
          );

        rzp.open();

      } catch (error) {

        console.log(
          error.response?.data
        );

        alert(
          "Payment failed"
        );
      }
    };

  if (!course) {

    return (
      <div
        style={
          styles.loading
        }
      >
        Loading...
      </div>
    );
  }

  const progressPercent =
    course?.lectures?.length
      ? Math.round(
          (
            completedLectures.length /
            course.lectures.length
          ) * 100
        )
      : 0;

  return (
    <div
      style={
        styles.page
      }
    >

      <div
        style={
          styles.glow1
        }
      ></div>

      <div
        style={
          styles.glow2
        }
      ></div>

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
          duration: 0.6,
        }}

        style={
          styles.container
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
              course.image ||
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

            AI Powered Course

          </div>

        </div>

        {/* CONTENT */}
        <div
          style={
            styles.content
          }
        >

          <h1
            style={
              styles.title
            }
          >
            {course.title}
          </h1>

          <p
            style={
              styles.description
            }
          >
            {
              course.description
            }
          </p>

          {/* PRICE */}
          <div
            style={
              styles.priceBox
            }
          >

            ₹ {course.price}

          </div>

          {/* BUTTON */}
          {isPurchased ? (

            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.btn
              }

              onClick={() => {

                const lectureSection =
                  document.getElementById(
                    "lectures"
                  );

                lectureSection?.scrollIntoView({
                  behavior:
                    "smooth",
                });
              }}
            >

              <FaPlay />

              Start Learning

            </motion.button>

          ) : (

            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={
                styles.btn
              }

              onClick={
                handlePayment
              }
            >

              Buy Course 🚀

            </motion.button>

          )}

          {/* PROGRESS */}
          {isPurchased && (

            <div
              style={
                styles.progressBox
              }
            >

              <div
                style={
                  styles.progressTop
                }
              >

                <span>
                  Course Progress
                </span>

                <span>
                  {progressPercent}%
                </span>

              </div>

              <div
                style={
                  styles.progressBar
                }
              >

                <div
                  style={{
                    ...styles.progressFill,

                    width:
                      `${progressPercent}%`,
                  }}
                ></div>

              </div>

            </div>
          )}

          {/* LECTURES */}
          <div
            id="lectures"

            style={
              styles.lectureSection
            }
          >

            <h2
              style={
                styles.lectureTitle
              }
            >

              <FaVideo />

              Course Lectures

            </h2>

            {isPurchased ? (

              course.lectures &&
              course.lectures
                .length >
                0 ? (

                course.lectures.map(
                  (lec) => (

                    <motion.div
                      key={
                        lec._id
                      }

                      whileHover={{
                        scale:
                          1.01,
                      }}

                      style={
                        styles.lectureCard
                      }
                    >

                      <h3
                        style={
                          styles.lecName
                        }
                      >
                        {
                          lec.title
                        }
                      </h3>

                      <video
                        controls

                        controlsList="nodownload"

                        style={
                          styles.video
                        }
                      >

                        <source
                          src={
                            lec.videoUrl
                          }

                          type="video/mp4"
                        />

                      </video>

                      <button
                        style={
                          styles.completeBtn
                        }

                        onClick={() =>
                          markComplete(
                            lec._id
                          )
                        }

                        disabled={
                          completedLectures.includes(
                            lec._id
                          )
                        }
                      >

                        {
                          completedLectures.includes(
                            lec._id
                          )
                            ? "Completed ✅"
                            : "Mark Complete"
                        }

                      </button>

                    </motion.div>
                  )
                )

              ) : (

                <p
                  style={
                    styles.empty
                  }
                >
                  No lectures
                  available
                </p>
              )

            ) : (

              <div
                style={
                  styles.locked
                }
              >

                <FaLock />

                Purchase course to
                unlock lectures

              </div>
            )}

          </div>

        </div>

      </motion.div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    paddingTop:
      window.innerWidth <= 768
        ? "80px"
        : "90px",

    paddingBottom:
      window.innerWidth <= 768
        ? "20px"
        : "40px",

    paddingLeft:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    paddingRight:
      window.innerWidth <= 768
        ? "10px"
        : "20px",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    position: "relative",

    overflowX: "hidden",

    boxSizing:
      "border-box",
  },

  glow1: {
    position: "absolute",

    top: "-100px",

    left: "-100px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.15)",

    filter: "blur(90px)",
  },

  glow2: {
    position: "absolute",

    bottom: "-100px",

    right: "-100px",

    width:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "350px",

    borderRadius: "50%",

    background:
      "rgba(255,94,0,0.15)",

    filter: "blur(90px)",
  },

  loading: {
    color: "white",

    textAlign: "center",

    marginTop: "150px",

    fontSize:
      window.innerWidth <= 768
        ? "20px"
        : "24px",
  },

  container: {
    maxWidth: "1100px",

    margin: "auto",

    background:
      "rgba(255,255,255,0.04)",

    backdropFilter:
      "blur(18px)",

    borderRadius:
      window.innerWidth <= 768
        ? "20px"
        : "30px",

    overflow: "hidden",

    border:
      "1px solid rgba(255,140,0,0.15)",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    position: "relative",

    zIndex: 2,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",

    height:
      window.innerWidth <= 768
        ? "220px"
        : "420px",

    objectFit: "cover",
  },

  overlay: {
    position: "absolute",

    bottom:
      window.innerWidth <= 768
        ? "12px"
        : "20px",

    left:
      window.innerWidth <= 768
        ? "12px"
        : "20px",

    display: "flex",

    alignItems: "center",

    gap:
      window.innerWidth <= 768
        ? "8px"
        : "10px",

    padding:
      window.innerWidth <= 768
        ? "10px 14px"
        : "12px 20px",

    borderRadius: "18px",

    background:
      "rgba(0,0,0,0.6)",

    color: "white",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "15px",
  },

  content: {
    padding:
      window.innerWidth <= 768
        ? "18px"
        : "35px",
  },

  title: {
    color: "white",

    fontSize:
      window.innerWidth <= 768
        ? "28px"
        : "42px",

    marginBottom: "15px",

    lineHeight: "1.2",

    wordBreak:
      "break-word",
  },

  description: {
    color: "#bbb",

    lineHeight: "1.8",

    fontSize:
      window.innerWidth <= 768
        ? "14px"
        : "16px",
  },

  priceBox: {
    marginTop: "25px",

    display: "inline-block",

    padding:
      window.innerWidth <= 768
        ? "10px 16px"
        : "12px 22px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    fontSize:
      window.innerWidth <= 768
        ? "20px"
        : "24px",
  },

  btn: {
    marginTop: "25px",

    border: "none",

    width:
      window.innerWidth <= 768
        ? "100%"
        : "fit-content",

    justifyContent:
      "center",

    padding:
      window.innerWidth <= 768
        ? "14px"
        : "16px 28px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    fontSize:
      window.innerWidth <= 768
        ? "14px"
        : "16px",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    cursor: "pointer",
  },

  progressBox: {
    marginTop: "30px",

    marginBottom: "30px",
  },

  progressTop: {
    display: "flex",

    justifyContent:
      "space-between",

    color: "white",

    marginBottom: "10px",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "15px",
  },

  progressBar: {
    width: "100%",

    height:
      window.innerWidth <= 768
        ? "10px"
        : "12px",

    borderRadius: "20px",

    background:
      "rgba(255,255,255,0.1)",

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    borderRadius: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
  },

  lectureSection: {
    marginTop: "50px",
  },

  lectureTitle: {
    color: "white",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    marginBottom: "25px",

    fontSize:
      window.innerWidth <= 768
        ? "22px"
        : "28px",
  },

  lectureCard: {
    padding:
      window.innerWidth <= 768
        ? "14px"
        : "20px",

    borderRadius:
      window.innerWidth <= 768
        ? "18px"
        : "22px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    marginBottom: "25px",
  },

  lecName: {
    color: "white",

    marginBottom: "15px",

    fontSize:
      window.innerWidth <= 768
        ? "18px"
        : "22px",

    lineHeight: "1.4",
  },

  video: {
    width: "100%",

    borderRadius:
      window.innerWidth <= 768
        ? "14px"
        : "18px",

    background: "black",

    maxHeight:
      window.innerWidth <= 768
        ? "220px"
        : "500px",
  },

  completeBtn: {
    marginTop: "14px",

    border: "none",

    width:
      window.innerWidth <= 768
        ? "100%"
        : "fit-content",

    padding:
      window.innerWidth <= 768
        ? "12px"
        : "12px 18px",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "white",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize:
      window.innerWidth <= 768
        ? "13px"
        : "15px",
  },

  locked: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    padding:
      window.innerWidth <= 768
        ? "16px"
        : "20px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.04)",

    color: "#aaa",

    marginTop: "20px",

    fontSize:
      window.innerWidth <= 768
        ? "14px"
        : "16px",

    flexWrap: "wrap",
  },

  empty: {
    color: "#888",

    fontSize:
      window.innerWidth <= 768
        ? "14px"
        : "16px",
  },
};

export default CourseDetail;