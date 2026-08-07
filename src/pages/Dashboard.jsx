import Sidebar from "../components/Sidebar";
import "../css/Sidebar.css";

import { useContext } from "react";
import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaCarSide,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AttendanceContext } from "../context/AttendanceContext";
import "../css/Dashboard.css";
import { SettingsContext } from "../context/SettingsContext"; 


const DashboardCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      y: -8,
    }}
    transition={{ duration: 0.25 }}
    style={{
      background: "#ffffff",
      borderRadius: "18px",
      padding: "22px",
      boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    }}
  >
    <div>
<p
  style={{
    margin: 0,
    color: "#374151",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  }}
>
  {title}
</p>

<h2
  style={{
    marginTop: "12px",
    color: "#111827",
    fontWeight: "800",
    fontSize: "40px",
  }}
>
  {value}
</h2>
    </div>

    <div
      style={{
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        background: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "28px",
      }}
    >
      {icon}
    </div>
  </motion.div>
);
function Dashboard() {
  const { students } = useContext(StudentContext);

const totalPendingFees = students.reduce(
  (total, student) => total + (student.balance || 0),
  0
);

const { vehicles } = useContext(VehicleContext);
const { instructors } = useContext(InstructorContext);
const { schedules } = useContext(ScheduleContext);
const { attendance } = useContext(AttendanceContext);

const today = new Date().toISOString().split("T")[0];

const presentToday = attendance.filter(
  (a) =>
    a.date === today &&
    a.status === "Present"
).length;

const absentToday = attendance.filter(
  (a) =>
    a.date === today &&
    a.status === "Absent"
).length;

const todayClasses = schedules.filter(
  (schedule) => schedule.date === today
).length;

  console.log("Today's Date:", today);
  console.log("Schedules:", schedules);
  console.log("Today's Classes:", todayClasses);
  const chartData = [
  { name: "Present", value: presentToday },
  { name: "Absent", value: absentToday },
];

const COLORS = ["#22c55e", "#ef4444"];
const { settings } = useContext(SettingsContext);

  return (
  <div style={{ display: "flex" }}>
    <Sidebar />

    <div
      style={{
        flex: 1,
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
     <div className="topbar">
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
  {settings.logo && (
    <img
      src={settings.logo}
      alt="logo"
      style={{
        width: "55px",
        height: "55px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  )}

  <div>
    <h2>{settings.schoolName}</h2>
    <p>Driving School Management System</p>
  </div>
</div>
  </div>

 <div className="topbar-right">

  <input
    type="text"
    placeholder="🔍 Search..."
    className="search-box"
  />

  <div className="notification">
    🔔
  </div>

  <div className="profile">
    👤 Admin
  </div>

</div>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <DashboardCard
          title="Students"
          value={students.length}
          icon={<FaUserGraduate />}
          color="#2563eb"
        />

        <DashboardCard
          title="Vehicles"
          value={vehicles.length}
          icon={<FaCarSide />}
          color="#22c55e"
        />

        <DashboardCard
          title="Instructors"
          value={instructors.length}
          icon={<FaChalkboardTeacher />}
          color="#f59e0b"
        />

        <DashboardCard
          title="Pending Fees"
          value={`₹${totalPendingFees}`}
          icon={<FaMoneyBillWave />}
          color="#ef4444"
        />

        <DashboardCard
          title="Today's Classes"
          value={todayClasses}
          icon={<FaCalendarAlt />}
          color="#06b6d4"
        />

        <DashboardCard
          title="Present Today"
          value={presentToday}
          icon={<FaCheckCircle />}
          color="#22c55e"
        />

        <DashboardCard
          title="Absent Today"
          value={absentToday}
          icon={<FaTimesCircle />}
          color="#ef4444"
        />

        <DashboardCard
          title="RTO Tests"
          value={0}
          icon={<FaCalendarAlt />}
          color="#8b5cf6"
        />
      </div>
      <div
  style={{
    marginTop: "30px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
  }}
>
 <h2
  style={{
    color: "#ffffff",
    marginBottom: "20px",
  }}
>
  📊 Attendance Overview
</h2>

  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    <div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  }}
>
  <button className="quick-btn">➕ Add Student</button>
  <button className="quick-btn">🚗 Add Vehicle</button>
  <button className="quick-btn">📅 Schedule Class</button>
  <button className="quick-btn">📊 View Reports</button>
</div>
  </div>
</div>

    </div>
  </div>
  
);
}

export default Dashboard;