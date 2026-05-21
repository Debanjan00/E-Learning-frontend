import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { server } from "../../main";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaFileAlt,
  FaRobot,
  FaDownload,
  FaBolt,
} from "react-icons/fa";

function ResumeBuilder() {

  const previewRef = useRef();

  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    skills: "",
    education: "",
    projects: "",
    experience: "",
    summary: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // REAL ATS SCORE SYSTEM
  // =========================

  const calculateATSScore = () => {

    let score = 0;

    let suggestions = [];

    const allText = `
      ${resume.name}
      ${resume.email}
      ${resume.phone}
      ${resume.role}
      ${resume.skills}
      ${resume.education}
      ${resume.projects}
      ${resume.experience}
      ${resume.summary}
    `.toLowerCase();

    // NAME
    if (resume.name.trim().length > 2) {
      score += 5;
    } else {
      suggestions.push("Add proper full name");
    }

    // EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(resume.email)) {
      score += 5;
    } else {
      suggestions.push("Add valid email");
    }

    // PHONE
    const phoneRegex =
      /^[0-9]{10}$/;

    if (
      phoneRegex.test(
        resume.phone.replace(/\s/g, "")
      )
    ) {
      score += 5;
    } else {
      suggestions.push("Add valid phone number");
    }

    // ROLE
    if (resume.role.trim().length > 3) {
      score += 10;
    } else {
      suggestions.push("Add target role");
    }

    // =========================
    // SKILLS ANALYSIS
    // =========================

    const importantSkills = [
      "react",
      "node",
      "mongodb",
      "express",
      "javascript",
      "python",
      "java",
      "sql",
      "html",
      "css",
      "aws",
      "docker",
      "git",
      "api",
      "redux",
      "next",
      "typescript",
      "firebase",
      "machine learning",
      "ai",
    ];

    let matchedSkills = 0;

    importantSkills.forEach((skill) => {

      if (
        resume.skills
          .toLowerCase()
          .includes(skill)
      ) {
        matchedSkills++;
      }

    });

    score += Math.min(
      matchedSkills * 3,
      20
    );

    if (matchedSkills < 3) {
      suggestions.push(
        "Add more industry relevant skills"
      );
    }

    // =========================
    // ACTION WORDS
    // =========================

    const actionWords = [
      "developed",
      "built",
      "created",
      "managed",
      "implemented",
      "optimized",
      "designed",
      "led",
      "improved",
      "deployed",
      "integrated",
      "achieved",
    ];

    let actionCount = 0;

    actionWords.forEach((word) => {

      if (allText.includes(word)) {
        actionCount++;
      }

    });

    score += Math.min(
      actionCount * 2,
      15
    );

    if (actionCount < 3) {
      suggestions.push(
        "Use strong action words"
      );
    }

    // =========================
    // PROJECTS
    // =========================

    if (
      resume.projects.trim().length > 50
    ) {
      score += 10;
    } else {
      suggestions.push(
        "Add detailed projects"
      );
    }

    // =========================
    // EXPERIENCE
    // =========================

    if (
      resume.experience.trim().length > 50
    ) {
      score += 10;
    } else {
      suggestions.push(
        "Add proper experience details"
      );
    }

    // =========================
    // EDUCATION
    // =========================

    if (
      resume.education.trim().length > 20
    ) {
      score += 10;
    } else {
      suggestions.push(
        "Add education details"
      );
    }

    // =========================
    // SUMMARY
    // =========================

    if (
      resume.summary.trim().length > 40
    ) {
      score += 10;
    } else {
      suggestions.push(
        "Add professional summary"
      );
    }

    // =========================
    // WORD COUNT
    // =========================

    const words =
      allText.split(/\s+/);

    if (words.length > 120) {
      score += 10;
    } else {
      suggestions.push(
        "Resume content is too short"
      );
    }

    // =========================
    // FAKE CONTENT DETECTION
    // =========================

    const fakeWords = [
      "asdf",
      "qwerty",
      "aaaa",
      "1234",
      "test",
      "hello",
      "nothing",
      "random",
    ];

    let fakeDetected = false;

    fakeWords.forEach((word) => {

      if (allText.includes(word)) {
        fakeDetected = true;
      }

    });

    if (fakeDetected) {

      score -= 30;

      suggestions.push(
        "Remove fake or meaningless content"
      );

    }

    // =========================
    // DUPLICATE WORD CHECK
    // =========================

    const wordMap = {};

    words.forEach((word) => {

      if (!wordMap[word]) {
        wordMap[word] = 1;
      } else {
        wordMap[word]++;
      }

    });

    let repeated = 0;

    Object.values(wordMap).forEach(
      (count) => {

        if (count > 8) {
          repeated++;
        }

      }
    );

    if (repeated > 5) {

      score -= 10;

      suggestions.push(
        "Reduce repeated words"
      );

    }

    // =========================
    // ROLE MATCHING
    // =========================

    if (
      resume.role
        .toLowerCase()
        .includes("frontend")
    ) {

      if (
        resume.skills
          .toLowerCase()
          .includes("react")
      ) {
        score += 5;
      }

    }

    if (
      resume.role
        .toLowerCase()
        .includes("backend")
    ) {

      if (
        resume.skills
          .toLowerCase()
          .includes("node")
      ) {
        score += 5;
      }

    }

    if (
      resume.role
        .toLowerCase()
        .includes("full stack")
    ) {

      if (
        resume.skills
          .toLowerCase()
          .includes("react") &&
        resume.skills
          .toLowerCase()
          .includes("node")
      ) {
        score += 8;
      }

    }

    // LIMIT SCORE

    if (score > 100) {
      score = 100;
    }

    if (score < 0) {
      score = 0;
    }

    return {
      score,
      suggestions,
    };

  };

  // =========================
  // AI GENERATE
  // =========================

  const generateAIResume =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem("token");

        const prompt = `
Create a professional ATS-friendly resume summary.

Role:
${resume.role}

Skills:
${resume.skills}

Projects:
${resume.projects}

Experience:
${resume.experience}

Education:
${resume.education}
`;

        const { data } =
          await axios.post(
            `${server}/api/ai/ask`,
            {
              question: prompt,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

        setResume({
          ...resume,
          summary: data.answer,
        });

      } catch (error) {

        console.log(error);

        alert(
          "AI generation failed ❌"
        );

      } finally {

        setLoading(false);

      }

    };

  // =========================
  // DOWNLOAD PDF
  // =========================

  const downloadPDF = async () => {

    const element =
      previewRef.current;

    const canvas =
      await html2canvas(
        element
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF();

    const imgWidth = 190;

    const imgHeight =
      (canvas.height *
        imgWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imgWidth,
      imgHeight
    );

    pdf.save("Resume.pdf");

  };

  const atsResult =
    calculateATSScore();

  return (

    <div style={styles.page}>

      {/* LEFT SIDE */}

      <motion.div
        initial={{
          opacity: 0,
          x: -40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        style={styles.formCard}
      >

        <div style={styles.logo}>
          <FaRobot />
        </div>

        <h1 style={styles.title}>
          AI Resume Builder
        </h1>

        <p style={styles.subtitle}>
          Build ATS Optimized Resume 🚀
        </p>

        <InputBox
          icon={<FaUser />}
          name="name"
          placeholder="Full Name"
          value={resume.name}
          onChange={handleChange}
        />

        <InputBox
          icon={<FaEnvelope />}
          name="email"
          placeholder="Email"
          value={resume.email}
          onChange={handleChange}
        />

        <InputBox
          icon={<FaPhone />}
          name="phone"
          placeholder="Phone"
          value={resume.phone}
          onChange={handleChange}
        />

        <InputBox
          icon={<FaBolt />}
          name="role"
          placeholder="Target Role"
          value={resume.role}
          onChange={handleChange}
        />

        <TextAreaBox
          icon={<FaCode />}
          name="skills"
          placeholder="Skills"
          value={resume.skills}
          onChange={handleChange}
        />

        <TextAreaBox
          icon={<FaGraduationCap />}
          name="education"
          placeholder="Education"
          value={resume.education}
          onChange={handleChange}
        />

        <TextAreaBox
          icon={<FaFileAlt />}
          name="projects"
          placeholder="Projects"
          value={resume.projects}
          onChange={handleChange}
        />

        <TextAreaBox
          icon={<FaBriefcase />}
          name="experience"
          placeholder="Experience"
          value={resume.experience}
          onChange={handleChange}
        />

        {/* AI BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.95,
          }}
          style={styles.aiBtn}
          onClick={generateAIResume}
        >

          <FaRobot />

          {
            loading
              ? "Generating..."
              : "Generate AI Summary"
          }

        </motion.button>

        {/* ATS BOX */}

        <div style={styles.leftATSBox}>

          <div style={styles.leftATSTop}>

            <span>
              ATS Score
            </span>

            <span>
              {atsResult.score}%
            </span>

          </div>

          <div style={styles.progressBar}>

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width:
                  `${atsResult.score}%`,
              }}
              transition={{
                duration: 0.7,
              }}
              style={styles.progress}
            />

          </div>

          <div style={styles.analysisBox}>

            {atsResult.score < 50 && (
              <p style={styles.badText}>
                Weak Resume ❌
              </p>
            )}

            {atsResult.score >= 50 &&
              atsResult.score < 80 && (
                <p style={styles.midText}>
                  Good Resume ⚠
                </p>
              )}

            {atsResult.score >= 80 && (
              <p style={styles.goodText}>
                Excellent Resume ✅
              </p>
            )}

            {/* SUGGESTIONS */}

            <div
              style={{
                marginTop: "15px",
              }}
            >

              {atsResult.suggestions.map(
                (item, index) => (

                  <p
                    key={index}
                    style={{
                      color: "#aaa",
                      fontSize: "13px",
                      marginBottom: "6px",
                    }}
                  >
                    • {item}
                  </p>

                )
              )}

            </div>

          </div>

        </div>

        {/* DOWNLOAD */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.95,
          }}
          style={styles.downloadBtn}
          onClick={downloadPDF}
        >

          <FaDownload />

          Download PDF

        </motion.button>

      </motion.div>

      {/* RIGHT SIDE */}

      <motion.div
        ref={previewRef}
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        style={styles.previewCard}
      >

        <h1 style={styles.name}>
          {
            resume.name ||
            "Your Name"
          }
        </h1>

        <p style={styles.info}>
          {
            resume.email ||
            "email@example.com"
          }
        </p>

        <p style={styles.info}>
          {
            resume.phone ||
            "+91 XXXXX XXXXX"
          }
        </p>

        <p style={styles.role}>
          {
            resume.role ||
            "Target Role"
          }
        </p>

        <Section
          title="Professional Summary"
          text={
            resume.summary ||
            "Generate AI summary"
          }
        />

        <Section
          title="Skills"
          text={
            resume.skills ||
            "Your skills"
          }
        />

        <Section
          title="Education"
          text={
            resume.education ||
            "Your education"
          }
        />

        <Section
          title="Projects"
          text={
            resume.projects ||
            "Your projects"
          }
        />

        <Section
          title="Experience"
          text={
            resume.experience ||
            "Your experience"
          }
        />

      </motion.div>

    </div>

  );

}

// =========================
// INPUT COMPONENT
// =========================

function InputBox({
  icon,
  name,
  placeholder,
  value,
  onChange,
}) {

  return (

    <div style={styles.inputBox}>

      <div style={styles.icon}>
        {icon}
      </div>

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
      />

    </div>

  );

}

// =========================
// TEXTAREA COMPONENT
// =========================

function TextAreaBox({
  icon,
  name,
  placeholder,
  value,
  onChange,
}) {

  return (

    <div style={styles.inputBox}>

      <div style={styles.icon}>
        {icon}
      </div>

      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.textarea}
      />

    </div>

  );

}

// =========================
// SECTION COMPONENT
// =========================

function Section({
  title,
  text,
}) {

  return (

    <div style={styles.section}>

      <h3 style={styles.sectionTitle}>
        {title}
      </h3>

      <p style={styles.sectionText}>
        {text}
      </p>

    </div>

  );

}

// =========================
// STYLES
// =========================

const styles = {

  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(360px,1fr))",
    gap: "30px",
    padding: "40px",
    background:
      "linear-gradient(135deg,#0f0f0f,#111827)",
  },

  formCard: {
    padding: "35px",
    borderRadius: "30px",
    background:
      "rgba(255,255,255,0.04)",
    backdropFilter:
      "blur(18px)",
    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  previewCard: {
    padding: "45px",
    borderRadius: "30px",
    background: "white",
    color: "#111",
  },

  logo: {
    width: "80px",
    height: "80px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "34px",
    marginBottom: "20px",
  },

  title: {
    color: "white",
    fontSize: "42px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
  },

  inputBox: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
    padding: "14px 18px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  icon: {
    color: "#ff9800",
    fontSize: "18px",
    marginTop: "5px",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
  },

  textarea: {
    flex: 1,
    minHeight: "90px",
    background: "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    color: "white",
    fontFamily: "inherit",
  },

  aiBtn: {
    width: "100%",
    marginTop: "10px",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background:
      "rgba(255,140,0,0.12)",
    color: "#ffb347",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  leftATSBox: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,140,0,0.15)",
  },

  leftATSTop: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "12px",
    color: "white",
    fontWeight: "bold",
  },

  progressBar: {
    width: "100%",
    height: "10px",
    borderRadius: "10px",
    background: "#222",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    background:
      "linear-gradient(90deg,#ff9800,#ff5e00)",
  },

  analysisBox: {
    marginTop: "15px",
  },

  goodText: {
    color: "#4ade80",
    fontWeight: "bold",
  },

  midText: {
    color: "#facc15",
    fontWeight: "bold",
  },

  badText: {
    color: "#f87171",
    fontWeight: "bold",
  },

  downloadBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  name: {
    fontSize: "38px",
    marginBottom: "10px",
  },

  info: {
    marginBottom: "5px",
    color: "#555",
  },

  role: {
    marginTop: "10px",
    color: "#ff5e00",
    fontWeight: "bold",
  },

  section: {
    marginTop: "28px",
  },

  sectionTitle: {
    marginBottom: "8px",
    color: "#ff5e00",
  },

  sectionText: {
    color: "#333",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },

};

export default ResumeBuilder;