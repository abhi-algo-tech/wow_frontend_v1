import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "./App1.css";

import Dashboard from "./pages/Dashboard";

import MainLayout from "./pages/MainLayout";
import Classroom from "./pages/classroom/Classroom";
import LoginPage from "./pages/auth/LoginPage";
import ClassroomProfile from "./pages/classroom/ClassroomProfile";
import Student from "./pages/student/Student";
import StudentProfile from "./pages/student/StudentProfile";
import Staff from "./pages/staff/Staff";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffAttendance from "./pages/staff/StaffAttendance";
import Schedule from "./pages/schedule/Schedule";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Set login state from local storage or API
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLogin(storedLoginStatus === "true");
  }, [localStorage.getItem("isLoggedIn")]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes */}
        {/* {isLogin ? ( */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/classroom-profile" element={<ClassroomProfile />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/staff-profile/:id" element={<StaffProfile />} />
          <Route path="/staff-attendance/:id" element={<StaffAttendance />} />
          <Route path="/schedule" element={<Schedule />} />
          {/* Redirect to default dashboard route */}
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
        {/* ) : (
          // Redirect if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )} */}
      </Routes>
    </Router>
  );
}

export default App;
