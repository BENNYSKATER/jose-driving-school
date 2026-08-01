import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { useNavigate } from "react-router-dom";

function AddAttendance() {
  const { students } = useContext(StudentContext);
  const { addAttendance } = useContext(AttendanceContext);

  const navigate = useNavigate();

  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSave = () => {
    if (!student || !date) {
      alert("Please fill all fields");
      return;
    }

    addAttendance({
      student,
      date,
      status,
    });

    alert("✅ Attendance Added");

    navigate("/attendance");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>➕ Add Attendance</h1>

      <br />

      <select
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      >
        <option value="">Select Student</option>

        {students.map((s, index) => (
          <option key={index} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Present">✅ Present</option>
        <option value="Absent">❌ Absent</option>
      </select>

      <br /><br />

      <button onClick={handleSave}>
        Save Attendance
      </button>
    </div>
  );
}

export default AddAttendance;