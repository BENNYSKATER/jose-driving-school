import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🚗 JDS</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/students">👨‍🎓 Students</Link></li>
        <li><Link to="/add-student">➕ Add Student</Link></li>
        <li><Link to="/instructors">👨‍🏫 Instructors</Link></li>
        <li><Link to="/vehicles">🚗 Vehicles</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;