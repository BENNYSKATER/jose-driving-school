import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { AttendanceContext } from "../context/AttendanceContext";

function StudentProfile() {
  const { id } = useParams();

  const { students } = useContext(StudentContext);
const { attendance } = useContext(AttendanceContext);
const student = students[id];
const studentAttendance = attendance.filter(
  (record) => record.student === student.name
);

console.log(student);

if (!student) {
  return <h2>Student Not Found</h2>;
}

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>👨‍🎓 Student Profile</h1>

      <hr />

      <h2>{student.name}</h2>

      <p><b>📱 Mobile :</b> {student.mobile}</p>

      <p><b>🚗 Vehicle :</b> {student.vehicle}</p>

      <p><b>💰 Total Fees :</b> ₹{student.fees}</p>

      <p><b>💵 Paid :</b> ₹{student.paid || 0}</p>

      <p><b>💳 Balance :</b> ₹{student.balance || student.fees}</p>

      <p>
        <b>📌 Status :</b>{" "}
        {student.status === "Paid" ? "✅ Paid" : "❌ Pending"}
      </p>

      <p>
        <b>🎯 Classes Completed :</b>{" "}
        {student.classesCompleted || 0}
      </p>

      <hr />

      <h2>📅 Attendance History</h2>

{studentAttendance.length === 0 ? (
  <p>No Attendance Records</p>
) : (
  <table
    border="1"
    cellPadding="10"
    style={{
      width: "100%",
      marginTop: "10px",
    }}
  >
    <thead>
      <tr>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {studentAttendance.map((record, index) => (
        <tr key={index}>
          <td>{record.date}</td>
          <td>
            {record.status === "Present"
              ? "✅ Present"
              : "❌ Absent"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      <hr />

      <h2>💰 Payment History</h2>

{student.paymentHistory &&
student.paymentHistory.length > 0 ? (

  <table
    border="1"
    cellPadding="10"
    style={{
      width: "100%",
      marginTop: "10px",
    }}
  >
    <thead>
      <tr>
        <th>Date</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      {student.paymentHistory.map((payment, index) => (
        <tr key={index}>
          <td>{payment.date}</td>
          <td>₹{payment.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>

) : (
  <p>No Payments Yet</p>
)}

      <hr />

      <button
        onClick={() => window.print()}
        style={{
          background: "#1976d2",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🖨 Print Student Details
      </button>
    </div>
  );
}

export default StudentProfile;