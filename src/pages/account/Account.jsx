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
        parsedUser.image || ""
      );
    }

  }, []);

  // IMAGE
  const imageHandler = (e) => {

    const file =
      e.target.files[0];

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
        data.user.image
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
      <h2 style={{
        color: "white",
        textAlign: "center",
        marginTop: "100px",
      }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={styles.container}>

      {/* BACKGROUND GLOW */}
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

        style={styles.profileCard}
      >

        {/* TOP */}
        <div style={styles.topSection}>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}

            style={styles.imageWrapper}
          >

            <img
              src={
                preview ||
                "https://i.pravatar.cc/200"
              }

              alt="profile"

              style={styles.image}
            />

            <div style={styles.camera}>
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

              style={styles.fileInput}
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

              style={styles.input}
            />

          ) : (

            <h1 style={styles.name}>
              {user.name}
            </h1>
          )}

          <p style={styles.email}>
            {user.email}
          </p>

          <div style={styles.role}>
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

              style={styles.textarea}
            />

          ) : (

            <p style={styles.bio}>
              {bio ||
                "No bio added yet"}
            </p>
          )}

          {/* BUTTONS */}
          {editMode ? (

            <motion.button
              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              style={styles.saveBtn}

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

              style={styles.editBtn}

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

    padding: "40px",

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

    borderRadius: "30px",

    padding: "40px",

    textAlign: "center",

    boxShadow:
      "0 0 35px rgba(255,140,0,0.12)",

    position: "relative",

    zIndex: 2,
  },

  topSection: {
    marginBottom: "20px",
  },

  imageWrapper: {
    position: "relative",

    width: "160px",

    margin: "auto",
  },

  image: {
    width: "160px",

    height: "160px",

    borderRadius: "50%",

    objectFit: "cover",

    border:
      "4px solid #ff9800",

    boxShadow:
      "0 0 30px rgba(255,140,0,0.4)",
  },

  camera: {
    position: "absolute",

    bottom: "10px",

    right: "10px",

    width: "40px",

    height: "40px",

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
  },

  info: {
    marginTop: "20px",
  },

  name: {
    color: "white",
    fontSize: "32px",
    marginBottom: "8px",
  },

  email: {
    color: "#aaa",
    marginBottom: "15px",
  },

  role: {
    display: "inline-flex",

    alignItems: "center",

    gap: "8px",

    padding:
      "10px 20px",

    borderRadius: "20px",

    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",

    color: "white",

    fontWeight: "bold",

    marginBottom: "20px",
  },

  bio: {
    color: "#ddd",

    lineHeight: "1.7",

    marginTop: "20px",
  },

  input: {
    width: "100%",

    padding: "14px",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    marginTop: "15px",

    outline: "none",
  },

  textarea: {
    width: "100%",

    height: "120px",

    padding: "15px",

    marginTop: "20px",

    borderRadius: "16px",

    border:
      "1px solid rgba(255,140,0,0.2)",

    background:
      "rgba(255,255,255,0.05)",

    color: "white",

    outline: "none",
  },

  editBtn: {
    marginTop: "25px",

    display: "inline-flex",

    alignItems: "center",

    gap: "10px",

    padding:
      "14px 28px",

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

    padding:
      "14px 28px",

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