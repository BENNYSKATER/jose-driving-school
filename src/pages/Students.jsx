import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import "../css/Students.css";
import { Link } from "react-router-dom";
import { generateReceipt } from "../utils/generateReceipt";
console.log(generateReceipt);

function Students() {
  const [search, setSearch] = useState("");
  console.log(useContext(StudentContext));
    const { students, deleteStudent, updateStudent } =
  useContext(StudentContext);
  const actionBtn = {
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  fontSize: "13px",
};
  return (
  <div
  style={{
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  }}
>

  {/* Header */}

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    }}
  >

    <div>
      <h1
        style={{
          margin: 0,
          color: "#1e3a8a",
        }}
      >
        👨‍🎓 Students
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginTop: "6px",
        }}
      >
        Manage all driving school students
      </p>
    </div>

    <Link to="/add-student">
      <button
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 22px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ➕ Add Student
      </button>
    </Link>

  </div>

  {/* Search */}

  <input
    type="text"
    placeholder="🔍 Search Student..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "350px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      marginBottom: "25px",
      background: "#fff",
    }}
  />
<div
style={{
background:"#fff",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 8px 20px rgba(0,0,0,.08)",
}}
>

<table
border="1"
cellPadding="10"
className="students-table"
>
        <thead>
         <tr>
  <th>Name</th>
  <th>Mobile</th>
  <th>Vehicle</th>
  <th>Fees</th>
  <th>Paid</th>
  <th>Balance</th>
  <th>Status</th>
  <th>Actions</th>
  <th>Practice Classes</th>
  
</tr>
        </thead>

        <tbody>
  {students.length === 0 ? (
    <tr>
      <td colSpan="4">No Students Found</td>
      <td>
 
</td>
    </tr>
  ) : (
   students
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((student, index) => (
     <tr key={index}>
 <td>
  <Link
    to={`/student/${index}`}
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    {student.name}
  </Link>
</td>
  <td>{student.mobile}</td>
  <td>{student.vehicle}</td>

  <td>₹{student.fees}</td>
  <td>₹{student.paid}</td>
  <td>₹{student.balance}</td>

  {/* Status */}
  <td>
    <span
  style={{
    background:
      student.status === "Paid"
        ? "#dcfce7"
        : "#fee2e2",
    color:
      student.status === "Paid"
        ? "#166534"
        : "#991b1b",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "13px",
  }}
>
  {student.status}
</span>

  </td>

  {/* Actions */}
  <td>
   <Link to={`/edit-student/${index}`}>
  <button
    style={{
      ...actionBtn,
      background: "#3b82f6",
      marginBottom: "5px",
    }}
  >
    ✏️ Edit
  </button>
</Link>

    <br />

    <button
      onClick={() => {
        if (window.confirm("Delete this student?")) {
          deleteStudent(index);
        }
      }}
      style={{
...actionBtn,
background:"#ef4444",
marginBottom:"5px",
}}
    >
      🗑 Delete
    </button>

    <br />

    {student.status !== "Paid" && (
      <>
        <button
          onClick={() => {
            updateStudent(index, {
              ...student,
              status: "Paid",
            });
          }}
          style={{
...actionBtn,
background:"#16a34a",
marginBottom:"5px",
}}
        >
          💰 Mark Paid
        </button>

        <br />
      </>
    )}

    <button
      onClick={() => {
        updateStudent(index, {
          ...student,
          classesCompleted: (student.classesCompleted || 0) + 1,
        });
      }}
      style={{
  ...actionBtn,
  background: "#8b5cf6",
}}
    >
      ➕ Class
    </button>

    <br />

    <button
      onClick={() => {
        const amount = Number(prompt("Enter Payment Amount"));

        if (!amount || amount <= 0) return;

        const paid = (student.paid || 0) + amount;
        const balance = student.fees - paid;

        const updatedStudent = {
          ...student,
          paid,
          balance,
          status: balance <= 0 ? "Paid" : "Pending",
          paymentHistory: [
            ...(student.paymentHistory || []),
            {
              amount,
              date: new Date().toLocaleDateString(),
            },
          ],
        };

        updateStudent(index, updatedStudent);
        generateReceipt(updatedStudent, amount);
      }}
      style={{
  ...actionBtn,
  background: "#22c55e",
}}
    >
      💰 Pay
    </button>
  </td>

  {/* Practice Classes */}
  <td>{student.classesCompleted || 0}</td>
</tr>
        ))
      )}
    </tbody>
  </table>
</div>
</div>
);
}

export default Students;