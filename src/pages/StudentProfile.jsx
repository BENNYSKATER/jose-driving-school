import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function StudentProfile() {
  const { id } = useParams();

  const { students } = useContext(StudentContext);

  const student = students[id];

  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍🎓 Student Profile</h1>

      <h2>{student.name}</h2>

      <p>📱 Mobile : {student.mobile}</p>

      <p>🚗 Vehicle : {student.vehicle}</p>

      <p>💰 Fees : ₹{student.fees}</p>

      <p>
        Status :
        {student.status === "Paid" ? " ✅ Paid" : " ❌ Pending"}
      </p>
    </div>
  );
}

export default StudentProfile;