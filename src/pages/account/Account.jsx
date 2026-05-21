import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { server } from "../../main";

import {
  motion,
} from "framer-motion";

import {
  FaCamera,
  FaUserAstronaut,
  FaEdit,
  FaSave,
} from "react-icons/fa";

function Account() {

  const [user, setUser] =
    useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [name, setName] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const isMobile =
    window.innerWidth <= 768;

  // DEFAULT IMAGE
  const defaultImage =
    "https://i.pravatar.cc/200";

  // LOAD USER
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

      setName(
        parsedUser.name || ""
      );

      setBio(
        parsedUser.bio || ""
      );

      setPreview(
        parsedUser.image &&
        parsedUser.image !== "null" &&
        parsedUser.image !==
          "undefined"
          ? parsedUser.image
          : defaultImage
      );
    }

  }, []);

  // IMAGE
  const imageHandler = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // SAVE
  const saveProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "bio",
        bio
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      const { data } =
        await axios.put(
          `${server}/api/user/update-profile`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      setUser(data.user);

      setPreview(
        data.user.image &&
        data.user.image !== "null"
          ? data.user.image
          : defaultImage
      );

      setEditMode(false);

      alert(
        "Profile updated ✅"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update failed ❌"
      );
    }
  };

  if (!user) {

    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        ...styles.container,

        padding: isMobile
          ? "20px 12px"
          : "40px",
      }}
    >

      {/* GLOW */}
      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        style={{
          ...styles.profileCard,

          padding: isMobile
            ? "25px 18px"
            : "40px",

          borderRadius:
            isMobile
              ? "22px"
              : "30px",
        }}
      >

        {/* TOP */}
        <div style={styles.topSection}>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}

            style={{
              ...styles.imageWrapper,

              width: isMobile
                ? "120px"
                : "160px",
            }}
          >

            <img
              src={
                preview &&
                preview !== "null" &&
                preview !==
                  "undefined"
                  ? preview
                  : defaultImage
              }

              alt="profile"

              onError={(e) => {
                e.target.src =
                  defaultImage;
              }}

              style={{
                ...styles.image,

                width: isMobile
                  ? "120px"
                  : "160px",

                height: isMobile
                  ? "120px"
                  : "160px",
              }}
            />

            <div
              style={{
                ...styles.camera,

                width: isMobile
                  ? "34px"
                  : "40px",

                height: isMobile
                  ? "34px"
                  : "40px",

                fontSize:
                  isMobile
                    ? "13px"
                    : "16px",
              }}
            >
              <FaCamera />
            </div>

          </motion.div>

          {editMode && (

            <input
              type="file"

              accept="image/*"

              onChange={
                imageHandler
              }

              style={{
                ...styles.fileInput,

                fontSize:
                  isMobile
                    ? "12px"
                    : "14px",
              }}
            />
          )}

        </div>

        {/* INFO */}
        <div style={styles.info}>

          {editMode ? (

            <input
              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              style={{
                ...styles.input,

                padding:
                  isMobile
                    ? "12px"
                    : "14px",

                fontSize:
                  isMobile
                    ? "14px"
                    : "15px",
              }}
            />

          ) : (

            <h1
              style={{
                ...styles.name,

                fontSize:
                  isMobile
                    ? "24px"
                    : "32px",
              }}
            >
              {user.name}
            </h1>
          )}

          <p
            style={{
              ...styles.email,

              fontSize:
                isMobile
                  ? "13px"
                  : "15px",

              wordBreak:
                "break-word",
            }}
          >
            {user.email}
          </p>

          <div
            style={{
              ...styles.role,

              padding:
                isMobile
                  ? "8px 16px"
                  : "10px 20px",

              fontSize:
                isMobile
                  ? "13px"
                  : "15px",
            }}
          >

            <FaUserAstronaut />

            {user.role}

          </div>

          {/* BIO */}
          {editMode ? (

            <textarea
              value={bio}

              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }

              placeholder="Tell something futuristic about yourself..."

              style={{
                ...styles.textarea,

                height:
                  isMobile
                    ? "100px"
                    : "120px",

                fontSize:
                  isMobile
                    ? "14px"
                    : "15px",

                padding:
                  isMobile
                    ? "12px"
                    : "15px",
              }}
            />

          ) : (

            <p
              style={{
                ...styles.bio,

                fontSize:
                  isMobile
                    ? "14px"
                    : "16px",

                lineHeight:
                  isMobile
                    ? "1.6"
                    : "1.7",
              }}
            >
              {bio ||
                "No bio added yet"}
            </p>
          )}

          {/* BUTTON */}
          {editMode ? (

            <motion.button
              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={{
                ...styles.saveBtn,

                width:
                  isMobile
                    ? "100%"
                    : "auto",

                justifyContent:
                  "center",

                padding:
                  isMobile
                    ? "13px"
                    : "14px 28px",
              }}

              onClick={saveProfile}
            >

              <FaSave />

              Save Profile

            </motion.button>

          ) : (

            <motion.button
              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={{
                ...styles.editBtn,

                width:
                  isMobile
                    ? "100%"
                    : "auto",

                justifyContent:
                  "center",

                padding:
                  isMobile
                    ? "13px"
                    : "14px 28px",
              }}

              onClick={() =>
                setEditMode(true)
              }
            >

              <FaEdit />

              Edit Profile

            </motion.button>

          )}

        </div>

      </motion.div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "90vh",

    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",

    display: "flex",

    justifyContent:
      "center",

    alignItems: "center",

    position: "relative",

    overflow: "hidden",

    boxSizing:
      "border-box",
  },

  glow1: {
    position: "absolute",

    top: "-100px",

    left: "-100px",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    background:
      "rgba(255,140,0,0.18)",

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
      "rgba(255,94,0,0.18)",

    filter: "blur(90px)",
  },

  profileCard: {
    width: "100%",

    maxWidth: "550px",

    background:
      "rgba(255,255,255,0.05)",

    backdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,140,0,0.2)",

    textAlign: "center",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    position: "relative",

    zIndex: 2,

    boxSizing:
      "border-box",
  },

  topSection: {
    marginBottom: "20px",
  },

  imageWrapper: {
    position: "relative",

    margin: "auto",
  },

  image: {
    borderRadius: "50%",

    objectFit: "cover",

    border:
      "4px solid #ff9800",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.4)",

    display: "block",

    margin: "auto",
  },

  camera: {
    position: "absolute",

    bottom: "5px",

    right: "5px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    color: "white",
  },

  fileInput: {
    marginTop: "20px",

    color: "white",

    width: "100%",
  },

  info: {
    marginTop: "20px",
  },

  name: {
    color: "white",

    marginBottom: "8px",

    wordBreak:
      "break-word",
  },

  email: {
    color: "#aaa",

    marginBottom: "15px",
  },

  role: {
    display: "inline-flex",

    alignItems: "center",

    gap: "8px",

    borderRadius: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    marginBottom: "20px",

    flexWrap: "wrap",
  },

  bio: {
    color: "#ddd",

    marginTop: "20px",

    wordBreak:
      "break-word",
  },

  input: {
    width: "100%",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    marginTop: "15px",

    outline: "none",

    boxSizing:
      "border-box",
  },

  textarea: {
    width: "100%",

    marginTop: "20px",

    borderRadius: "16px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    outline: "none",

    resize: "none",

    boxSizing:
      "border-box",
  },

  editBtn: {
    marginTop: "25px",

    display: "inline-flex",

    alignItems: "center",

    gap: "10px",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(255,140,0,0.35)",
  },

  saveBtn: {
    marginTop: "25px",

    display: "inline-flex",

    alignItems: "center",

    gap: "10px",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#00c853,#00e676)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 25px rgba(0,255,120,0.3)",
  },
};

export default Account;