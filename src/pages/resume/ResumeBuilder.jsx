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

  // IMPROVED ATS SCORE
  const calculateATSScore =
    () => {

      let score = 0;

      // REGEX
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex =
        /^[0-9]{10}$/;

      // ATS KEYWORDS
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
        "firebase",
      ];

      // ACTION WORDS
      const actionWords = [
        "developed",
        "created",
        "designed",
        "implemented",
        "managed",
        "built",
        "optimized",
        "improved",
        "integrated",
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

      // SKILLS ANALYSIS
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
            expText.includes(
              word
            )
          ) {
            matchedActions++;
          }
        }
      );

      score += Math.min(
        matchedActions * 3,
        15
      );

      // SUMMARY QUALITY
      if (
        resume.summary
          .trim()
          .split(" ").length >= 20
      ) {
        score += 10;
      }

      return Math.min(
        score,
        100
      );
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
          "Valid email missing"
        );
      }

      if (
        !phoneRegex.test(
          resume.phone
        )
      ) {
        feedback.push(
          "Phone number should be 10 digits"
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
          Build professional ATS-friendly resumes 🚀
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

          onClick={
            generateAIResume
          }
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

// INPUT
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

// TEXTAREA
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

// SECTION
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

const styles = {

  feedbackBox: {
    marginTop: "20px",
  },

};

export default ResumeBuilder;