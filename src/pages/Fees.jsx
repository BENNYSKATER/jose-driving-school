import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function Fees() {
  const { students } = useContext(StudentContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>💰 Fees Management</h1>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Vehicle</th>
            <th>Total Fees</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.vehicle}</td>
              <td>₹{student.fees}</td>
              <td>{student.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fees;