import { useContext } from "react";
import {
  FaUserGraduate,
  FaCarSide,
  FaUserTie,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClipboardCheck,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AttendanceContext } from "../context/AttendanceContext";

import "../css/Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const { students = [] } = useContext(StudentContext);
  const { vehicles = [] } = useContext(VehicleContext);
  const { instructors = [] } = useContext(InstructorContext);
  const { schedules = [] } = useContext(ScheduleContext);
  const { attendance = [] } = useContext(AttendanceContext);

  const totalFees = students.reduce(
    (sum, student) =>
      sum + Number(student.fees || 0),
    0
  );

  const collectedFees = students.reduce(
    (sum, student) =>
      sum + Number(student.paid || 0),
    0
  );

  const pendingFees = students.reduce(
    (sum, student) =>
      sum + Number(student.balance || 0),
    0
  );

  const present = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const paidStudents = students.filter(
    (student) => student.status === "Paid"
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: <FaUserGraduate />,
      className: "cyan",
      link: "/students",
    },
    {
      title: "Vehicles",
      value: vehicles.length,
      icon: <FaCarSide />,
      className: "amber",
      link: "/vehicles",
    },
    {
      title: "Instructors",
      value: instructors.length,
      icon: <FaUserTie />,
      className: "green",
      link: "/instructors",
    },
    {
      title: "Schedules",
      value: schedules.length,
      icon: <FaCalendarAlt />,
      className: "coral",
      link: "/schedule",
    },
  ];

  return (
  <>
    <Sidebar />

    <div className="dashboard-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-small-title">
            JOSE DRIVING SCHOOL
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back. Here's what's happening
            with your driving school.
          </p>
        </div>

        <div className="dashboard-status">
          <span className="status-dot"></span>

          System Online
        </div>

      </div>


      {/* =====================================
          STAT CARDS
      ===================================== */}

      <div className="dashboard-stats">

        {stats.map((stat) => (
          <Link
            to={stat.link}
            className={`dashboard-stat-card ${stat.className}`}
            key={stat.title}
          >

            <div className="stat-top">

              <div className="stat-icon">
                {stat.icon}
              </div>

              <FaArrowRight className="stat-arrow" />

            </div>

            <div className="stat-value">
              {stat.value}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

            <div className="stat-bottom">
              <FaArrowUp />
              Active records
            </div>

          </Link>
        ))}

      </div>


      {/* =====================================
          FINANCE SECTION
      ===================================== */}

      <div className="dashboard-section-title">
        <div>
          <span>FINANCIAL OVERVIEW</span>
          <h2>Fee Summary</h2>
        </div>
      </div>


      <div className="finance-grid">

        {/* TOTAL */}

        <div className="finance-card cyan">

          <div className="finance-icon">
            <FaMoneyBillWave />
          </div>

          <div className="finance-info">
            <span>Total Fees</span>

            <strong>
              ₹{totalFees.toLocaleString("en-IN")}
            </strong>

            <small>
              Overall student fees
            </small>
          </div>

        </div>


        {/* COLLECTED */}

        <div className="finance-card green">

          <div className="finance-icon">
            <FaMoneyBillWave />
          </div>

          <div className="finance-info">
            <span>Collected</span>

            <strong>
              ₹{collectedFees.toLocaleString("en-IN")}
            </strong>

            <small>
              Payments received
            </small>
          </div>

        </div>


        {/* PENDING */}

        <div className="finance-card coral">

          <div className="finance-icon">
            <FaMoneyBillWave />
          </div>

          <div className="finance-info">
            <span>Pending</span>

            <strong>
              ₹{pendingFees.toLocaleString("en-IN")}
            </strong>

            <small>
              Outstanding amount
            </small>
          </div>

        </div>

      </div>


      {/* =====================================
          LOWER GRID
      ===================================== */}

      <div className="dashboard-lower-grid">

        {/* ATTENDANCE */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span>
                ATTENDANCE
              </span>

              <h2>
                Today's Overview
              </h2>
            </div>

            <div className="panel-icon">
              <FaClipboardCheck />
            </div>

          </div>


          <div className="attendance-content">

            <div className="attendance-circle">

              <div>
                <strong>
                  {present}
                </strong>

                <span>
                  Present
                </span>
              </div>

            </div>


            <div className="attendance-details">

              <div>
                <span className="attendance-dot present"></span>

                <span>
                  Present
                </span>

                <strong>
                  {present}
                </strong>
              </div>

              <div>
                <span className="attendance-dot absent"></span>

                <span>
                  Absent
                </span>

                <strong>
                  {Math.max(
                    attendance.length - present,
                    0
                  )}
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* STUDENT STATUS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span>
                PAYMENTS
              </span>

              <h2>
                Student Status
              </h2>
            </div>

            <div className="panel-icon amber-icon">
              <FaMoneyBillWave />
            </div>

          </div>


          <div className="student-status">

            <div className="status-row">

              <div>
                <span className="mini-dot paid"></span>

                Paid Students
              </div>

              <strong>
                {paidStudents}
              </strong>

            </div>


            <div className="status-row">

              <div>
                <span className="mini-dot pending"></span>

                Pending Students
              </div>

              <strong>
                {Math.max(
                  students.length - paidStudents,
                  0
                )}
              </strong>

            </div>


            <div className="status-progress">

              <div
                style={{
                  width:
                    students.length > 0
                      ? `${(
                          (paidStudents /
                            students.length) *
                          100
                        ).toFixed(0)}%`
                      : "0%",
                }}
              ></div>

            </div>

          </div>


          <Link
            to="/students"
            className="panel-link"
          >
            View Students

            <FaArrowRight />

          </Link>

        </div>

      </div>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <div className="dashboard-section-title quick-title">

        <div>
          <span>QUICK ACTIONS</span>

          <h2>
            Manage JDS
          </h2>
        </div>

      </div>


      <div className="quick-actions">

        <Link
          to="/add-student"
          className="quick-action"
        >
          <FaUserGraduate />

          <div>
            <strong>
              Add Student
            </strong>

            <span>
              Register a new student
            </span>
          </div>

          <FaArrowRight />
        </Link>


        <Link
          to="/vehicles"
          className="quick-action"
        >
          <FaCarSide />

          <div>
            <strong>
              Vehicles
            </strong>

            <span>
              Manage school vehicles
            </span>
          </div>

          <FaArrowRight />
        </Link>


        <Link
          to="/schedule"
          className="quick-action"
        >
          <FaCalendarAlt />

          <div>
            <strong>
              Schedule
            </strong>

            <span>
              View driving schedules
            </span>
          </div>

          <FaArrowRight />
        </Link>

      </div>

     </div>
  </>
  );
}
export default Dashboard;