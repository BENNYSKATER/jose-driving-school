import { useState, useContext } from "react";
import { InstructorContext } from "../context/InstructorContext";

function AddInstructor() {
  const { addInstructor } = useContext(InstructorContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [experience, setExperience] = useState("");

  const save = () => {
    addInstructor({
      name,
      mobile,
      experience,
      status: "Available",
    });

    alert("Instructor Added");

    setName("");
    setMobile("");
    setExperience("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>➕ Add Instructor</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <br /><br />

      <button onClick={save}>
        Save Instructor
      </button>
    </div>
  );
}

export default AddInstructor;