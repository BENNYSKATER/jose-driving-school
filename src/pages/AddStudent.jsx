import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const { addStudent } = useContext(StudentContext);
const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState("Pending");
const [photo, setPhoto] = useState("");
const [aadhaar, setAadhaar] = useState("");
const [learner, setLearner] = useState("");
const [license, setLicense] = useState("");
  const handleSave = () => {
addStudent({
  name,
  mobile,
  vehicle,
  fees: Number(fees),
  paid: 0,
  balance: Number(fees),
  status: "Pending",
  photo,
  aadhaar,
  learner,
  license,
});

  alert("Student Added Successfully ✅");
  navigate("/students");

  setName("");
  setMobile("");
  setVehicle("");
  setFees("");
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>➕ Add Student</h1>

      <br />

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />
      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }}
/>

<br /><br />
     
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <select
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="Bike + Car">Bike + Car</option>
      </select>
<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="Pending">Pending</option>
  <option value="Paid">Paid</option>
</select>
      <br /><br />

      <input
        type="number"
        placeholder="Fees"
        value={fees}
        onChange={(e) => setFees(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSave}>Save Student</button>
    </div>
  );
}

export default AddStudent;