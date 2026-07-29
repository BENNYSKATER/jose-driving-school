import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import "../css/Students.css";
import { Link } from "react-router-dom";

function Students() {
  const [search, setSearch] = useState("");
  console.log(useContext(StudentContext));
    const { students, deleteStudent, updateStudent } =
  useContext(StudentContext);
  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍🎓 Students</h1>

      <button>Add Student</button>
      
<input
  type="text"
  placeholder="🔍 Search Student..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
/>
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
  <td>{student.name}</td>
  <td>{student.mobile}</td>
  <td>{student.vehicle}</td>
  <td>₹{student.fees}</td>
  <td>{student.classesCompleted}</td>

  <td>
    <span
      style={{
        color: student.status === "Paid" ? "limegreen" : "red",
        fontWeight: "bold",
      }}
    >
      {student.status}
    </span>
  </td>
<td>
  <Link to={`/student/${index}`}>
    {student.name}
  </Link>
</td>
  <td>
    <button>✏️ Edit</button>

    <button style={{ marginLeft: "8px" }}>
      🗑 Delete
    </button>

    {student.status !== "Paid" && (
  <button
    onClick={() => {
      updateStudent(index, {
        ...student,
        status: "Paid",
      });
    }}
    style={{
      marginLeft: "8px",
      background: "green",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    💰 Mark Paid
  </button>
  
)}<button
  onClick={() => {
    updateStudent(index, {
      ...student,
      classesCompleted: student.classesCompleted + 1,
    });
  }}
>
  ➕ Class
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

export default Students;