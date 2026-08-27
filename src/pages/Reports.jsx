import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { exportStudents } from "../utils/exportExcel";
import "../css/Reports.css";

function Reports() {
  const { students = [] } = useContext(StudentContext);
  const { vehicles = [] } = useContext(VehicleContext);
  const { instructors = [] } = useContext(InstructorContext);
  const { schedules = [] } = useContext(ScheduleContext);

  // IMPORTANT:
  // AttendanceContext uses "attendances", not "attendance"
  const { attendances = [] } = useContext(AttendanceContext);

  /* =========================
     FEES
  ========================= */

  const paidStudents = students.filter(
    (student) =>
      student.status === "Paid" ||
      Number(student.balance || 0) === 0
  ).length;

  const pendingStudents =
    students.length - paidStudents;

  const totalFees = students.reduce(
    (sum, student) =>
      sum + Number(student.fees || 0),
    0
  );

  const collectedFees = students.reduce(
    (sum, student) =>
      sum + Number(
        student.paid ||
        student.paidAmount ||
        0
      ),
    0
  );

  const pendingFees = students.reduce(
    (sum, student) =>
      sum +
      Number(
        student.balance ||
        Math.max(
          Number(student.fees || 0) -
            Number(
              student.paid ||
              student.paidAmount ||
              0
            ),
          0
        )
      ),
    0
  );

  /* =========================
     ATTENDANCE
  ========================= */

  const present = attendances.filter(
    (item) => item.status === "Present"
  ).length;

  const absent = attendances.filter(
    (item) => item.status === "Absent"
  ).length;

  const late = attendances.filter(
    (item) => item.status === "Late"
  ).length;

  /* =========================
     CARDS
  ========================= */

  const cards = [
    {
      title: "Students",
      icon: "👨‍🎓",
      value: students.length,
      color: "#2563eb",
    },
    {
      title: "Vehicles",
      icon: "🚗",
      value: vehicles.length,
      color: "#22c55e",
    },
    {
      title: "Instructors",
      icon: "👨‍🏫",
      value: instructors.length,
      color: "#f59e0b",
    },
    {
      title: "Schedules",
      icon: "📅",
      value: schedules.length,
      color: "#06b6d4",
    },
    {
      title: "Total Fees",
      icon: "💰",
      value: `₹${totalFees.toLocaleString("en-IN")}`,
      color: "#8b5cf6",
    },
    {
      title: "Collected",
      icon: "💵",
      value: `₹${collectedFees.toLocaleString(
        "en-IN"
      )}`,
      color: "#16a34a",
    },
    {
      title: "Pending Fees",
      icon: "💸",
      value: `₹${pendingFees.toLocaleString(
        "en-IN"
      )}`,
      color: "#ef4444",
    },
    {
      title: "Present",
      icon: "✅",
      value: present,
      color: "#22c55e",
    },
    {
      title: "Absent",
      icon: "❌",
      value: absent,
      color: "#dc2626",
    },
    {
      title: "Late",
      icon: "⏰",
      value: late,
      color: "#f59e0b",
    },
    {
      title: "Paid Students",
      icon: "💳",
      value: paidStudents,
      color: "#0891b2",
    },
    {
      title: "Pending Students",
      icon: "⌛",
      value: pendingStudents,
      color: "#ea580c",
    },
  ];

  /* =========================
     ATTENDANCE %
  ========================= */

  const totalAttendance =
    attendances.length;

  const attendancePercentage =
    totalAttendance > 0
      ? Math.round(
          (present / totalAttendance) * 100
        )
      : 0;

  return (
    <div className="reports-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="reports-header">

        <div>
          <div className="reports-title">
            📊 Reports
          </div>

          <p>
            Overall driving school analytics
          </p>
        </div>

        <button
          className="reports-export-btn"
          onClick={() =>
            exportStudents(students)
          }
        >
          📥 Export Excel
        </button>

      </div>

      {/* =========================
          OVERVIEW CARDS
      ========================= */}

      <div className="reports-grid">

        {cards.map((card, index) => (
          <div
            className="report-card"
            key={index}
            style={{
              "--card-color": card.color,
            }}
          >

            <div className="report-card-top">

              <div className="report-card-title">
                <span>
                  {card.icon}
                </span>

                <span>
                  {card.title}
                </span>
              </div>

              <div
                className="report-card-icon"
                style={{
                  background: `${card.color}18`,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>

            </div>

            <h2
              style={{
                color: card.color,
              }}
            >
              {card.value}
            </h2>

          </div>
        ))}

      </div>

      {/* =========================
          LOWER SECTION
      ========================= */}

      <div className="reports-bottom">

        {/* ATTENDANCE */}

        <div className="reports-panel">

          <div className="reports-panel-header">

            <div>
              <h2>
                📋 Attendance Overview
              </h2>

              <p>
                Current attendance summary
              </p>
            </div>

            <span className="reports-panel-badge">
              {totalAttendance} Records
            </span>

          </div>

          <div className="attendance-report-content">

            <div className="attendance-circle">

              <div>
                <strong>
                  {attendancePercentage}%
                </strong>

                <span>
                  Present
                </span>
              </div>

            </div>

            <div className="attendance-report-stats">

              <div>
                <span className="report-dot present-dot" />

                <span>
                  Present
                </span>

                <strong>
                  {present}
                </strong>
              </div>

              <div>
                <span className="report-dot absent-dot" />

                <span>
                  Absent
                </span>

                <strong>
                  {absent}
                </strong>
              </div>

              <div>
                <span className="report-dot late-dot" />

                <span>
                  Late
                </span>

                <strong>
                  {late}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* FEES */}

        <div className="reports-panel">

          <div className="reports-panel-header">

            <div>
              <h2>
                💰 Fee Overview
              </h2>

              <p>
                Student payment summary
              </p>
            </div>

          </div>

          <div className="fee-report-list">

            <div className="fee-report-item">

              <div>
                <span className="fee-icon total">
                  💰
                </span>

                <span>
                  Total Fees
                </span>
              </div>

              <strong>
                ₹{totalFees.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="fee-report-item">

              <div>
                <span className="fee-icon collected">
                  💵
                </span>

                <span>
                  Collected
                </span>
              </div>

              <strong className="collected-text">
                ₹{collectedFees.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="fee-report-item">

              <div>
                <span className="fee-icon pending">
                  💸
                </span>

                <span>
                  Pending
                </span>
              </div>

              <strong className="pending-text">
                ₹{pendingFees.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;