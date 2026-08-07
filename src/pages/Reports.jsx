import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { exportStudents } from "../utils/exportExcel";

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

  const cards = [
    { title: "👨‍🎓 Students", value: students.length, color: "#2563eb" },
    { title: "🚗 Vehicles", value: vehicles.length, color: "#22c55e" },
    { title: "👨‍🏫 Instructors", value: instructors.length, color: "#f59e0b" },
    { title: "📅 Schedules", value: schedules.length, color: "#06b6d4" },
    { title: "💰 Total Fees", value: `₹${totalFees}`, color: "#8b5cf6" },
    { title: "💵 Collected", value: `₹${collectedFees}`, color: "#16a34a" },
    { title: "💸 Pending", value: `₹${pendingFees}`, color: "#ef4444" },
    { title: "✅ Present", value: present, color: "#22c55e" },
    { title: "❌ Absent", value: absent, color: "#dc2626" },
    { title: "💳 Paid Students", value: paidStudents, color: "#0891b2" },
    { title: "⌛ Pending Students", value: pendingStudents, color: "#ea580c" },
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#1e3a8a",
            }}
          >
            📊 Reports Dashboard
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "5px",
            }}
          >
            Overall Driving School Analytics
          </p>
        </div>

        <button
          onClick={() => exportStudents(students)}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          📥 Export Excel
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              borderLeft: `6px solid ${card.color}`,
              cursor: "pointer",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 18px 35px rgba(37,99,235,.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.08)";
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#374151",
                fontWeight: "700",
              }}
            >
              {card.title}
            </h3>

            <h1
              style={{
                marginTop: "18px",
                color: card.color,
                fontSize: "42px",
                fontWeight: "800",
              }}
            >
              {card.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;