import React, {
  useState,
  useRef,
} from "react";

import axios from "axios";

import {
  motion,
} from "framer-motion";

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

  const previewRef =
    useRef();

  const [loading,
    setLoading] =
    useState(false);

  const [resume,
    setResume] =
    useState({
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

  // HANDLE INPUT
  const handleChange =
    (e) => {

      setResume({
        ...resume,

        [e.target.name]:
          e.target.value,
      });
    };

  // ATS SCORE
  const calculateATSScore =
    () => {

      let score = 0;

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex =
        /^[0-9]{10}$/;

      const skillKeywords = [
        "react",
        "node",
        "mongodb",
        "express",
        "javascript",
        "python",
        "java",
        "html",
        "css",
        "sql",
        "aws",
        "docker",
        "git",
        "api",
        "redux",
        "typescript",
        "nextjs",
      ];

      const actionWords = [
        "developed",
        "created",
        "designed",
        "implemented",
        "managed",
        "built",
        "optimized",
        "improved",
        "deployed",
      ];

      // NAME
      if (
        resume.name
          .trim()
          .length >= 3
      ) {
        score += 10;
      }

      // EMAIL
      if (
        emailRegex.test(
          resume.email
        )
      ) {
        score += 10;
      }

      // PHONE
      if (
        phoneRegex.test(
          resume.phone
        )
      ) {
        score += 10;
      }

      // ROLE
      if (
        resume.role
          .trim()
          .length >= 4
      ) {
        score += 10;
      }

      // SKILLS
      const skillsText =
        resume.skills.toLowerCase();

      let matchedSkills = 0;

      skillKeywords.forEach(
        (skill) => {

          if (
            skillsText.includes(
              skill
            )
          ) {
            matchedSkills++;
          }
        }
      );

      score += Math.min(
        matchedSkills * 2,
        20
      );

      // EDUCATION
      if (
        resume.education
          .trim()
          .split(" ").length >= 6
      ) {
        score += 10;
      }

      // PROJECTS
      if (
        resume.projects
          .trim()
          .split(" ").length >= 20
      ) {
        score += 15;
      }

      // EXPERIENCE
      const expText =
        resume.experience.toLowerCase();

      let matchedActions = 0;

      actionWords.forEach(
        (word) => {

          if (
            expText.includes(word)
          ) {
            matchedActions++;
          }
        }
      );

      score += Math.min(
        matchedActions * 3,
        15
      );

      // SUMMARY
      if (
        resume.summary
          .trim()
          .split(" ").length >= 20
      ) {
        score += 10;
      }

      return Math.min(score, 100);
    };

  // ATS FEEDBACK
  const getATSFeedback =
    () => {

      const feedback = [];

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex =
        /^[0-9]{10}$/;

      if (
        !emailRegex.test(
          resume.email
        )
      ) {
        feedback.push(
          "Enter a valid email"
        );
      }

      if (
        !phoneRegex.test(
          resume.phone
        )
      ) {
        feedback.push(
          "Phone number must be 10 digits"
        );
      }

      if (
        resume.skills
          .split(",")
          .length < 3
      ) {
        feedback.push(
          "Add more technical skills"
        );
      }

      if (
        resume.projects
          .trim()
          .split(" ").length < 20
      ) {
        feedback.push(
          "Projects section too short"
        );
      }

      if (
        resume.experience
          .trim()
          .split(" ").length < 15
      ) {
        feedback.push(
          "Experience section weak"
        );
      }

      return feedback;
    };

  // AI GENERATE
  const generateAIResume =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

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
              question:
                prompt,
            },
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setResume({
          ...resume,

          summary:
            data.answer,
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

  // PDF
  const downloadPDF =
    async () => {

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

      pdf.save(
        "Resume.pdf"
      );
    };

  return (
    <div style={styles.page}>

      {/* LEFT */}
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
          Build AI-powered professional resumes 🚀
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

          {loading
            ? "Generating..."
            : "Generate AI Summary"}

        </motion.button>

        {/* ATS PANEL */}
        <div style={styles.leftATSBox}>

          <div style={styles.leftATSTop}>

            <span>
              ATS Score
            </span>

            <span>
              {
                calculateATSScore()
              }
              %
            </span>

          </div>

          <div style={styles.progressBar}>

            <motion.div
              initial={{
                width: 0,
              }}

              animate={{
                width:
                  `${calculateATSScore()}%`,
              }}

              transition={{
                duration: 0.6,
              }}

              style={styles.progress}
            />

          </div>

          <div style={styles.analysisBox}>

            {calculateATSScore() <
              50 && (

              <p style={styles.badText}>
                Weak Resume ❌
              </p>
            )}

            {calculateATSScore() >=
              50 &&
              calculateATSScore() <
                80 && (

                <p style={styles.midText}>
                  Good Resume ⚠
                </p>
              )}

            {calculateATSScore() >=
              80 && (

              <p style={styles.goodText}>
                Excellent Resume ✅
              </p>
            )}

          </div>

          {/* FEEDBACK */}
          <div style={styles.feedbackBox}>

            <h4
              style={{
                color: "white",
                marginBottom: "10px",
              }}
            >
              ATS Suggestions
            </h4>

            {getATSFeedback()
              .length === 0 ? (

              <p
                style={{
                  color: "#4ade80",
                }}
              >
                Resume looks ATS optimized ✅
              </p>

            ) : (

              getATSFeedback().map(
                (
                  item,
                  index
                ) => (

                  <p
                    key={index}
                    style={{
                      color:
                        "#facc15",
                      marginBottom:
                        "6px",
                    }}
                  >
                    • {item}
                  </p>
                )
              )
            )}

          </div>

        </div>

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

      {/* RIGHT */}
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
          {resume.name ||
            "Your Name"}
        </h1>

        <p style={styles.info}>
          {resume.email ||
            "email@example.com"}
        </p>

        <p style={styles.info}>
          {resume.phone ||
            "+91 XXXXX XXXXX"}
        </p>

        <p style={styles.role}>
          {resume.role ||
            "Target Role"}
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
    boxShadow:
      "0 10px 40px rgba(0,0,0,0.4)",
  },

  previewCard: {
    padding: "45px",
    borderRadius: "30px",
    background: "white",
    color: "#111",
    boxShadow:
      "0 10px 40px rgba(0,0,0,0.25)",
  },

  logo: {
    width: "80px",
    height: "80px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#ff9800,#ff5e00)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    color: "white",
    fontSize: "34px",
    marginBottom: "20px",
    boxShadow:
      "0 10px 25px rgba(255,94,0,0.35)",
  },

  title: {
    color: "white",
    fontSize: "42px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
    fontSize: "15px",
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
    transition: "0.3s",
  },

  icon: {
    color: "#ff9800",
    fontSize: "18px",
    marginTop: "5px",
  },

  input: {
    flex: 1,
    background:
      "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "15px",
  },

  textarea: {
    flex: 1,
    minHeight: "90px",
    background:
      "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    color: "white",
    fontFamily:
      "inherit",
    fontSize: "15px",
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
    justifyContent:
      "center",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  leftATSBox: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "20px",
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
    fontSize: "16px",
  },

  progressBar: {
    width: "100%",
    height: "12px",
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

  feedbackBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.03)",
    border:
      "1px solid rgba(255,255,255,0.06)",
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
    justifyContent:
      "center",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow:
      "0 10px 25px rgba(255,94,0,0.3)",
  },

  name: {
    fontSize: "38px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  info: {
    marginBottom: "5px",
    color: "#555",
  },

  role: {
    marginTop: "10px",
    color: "#ff5e00",
    fontWeight: "bold",
    fontSize: "18px",
  },

  section: {
    marginTop: "28px",
  },

  sectionTitle: {
    marginBottom: "8px",
    color: "#ff5e00",
    fontSize: "20px",
  },

  sectionText: {
    color: "#333",
    lineHeight: "1.7",
    whiteSpace:
      "pre-wrap",
  },
};