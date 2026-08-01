import { useContext } from "react";
import { Link } from "react-router-dom";
import { AttendanceContext } from "../context/AttendanceContext";

function Attendance() {
  const { attendance, deleteAttendance } =
    useContext(AttendanceContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Attendance</h1>

      <Link to="/add-attendance">
        <button
          style={{
            background: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Add Attendance
        </button>
      </Link>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="4">
                No Attendance Records
              </td>
            </tr>
          ) : (
            attendance.map((record, index) => (
              <tr key={index}>
                <td>{record.student}</td>
                <td>{record.date}</td>
                <td>
                  {record.status === "Present"
                    ? "✅ Present"
                    : "❌ Absent"}
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteAttendance(index)
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;