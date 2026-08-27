import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: "⌂",
      path: "/dashboard",
    },
    {
      title: "Students",
      icon: "👨‍🎓",
      path: "/students",
    },
    {
      title: "Instructors",
      icon: "👨‍🏫",
      path: "/instructors",
    },
    {
      title: "Vehicles",
      icon: "🚗",
      path: "/vehicles",
    },
    {
      title: "Fees",
      icon: "💰",
      path: "/fees",
    },
    {
      title: "Schedule",
      icon: "📅",
      path: "/schedule",
    },
    {
      title: "Attendance",
      icon: "✓",
      path: "/attendance",
    },
    {
      title: "Reports",
      icon: "📊",
      path: "/reports",
    },
  ];

  return (
    <aside className="jds-sidebar">

      {/* =====================================
          LOGO
      ===================================== */}

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          🚗
        </div>

        <div className="sidebar-brand-text">
          <h2>JDS</h2>
          <span>Driving School</span>
        </div>

      </div>


      {/* =====================================
          MENU
      ===================================== */}

      <nav className="sidebar-menu">

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="sidebar-link-icon">
              {item.icon}
            </span>

            <span className="sidebar-link-text">
              {item.title}
            </span>

          </NavLink>

        ))}


        <div className="sidebar-section-title settings-title">
          SYSTEM
        </div>


        {/* SETTINGS */}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <span className="sidebar-link-icon">
            ⚙️
          </span>

          <span className="sidebar-link-text">
            Settings
          </span>

        </NavLink>

      </nav>


      {/* =====================================
          BOTTOM CARD
      ===================================== */}

      <div className="sidebar-bottom-card">

        <div className="sidebar-bottom-icon">
          🚘
        </div>

        <div>
          <strong>
            Jose Driving School
          </strong>

          <span>
            Management System
          </span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;