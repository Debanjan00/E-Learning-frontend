import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaRobot,
  FaComments,
  FaUserCircle,
  FaVideo,
  FaBookOpen,
  FaHome,
  FaTachometerAlt,
  FaSignOutAlt,
  FaFileAlt,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

function Header() {

  const [user, setUser] =
    useState(null);

  const location =
    useLocation();

  useEffect(() => {

    const u =
      localStorage.getItem(
        "user"
      );

    if (u) {

      setUser(
        JSON.parse(u)
      );
    }

  }, []);

  // LOGOUT
  const logoutHandler = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <motion.div
      initial={{
        y: -30,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.4,
      }}

      style={styles.header}
    >

      {/* LEFT */}
      <div style={styles.left}>

        <div style={styles.logoBox}>
          🚀
        </div>

        <div>

          <h2 style={styles.logo}>
            E-Learning
          </h2>

          <p style={styles.tagline}>
            AI Powered Platform
          </p>

        </div>

      </div>

      {/* CENTER */}
      <div style={styles.nav}>

        <NavItem
          to="/"
          text="Home"
          icon={<FaHome />}
          active={
            location.pathname ===
            "/"
          }
        />

        <NavItem
          to="/courses"
          text="Courses"
          icon={<FaBookOpen />}
          active={
            location.pathname ===
            "/courses"
          }
        />

        {user && (
          <>

            <NavItem
              to="/dashboard"
              text="Dashboard"
              icon={
                <FaTachometerAlt />
              }
              active={
                location.pathname ===
                "/dashboard"
              }
            />

            <NavItem
              to="/resume-builder"
              text="Resume"
              icon={
                <FaFileAlt />
              }
              active={
                location.pathname ===
                "/resume-builder"
              }
            />

            {/* TESTS */}
            <NavItem
              to="/tests"
              text="Tests"
              icon={
                <FaClipboardList />
              }
              active={
                location.pathname ===
                "/tests"
              }
            />

            {/* ANALYTICS */}
            {user?.role ===
              "admin" && (

              <NavItem
                to="/admin-analytics"
                text="Analytics"
                icon={
                  <FaChartBar />
                }
                active={
                  location.pathname ===
                  "/admin-analytics"
                }
              />
            )}

            <NavItem
              to="/account"
              text="Account"
              icon={
                <FaUserCircle />
              }
              active={
                location.pathname ===
                "/account"
              }
            />

            <NavItem
              to="/ai"
              text="AI Tutor"
              icon={<FaRobot />}
              active={
                location.pathname ===
                "/ai"
              }
            />

            <NavItem
              to="/chat"
              text="Chat"
              icon={
                <FaComments />
              }
              active={
                location.pathname ===
                "/chat"
              }
            />

            <NavItem
              to="/live"
              text="Live"
              icon={<FaVideo />}
              active={
                location.pathname ===
                "/live"
              }
            />

          </>
        )}

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        {user ? (

          <motion.button
            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.96,
            }}

            style={
              styles.logoutBtn
            }

            onClick={
              logoutHandler
            }
          >

            <FaSignOutAlt />

            Logout

          </motion.button>

        ) : (

          <div style={styles.authBtns}>

            <Link
              to="/login"
              style={styles.loginBtn}
            >

              Login

            </Link>

            <Link
              to="/register"
              style={
                styles.registerBtn
              }
            >

              Register

            </Link>

          </div>

        )}

      </div>

    </motion.div>
  );
}

// NAV ITEM
const NavItem = ({
  to,
  text,
  icon,
  active,
}) => (

  <Link
    to={to}

    style={{
      ...styles.link,

      ...(active
        ? styles.activeLink
        : {}),
    }}
  >

    {icon}

    <span>
      {text}
    </span>

  </Link>
);

const styles = {

  header: {
    position: "sticky",

    top: 0,

    zIndex: 999,

    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "220px 1fr 120px",

    alignItems: "center",

    gap: "18px",

    padding: "12px 20px",

    background:
      "rgba(15,15,15,0.96)",

    backdropFilter:
      "blur(18px)",

    borderBottom:
      "1px solid rgba(255,140,0,0.08)",

    boxSizing:
      "border-box",
  },

  left: {
    display: "flex",

    alignItems: "center",

    gap: "12px",
  },

  logoBox: {
    width: "46px",

    height: "46px",

    borderRadius: "14px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    fontSize: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    boxShadow:
      "0 0 20px rgba(255,140,0,0.22)",
  },

  logo: {
    margin: 0,

    color: "white",

    fontSize: "20px",

    fontWeight: "700",
  },

  tagline: {
    margin: "2px 0 0 0",

    color: "#8d8d8d",

    fontSize: "10px",

    letterSpacing: "1px",
  },

  nav: {
    display: "grid",

    gridTemplateColumns:
      "repeat(5, 1fr)",

    gap: "8px",

    width: "100%",
  },

  link: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    gap: "6px",

    padding: "8px 8px",

    borderRadius: "12px",

    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,255,255,0.03)",

    color: "#d8d8d8",

    textDecoration:
      "none",

    fontSize: "12px",

    fontWeight: "500",

    transition: "0.25s ease",

    minHeight: "38px",
  },

  activeLink: {
    background:
      "linear-gradient(135deg,#ff9800,#ff6a00)",

    color: "white",

    boxShadow:
      "0 0 18px rgba(255,140,0,0.18)",
  },

  right: {
    display: "flex",

    justifyContent:
      "flex-end",
  },

  logoutBtn: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    gap: "6px",

    width: "115px",

    height: "40px",

    border: "none",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#ff3d00,#ff6a00)",

    color: "white",

    fontWeight: "bold",

    fontSize: "12px",

    cursor: "pointer",

    boxShadow:
      "0 0 16px rgba(255,80,0,0.18)",
  },

  authBtns: {
    display: "flex",

    gap: "8px",
  },

  loginBtn: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    width: "80px",

    height: "38px",

    borderRadius: "12px",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    textDecoration:
      "none",

    fontWeight: "600",

    fontSize: "12px",
  },

  registerBtn: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    width: "90px",

    height: "38px",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    textDecoration:
      "none",

    fontWeight: "600",

    fontSize: "12px",
  },
};

export default Header;