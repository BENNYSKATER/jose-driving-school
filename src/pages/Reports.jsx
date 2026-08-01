import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { exportStudents } from "../utils/exportExcel";

const cardStyle = {
  background: "#111",
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

function Reports() {
  const { students } = useContext(StudentContext);
  const { vehicles } = useContext(VehicleContext);
  const { instructors } = useContext(InstructorContext);
  const { schedules } = useContext(ScheduleContext);
  const { attendance } = useContext(AttendanceContext);

  const paidStudents = students.filter(
    (s) => s.status === "Paid"
  ).length;

  const pendingStudents = students.length - paidStudents;

  const totalFees = students.reduce(
    (sum, s) => sum + Number(s.fees || 0),
    0
  );

  const collectedFees = students.reduce(
    (sum, s) => sum + Number(s.paid || 0),
    0
  );

  const pendingFees = students.reduce(
    (sum, s) => sum + Number(s.balance || 0),
    0
  );

  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Reports Dashboard</h1><button
  onClick={() => exportStudents(students)}
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
  📥 Export Students to Excel
</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <div style={cardStyle}>
          <h2>👨‍🎓 Students</h2>
          <h1>{students.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>🚗 Vehicles</h2>
          <h1>{vehicles.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>👨‍🏫 Instructors</h2>
          <h1>{instructors.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>📅 Schedules</h2>
          <h1>{schedules.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>💰 Total Fees</h2>
          <h1>₹{totalFees}</h1>
        </div>

        <div style={cardStyle}>
          <h2>💵 Collected</h2>
          <h1>₹{collectedFees}</h1>
        </div>

        <div style={cardStyle}>
          <h2>💸 Pending</h2>
          <h1>₹{pendingFees}</h1>
        </div>

        <div style={cardStyle}>
          <h2>✅ Present</h2>
          <h1>{present}</h1>
        </div>

        <div style={cardStyle}>
          <h2>❌ Absent</h2>
          <h1>{absent}</h1>
        </div>

        <div style={cardStyle}>
          <h2>💳 Paid Students</h2>
          <h1>{paidStudents}</h1>
        </div>

        <div style={cardStyle}>
          <h2>⌛ Pending Students</h2>
          <h1>{pendingStudents}</h1>
        </div>
      </div>
    </div>
  );
}

export default Reports;