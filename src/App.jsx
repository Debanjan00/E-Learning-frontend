import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Account from "./pages/account/Account";
import Footer from "./components/footer/Footer";
import Courses from "./pages/course/Courses";
import CourseDetail from "./pages/course/CourseDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import AITutor from "./pages/ai/AITutor";
import Certificate from "./pages/certificate/Certificate";
import LiveClasses from "./pages/live/LiveClasses";
import CreateLiveClass from "./pages/instructor/CreateLiveClass";
import CreateCourse from "./pages/instructor/CreateCourse";
import AddLecture from "./pages/instructor/AddLecture";
import ManageLectures from "./pages/instructor/ManageLectures";
import ChatPage from "./pages/chat/ChatPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import CreateTest from "./pages/test/CreateTest";
import StudentTest from "./pages/test/StudentTest";
import AllTests from "./pages/test/AllTests";
import TestResults from "./pages/test/TestResults";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";
import BuyCourse from "./pages/payment/BuyCourse.jsx";
import About from "./pages/About/About";



function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai" element={<AITutor />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/live" element={<LiveClasses />} />
        <Route path="/create-live" element={<CreateLiveClass />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/add-lecture/:id" element={<AddLecture />} />
        <Route path="/manage-lectures/:id" element={<ManageLectures />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />  
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/test/:id" element={<StudentTest />} />
        <Route path="/tests" element={<AllTests />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/buy-course/:id" element={<BuyCourse />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;