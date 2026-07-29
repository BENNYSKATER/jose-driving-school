import { Routes, Route } from "react-router-dom";
import "./App.css";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import { useNavigate } from "react-router-dom";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import Fees from "./pages/Fees";
import StudentProfile from "./pages/StudentProfile";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
function Login() {
 
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">🚗</div>

        <h1>Jose Driving School</h1>
        <p>Management System</p>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button
  onClick={() => {
    navigate("/dashboard");
  }}
>
  Login
</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/fees" element={<Fees />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/reports" element={<Reports />} />
      <Route
  path="/student/:id"
  element={<StudentProfile />}
/>
    </Routes>
  );
}

export default App;