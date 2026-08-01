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


const DashboardCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.2 }}
    style={{
      background: "#fff",
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderLeft: `6px solid ${color}`,
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#777",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "10px",
          color: "#111827",
        }}
      >
        {value}
      </h2>
    </div>

    <div
      style={{
        fontSize: "42px",
        color: color,
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
    <h2>🚗 Jose Driving School</h2>
    <p>Driving School Management System</p>
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
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  }}
>
  <h2>📊 Attendance Overview</h2>

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