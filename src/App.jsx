import { Routes, Route } from "react-router-dom";
import "./App.css";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";
import StudentDetails from "./pages/StudentDetails";
import AddStudent from "./pages/AddStudent";
import { useNavigate } from "react-router-dom";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import Fees from "./pages/Fees";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Instructors from "./pages/Instructors";
import AddInstructor from "./pages/AddInstructor";
import AddSchedule from "./pages/AddSchedule";
import Attendance from "./pages/Attendance";
import AddAttendance from "./pages/AddAttendance";
import EditStudent from "./pages/EditStudent";
import Register from "./pages/Register";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Settings from "./pages/Settings";
function Login() {
 const { login } = useContext(AuthContext);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">🚗</div>

        <h1>Jose Driving School</h1>
        <p>Management System</p>

        <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

   <button
  onClick={() => {
    const success = login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  }}
>
  Login
</button>
<p
  style={{
    marginTop: "20px",
    textAlign: "center",
  }}
>
  First Time?

  <span
    onClick={() => navigate("/register")}
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      cursor: "pointer",
      marginLeft: "5px",
    }}
  >
    Create Admin
  </span>
</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/fees" element={<Fees />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/instructors" element={<Instructors />} />
      <Route path="/add-instructor" element={<AddInstructor />} />
      <Route path="/add-schedule" element={<AddSchedule />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/add-attendance" element={<AddAttendance />} />
      <Route path="/student/:id"element={<StudentDetails />}/>
      <Route path="/edit-student/:id" element={<EditStudent />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;