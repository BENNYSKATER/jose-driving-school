import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { students, updateStudent } = useContext(StudentContext);

  const student = students[id];

  const [name, setName] = useState(student?.name || "");
  const [mobile, setMobile] = useState(student?.mobile || "");
  const [vehicle, setVehicle] = useState(student?.vehicle || "");
  const [fees, setFees] = useState(student?.fees || 0);

  if (!student) return <h2>Student Not Found</h2>;

  const handleUpdate = () => {
    updateStudent(id, {
      ...student,
      name,
      mobile,
      vehicle,
      fees: Number(fees),
    });

    alert("Student Updated Successfully ✅");
    navigate("/students");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>✏️ Edit Student</h1>

      <br />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />

      <br /><br />

      <input
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
      />

      <br /><br />

      <select
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option>Bike</option>
        <option>Car</option>
        <option>Bike + Car</option>
      </select>

      <br /><br />

      <input
        type="number"
        value={fees}
        onChange={(e) => setFees(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        💾 Update Student
      </button>
    </div>
  );
}

export default EditStudent;