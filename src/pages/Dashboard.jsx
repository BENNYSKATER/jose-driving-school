import Sidebar from "../components/Sidebar";
import "../css/Sidebar.css";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";

const cardStyle = {
  background: "#000000",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

function Dashboard() {
  const { students } = useContext(StudentContext);
  const { vehicles } = useContext(VehicleContext);
const { instructors } = useContext(InstructorContext);
  console.log("Students:", students);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "30px", flex: 1 }}>
        <h1>Dashboard</h1>
        <p>Welcome to Jose Driving School Management System 🚗</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>👨‍🎓 Students</h2>
           <p>{students.length}</p>
          </div>

          <div style={cardStyle}>
            <h2>🚗 Vehicles</h2>
           <p>{vehicles.length}</p>
          </div>

          <div style={cardStyle}>
            <h2>👨‍🏫 Instructors</h2>
           <p>{instructors.length}</p>
          </div>

          <div style={cardStyle}>
            <h2>💰 Pending Fees</h2>
            <p>₹0</p>
          </div>

          <div style={cardStyle}>
            <h2>📅 Today's Classes</h2>
            <p>0</p>
          </div>

          <div style={cardStyle}>
            <h2>📝 RTO Tests</h2>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;