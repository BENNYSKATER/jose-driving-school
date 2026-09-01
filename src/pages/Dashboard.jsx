import React from "react";
import {
  FaGraduationCap,
  FaCar,
  FaUserTie,
  FaCalendarDays,
  FaMoneyBillWave,
  FaArrowTrendUp,
  FaArrowRight,
  FaClock,
  FaCheck,
  FaUserCheck,
  FaUserXmark,
  FaPlus,
  FaChartPie,
} from "react-icons/fa6";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="jds-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span className="school-label">JOSE DRIVING SCHOOL</span>
          <h1>Dashboard</h1>
          <p>Good afternoon 👋 Here's what's happening with your driving school.</p>
        </div>

        <div className="header-actions">
          <button className="add-btn">
            <FaPlus /> Add Student
          </button>

          <div className="system-status">
            <span></span>
            System Online
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <div className="stat-top">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <FaArrowRight className="arrow" />
          </div>

          <h2>24</h2>
          <p>Total Students</p>

          <div className="stat-bottom">
            <FaArrowTrendUp />
            <span>12% this month</span>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-top">
            <div className="stat-icon">
              <FaCar />
            </div>
            <FaArrowRight className="arrow" />
          </div>

          <h2>6</h2>
          <p>Vehicles</p>

          <div className="stat-bottom">
            <FaArrowTrendUp />
            <span>2 active today</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-top">
            <div className="stat-icon">
              <FaUserTie />
            </div>
            <FaArrowRight className="arrow" />
          </div>

          <h2>8</h2>
          <p>Instructors</p>

          <div className="stat-bottom">
            <FaArrowTrendUp />
            <span>All available</span>
          </div>
        </div>

        <div className="stat-card pink">
          <div className="stat-top">
            <div className="stat-icon">
              <FaCalendarDays />
            </div>
            <FaArrowRight className="arrow" />
          </div>

          <h2>12</h2>
          <p>Today's Sessions</p>

          <div className="stat-bottom">
            <FaClock />
            <span>4 upcoming</span>
          </div>
        </div>

      </div>

      {/* Financial Overview */}
      <div className="section-title">
        <div>
          <span>FINANCIAL OVERVIEW</span>
          <h2>Fee Summary</h2>
        </div>
      </div>

      <div className="fee-grid">

        <div className="fee-card">
          <div className="fee-icon blue-icon">
            <FaMoneyBillWave />
          </div>
          <div>
            <small>Total Fees</small>
            <h3>₹1,25,000</h3>
            <p>Overall student fees</p>
          </div>
        </div>

        <div className="fee-card">
          <div className="fee-icon green-icon">
            <FaMoneyBillWave />
          </div>
          <div>
            <small>Collected</small>
            <h3>₹98,000</h3>
            <p>Payments received</p>
          </div>
        </div>

        <div className="fee-card">
          <div className="fee-icon pink-icon">
            <FaMoneyBillWave />
          </div>
          <div>
            <small>Pending</small>
            <h3>₹27,000</h3>
            <p>Outstanding amount</p>
          </div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="main-grid">

        {/* Attendance */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>ATTENDANCE</span>
              <h2>Today's Overview</h2>
            </div>

            <div className="panel-icon">
              <FaUserCheck />
            </div>
          </div>

          <div className="attendance-content">

            <div className="attendance-circle">
              <div>
                <strong>87%</strong>
                <small>Present</small>
              </div>
            </div>

            <div className="attendance-details">

              <div className="attendance-item">
                <div className="attendance-name">
                  <span className="dot present"></span>
                  Present
                </div>
                <strong>21</strong>
              </div>

              <div className="attendance-item">
                <div className="attendance-name">
                  <span className="dot absent"></span>
                  Absent
                </div>
                <strong>3</strong>
              </div>

              <div className="attendance-item">
                <div className="attendance-name">
                  <span className="dot pending"></span>
                  Not Marked
                </div>
                <strong>0</strong>
              </div>

            </div>
          </div>
        </div>

        {/* Student Status */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>PAYMENTS</span>
              <h2>Student Status</h2>
            </div>

            <div className="panel-icon orange-panel">
              <FaMoneyBillWave />
            </div>
          </div>

          <div className="student-status">

            <div className="status-row">
              <div>
                <span className="status-dot paid"></span>
                Paid Students
              </div>
              <strong>18</strong>
            </div>

            <div className="status-row">
              <div>
                <span className="status-dot pending-status"></span>
                Pending Students
              </div>
              <strong>6</strong>
            </div>

            <div className="status-row">
              <div>
                <span className="status-dot overdue"></span>
                Overdue
              </div>
              <strong>2</strong>
            </div>

          </div>

          <div className="collection-bar">
            <div className="collection-info">
              <span>Fee Collection</span>
              <strong>78%</strong>
            </div>

            <div className="progress">
              <div></div>
            </div>
          </div>
        </div>

      </div>

      {/* Today's Schedule */}
      <div className="schedule-panel">

        <div className="panel-header">
          <div>
            <span>TODAY</span>
            <h2>Driving Schedule</h2>
          </div>

          <button className="view-btn">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="schedule-list">

          <div className="schedule-row">
            <div className="time">
              <strong>09:00</strong>
              <span>AM</span>
            </div>

            <div className="schedule-student">
              <div className="avatar">BM</div>
              <div>
                <strong>Benny Mon</strong>
                <span>Driving Practice</span>
              </div>
            </div>

            <div className="vehicle">
              <FaCar />
              BMW
            </div>

            <div className="schedule-status completed">
              <FaCheck /> Completed
            </div>
          </div>

          <div className="schedule-row">
            <div className="time">
              <strong>11:30</strong>
              <span>AM</span>
            </div>

            <div className="schedule-student">
              <div className="avatar">JD</div>
              <div>
                <strong>John David</strong>
                <span>Driving Practice</span>
              </div>
            </div>

            <div className="vehicle">
              <FaCar />
              Swift
            </div>

            <div className="schedule-status upcoming">
              <FaClock /> Upcoming
            </div>
          </div>

          <div className="schedule-row">
            <div className="time">
              <strong>02:30</strong>
              <span>PM</span>
            </div>

            <div className="schedule-student">
              <div className="avatar">AS</div>
              <div>
                <strong>Arun Kumar</strong>
                <span>Driving Practice</span>
              </div>
            </div>

            <div className="vehicle">
              <FaCar />
              Baleno
            </div>

            <div className="schedule-status upcoming">
              <FaClock /> Upcoming
            </div>
          </div>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">

        <div className="quick-title">
          <span>QUICK ACTIONS</span>
          <h2>Manage JDS</h2>
        </div>

        <button>
          <FaGraduationCap />
          <span>Add Student</span>
          <FaArrowRight />
        </button>

        <button>
          <FaMoneyBillWave />
          <span>Record Payment</span>
          <FaArrowRight />
        </button>

        <button>
          <FaCalendarDays />
          <span>Add Schedule</span>
          <FaArrowRight />
        </button>

        <button>
          <FaChartPie />
          <span>View Reports</span>
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
};

export default Dashboard;