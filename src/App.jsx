import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import "./App.css";

import { AuthContext } from "./context/AuthContext";

import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentProfile from "./pages/StudentProfile";
import StudentDetails from "./pages/StudentDetails";

import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import EditVehicle from "./pages/EditVehicle";

import Fees from "./pages/Fees";
import EditFee from "./pages/EditFee";
import AddPayment from "./pages/AddPayment";

import Schedule from "./pages/Schedule";
import AddSchedule from "./pages/AddSchedule";

import Reports from "./pages/Reports";

import Instructors from "./pages/Instructors";
import AddInstructor from "./pages/AddInstructor";

import Attendance from "./pages/Attendance";
import AddAttendance from "./pages/AddAttendance";
import EditAttendance from "./pages/EditAttendance";

import Register from "./pages/Register";
import Settings from "./pages/Settings";


// =====================================================
// LOGIN
// =====================================================

function Login() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🚗
        </div>

        <h1>
          Jose Driving School
        </h1>

        <p>
          Management System
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="register-text">
          Don't have an admin account?

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            Create Admin
          </span>
        </p>

      </div>

    </div>
  );
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={<Login />}
      />


      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================================
          ALL MAIN PAGES
      ========================================= */}

      <Route element={<Layout />}>

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* STUDENTS */}
        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/add-student"
          element={<AddStudent />}
        />

        <Route
          path="/edit-student/:id"
          element={<EditStudent />}
        />

        <Route
          path="/student/:id"
          element={<StudentProfile />}
        />

        <Route
          path="/student-details/:id"
          element={<StudentDetails />}
        />


        {/* VEHICLES */}
        <Route
          path="/vehicles"
          element={<Vehicles />}
        />

        <Route
          path="/add-vehicle"
          element={<AddVehicle />}
        />

        <Route
          path="/vehicle/:id"
          element={<VehicleDetails />}
        />

        <Route
          path="/edit-vehicle/:id"
          element={<EditVehicle />}
        />


        {/* FEES */}
        <Route
          path="/fees"
          element={<Fees />}
        />

        <Route
          path="/edit-fee/:id"
          element={<EditFee />}
        />

        <Route
          path="/add-payment/:id"
          element={<AddPayment />}
        />


        {/* SCHEDULE */}
        <Route
          path="/schedule"
          element={<Schedule />}
        />

        <Route
          path="/add-schedule"
          element={<AddSchedule />}
        />


        {/* REPORTS */}
        <Route
          path="/reports"
          element={<Reports />}
        />


        {/* INSTRUCTORS */}
        <Route
          path="/instructors"
          element={<Instructors />}
        />

        <Route
          path="/add-instructor"
          element={<AddInstructor />}
        />


        {/* ATTENDANCE */}
        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/add-attendance"
          element={<AddAttendance />}
        />

        <Route
          path="/edit-attendance/:id"
          element={<EditAttendance />}
        />


        {/* SETTINGS */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  );
}

export default App;