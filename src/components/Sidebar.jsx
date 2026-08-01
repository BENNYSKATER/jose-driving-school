import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaUserTie,
  FaCarSide,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaPlusCircle,
  FaShieldAlt,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "../css/Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Add Student", path: "/add-student", icon: <FaPlusCircle /> },
    { name: "Instructors", path: "/instructors", icon: <FaUserTie /> },
    { name: "Vehicles", path: "/vehicles", icon: <FaCarSide /> },
    { name: "Add Vehicle", path: "/add-vehicle", icon: <FaPlusCircle /> },
    { name: "Fees", path: "/fees", icon: <FaMoneyBillWave /> },
    { name: "Schedule", path: "/schedule", icon: <FaCalendarAlt /> },
    { name: "Attendance", path: "/attendance", icon: <FaClipboardList /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="JDS Logo" />
        <h2>JDS</h2>
        <span>Jose Driving School</span>
      </div>

      <ul className="sidebar-menu">
        {menus.map((menu) => (
          <li
            key={menu.path}
            className={
              location.pathname === menu.path ? "active" : ""
            }
          >
            <Link to={menu.path}>
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <FaShieldAlt className="shield" />
        <h4>Drive Safe</h4>
        <p>
          Safety is our priority.
          <br />
          Drive safe and stay safe.
        </p>
      </div>

    </div>
  );
}

export default Sidebar;