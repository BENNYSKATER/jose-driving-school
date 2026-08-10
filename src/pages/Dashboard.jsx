import Sidebar from "../components/Sidebar";
import "../css/Sidebar.css";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaCarSide,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
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
import { SettingsContext } from "../context/SettingsContext";

import { getNotifications } from "../utils/notifications";

import "../css/Dashboard.css";


const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 18px 35px rgba(15, 23, 42, 0.12)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "24px",
        minHeight: "135px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.07)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #eef2f7",
        cursor: "pointer",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "10px 0 0",
            color: "#0f172a",
            fontWeight: "800",
            fontSize: "32px",
          }}
        >
          {value}
        </h2>
      </div>

      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "16px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          fontSize: "24px",
          boxShadow: `0 8px 18px ${color}45`,
        }}
      >
        {icon}
      </div>
    </motion.div>
  );
};


function Dashboard() {
  const { students } = useContext(StudentContext);
  const { vehicles } = useContext(VehicleContext);
  const { instructors } = useContext(InstructorContext);
  const { schedules } = useContext(ScheduleContext);
  const { attendance } = useContext(AttendanceContext);
  const { settings } = useContext(SettingsContext);

  const [showNotifications, setShowNotifications] = useState(false);

  const totalPendingFees = students.reduce(
    (total, student) => total + Number(student.balance || 0),
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const presentToday = attendance.filter(
    (a) => a.date === today && a.status === "Present"
  ).length;

  const absentToday = attendance.filter(
    (a) => a.date === today && a.status === "Absent"
  ).length;

  const todayClasses = schedules.filter(
    (schedule) => schedule.date === today
  ).length;

  const chartData = [
    {
      name: "Present",
      value: presentToday,
    },
    {
      name: "Absent",
      value: absentToday,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const notifications = getNotifications(
    students,
    schedules,
    vehicles
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "28px",
          background: "#f4f7fb",
          minWidth: 0,
        }}
      >

        {/* ================= TOPBAR ================= */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "22px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            border: "1px solid #eef2f7",
          }}
        >

          {/* School information */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {settings.logo ? (
              <img
                src={settings.logo}
                alt="School Logo"
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  objectFit: "cover",
                  border: "1px solid #e2e8f0",
                }}
              />
            ) : (
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                }}
              >
                🚗
              </div>
            )}

            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#0f172a",
                  fontSize: "25px",
                  fontWeight: "800",
                }}
              >
                {settings.schoolName || "Jose Driving School"}
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Driving School Management System
              </p>
            </div>
          </div>


          {/* Right side */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >

            {/* Search */}

            <div
              style={{
                width: "220px",
                height: "44px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
              }}
            >
              <span style={{ marginRight: "8px" }}>🔍</span>

              <input
                type="text"
                placeholder="Search..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                  fontSize: "14px",
                  padding: 0,
                }}
              />
            </div>


            {/* Notification */}

            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <FaBell />
              </button>

              {notifications.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "#ef4444",
                    color: "#ffffff",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                    border: "2px solid #ffffff",
                  }}
                >
                  {notifications.length}
                </span>
              )}

              {showNotifications && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    top: "54px",
                    right: 0,
                    width: "340px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
                    padding: "18px",
                    zIndex: 1000,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 14px",
                      color: "#0f172a",
                      fontSize: "17px",
                    }}
                  >
                    🔔 Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p
                      style={{
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      No new notifications 🎉
                    </p>
                  ) : (
                    notifications.map((notification, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "12px",
                          marginBottom: "8px",
                          background: "#f8fafc",
                          borderRadius: "10px",
                          borderLeft: `4px solid ${
                            notification.type === "fee"
                              ? "#ef4444"
                              : notification.type === "schedule"
                              ? "#2563eb"
                              : "#f59e0b"
                          }`,
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#334155",
                        }}
                      >
                        {notification.type === "fee" && "💰 "}
                        {notification.type === "schedule" && "📅 "}
                        {notification.type === "vehicle" && "🚗 "}
                        {notification.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>


            {/* Admin */}

            <div
              style={{
                background: "#2563eb",
                color: "#ffffff",
                borderRadius: "14px",
                padding: "10px 18px",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontWeight: "700",
                minWidth: "105px",
                justifyContent: "center",
              }}
            >
              👤 Admin
            </div>

          </div>
        </div>


        {/* ================= PAGE TITLE ================= */}

        <div
          style={{
            marginTop: "28px",
            marginBottom: "18px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "26px",
              fontWeight: "800",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Here's what's happening in your driving school today.
          </p>
        </div>


        {/* ================= DASHBOARD CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
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


        {/* ================= BOTTOM SECTION ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.4fr) minmax(280px, 0.6fr)",
            gap: "20px",
            marginTop: "24px",
          }}
        >

          {/* Attendance */}

          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              border: "1px solid #eef2f7",
              minHeight: "350px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "19px",
                    fontWeight: "800",
                  }}
                >
                  📊 Attendance Overview
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  Today's student attendance
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "270px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {presentToday === 0 && absentToday === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#94a3b8",
                  }}
                >
                  <div
                    style={{
                      fontSize: "42px",
                      marginBottom: "10px",
                    }}
                  >
                    📊
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontWeight: "600",
                    }}
                  >
                    No attendance recorded today
                  </p>
                </div>
              ) : (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      innerRadius={55}
                      paddingAngle={4}
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
              )}
            </div>
          </div>


          {/* Quick Actions */}

          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              border: "1px solid #eef2f7",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "19px",
                fontWeight: "800",
              }}
            >
              ⚡ Quick Actions
            </h2>

            <p
              style={{
                margin: "5px 0 18px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Frequently used actions
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
              }}
            >
              <button className="quick-btn">
                ➕ Add Student
              </button>

              <button className="quick-btn">
                🚗 Add Vehicle
              </button>

              <button className="quick-btn">
                📅 Schedule Class
              </button>

              <button className="quick-btn">
                📊 View Reports
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;