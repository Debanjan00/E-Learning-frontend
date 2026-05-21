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
  FaInfoCircle,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

function Header() {

  const [user, setUser] =
    useState(null);

  const location =
    useLocation();

  const isMobile =
    window.innerWidth <= 768;

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

  // =========================
  // LOGOUT
  // =========================

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
      style={{
        ...styles.header,

        flexDirection:
          isMobile
            ? "column"
            : "row",

        gap: isMobile
          ? "12px"
          : "18px",

        padding: isMobile
          ? "12px"
          : "12px 20px",
      }}
    >

      {/* LEFT */}

      <div
        style={{
          ...styles.left,

          justifyContent:
            isMobile
              ? "center"
              : "flex-start",
        }}
      >

        <div
          style={{
            ...styles.logoBox,

            width: isMobile
              ? "42px"
              : "46px",

            height: isMobile
              ? "42px"
              : "46px",

            fontSize: isMobile
              ? "18px"
              : "20px",
          }}
        >
          🚀
        </div>

        <div>

          <h2
            style={{
              ...styles.logo,

              fontSize: isMobile
                ? "18px"
                : "20px",
            }}
          >
            E-Learning
          </h2>

          <p
            style={{
              ...styles.tagline,

              fontSize: isMobile
                ? "9px"
                : "10px",
            }}
          >
            AI Powered Platform
          </p>

        </div>

      </div>

      {/* CENTER */}

      <div
        style={{
          ...styles.nav,

          width: "100%",

          justifyContent:
            isMobile
              ? "flex-start"
              : "center",

          paddingBottom:
            isMobile
              ? "4px"
              : "0",
        }}
      >

        {/* HOME */}

        <NavItem
          to="/"
          text="Home"
          icon={<FaHome />}
          active={
            location.pathname ===
            "/"
          }
          isMobile={isMobile}
        />

        {/* COURSES */}

        <NavItem
          to="/courses"
          text="Courses"
          icon={<FaBookOpen />}
          active={
            location.pathname ===
            "/courses"
          }
          isMobile={isMobile}
        />

        {/* ABOUT */}

        <NavItem
          to="/about"
          text="About"
          icon={<FaInfoCircle />}
          active={
            location.pathname ===
            "/about"
          }
          isMobile={isMobile}
        />

        {user && (
          <>

            {/* DASHBOARD */}

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
              isMobile={isMobile}
            />

            {/* RESUME */}

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
              isMobile={isMobile}
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
              isMobile={isMobile}
            />

            {/* ADMIN */}

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
                isMobile={isMobile}
              />

            )}

            {/* ACCOUNT */}

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
              isMobile={isMobile}
            />

            {/* AI */}

            <NavItem
              to="/ai"
              text="AI Tutor"
              icon={<FaRobot />}
              active={
                location.pathname ===
                "/ai"
              }
              isMobile={isMobile}
            />

            {/* CHAT */}

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
              isMobile={isMobile}
            />

            {/* LIVE */}

            <NavItem
              to="/live"
              text="Live"
              icon={<FaVideo />}
              active={
                location.pathname ===
                "/live"
              }
              isMobile={isMobile}
            />

          </>
        )}

      </div>

      {/* RIGHT */}

      <div
        style={{
          ...styles.right,

          justifyContent:
            isMobile
              ? "center"
              : "flex-end",

          width:
            isMobile
              ? "100%"
              : "auto",
        }}
      >

        {user ? (

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            style={{
              ...styles.logoutBtn,

              width: isMobile
                ? "100%"
                : "115px",

              maxWidth: "220px",

              height: isMobile
                ? "42px"
                : "40px",
            }}
            onClick={
              logoutHandler
            }
          >

            <FaSignOutAlt />

            Logout

          </motion.button>

        ) : (

          <div
            style={{
              ...styles.authBtns,

              width: isMobile
                ? "100%"
                : "auto",

              justifyContent:
                "center",
            }}
          >

            <Link
              to="/login"
              style={{
                ...styles.loginBtn,

                width: isMobile
                  ? "100%"
                  : "80px",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                ...styles.registerBtn,

                width: isMobile
                  ? "100%"
                  : "90px",
              }}
            >
              Register
            </Link>

          </div>

        )}

      </div>

    </motion.div>

  );

}

// =========================
// NAV ITEM
// =========================

const NavItem = ({
  to,
  text,
  icon,
  active,
  isMobile,
}) => (

  <Link
    to={to}
    style={{
      ...styles.link,

      minWidth: isMobile
        ? "110px"
        : "unset",

      fontSize: isMobile
        ? "11px"
        : "12px",

      padding: isMobile
        ? "8px 10px"
        : "8px 10px",

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

// =========================
// STYLES
// =========================

const styles = {

  header: {
    position: "sticky",
    top: 0,
    zIndex: 999,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
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
    flexShrink: 0,
  },

  logoBox: {
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    boxShadow:
      "0 0 20px rgba(255,140,0,0.22)",
    flexShrink: 0,
  },

  logo: {
    margin: 0,
    color: "white",
    fontWeight: "700",
  },

  tagline: {
    margin: "2px 0 0 0",
    color: "#8d8d8d",
    letterSpacing: "1px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    gap: "8px",
    flex: 1,
    overflowX: "auto",
    scrollbarWidth: "none",
    marginLeft: "20px",
    marginRight: "20px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    gap: "6px",
    borderRadius: "12px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,255,255,0.03)",
    color: "#d8d8d8",
    textDecoration:
      "none",
    fontWeight: "500",
    transition: "0.25s ease",
    minHeight: "38px",
    whiteSpace: "nowrap",
    flexShrink: 0,
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
    alignItems: "center",
    flexShrink: 0,
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    gap: "6px",
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
    height: "38px",
    borderRadius: "12px",
    background:
      "rgba(255,255,255,0.05)",
    color: "white",
    textDecoration:
      "none",
    fontWeight: "600",
    fontSize: "12px",
    padding: "0 18px",
  },

  registerBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    height: "38px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    color: "white",
    textDecoration:
      "none",
    fontWeight: "600",
    fontSize: "12px",
    padding: "0 18px",
  },

};

export default Header;