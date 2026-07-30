import { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";
import { InstructorContext } from "../context/InstructorContext";
import { ScheduleContext } from "../context/ScheduleContext";

function AddSchedule() {
  const { students } = useContext(StudentContext);
  const { vehicles } = useContext(VehicleContext);
  const { instructors } = useContext(InstructorContext);
  const { addSchedule } = useContext(ScheduleContext);

  const [student, setStudent] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const save = () => {
    addSchedule({
      student,
      vehicle,
      instructor,
      date,
      time,
    });

    alert("Schedule Created Successfully");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Create Schedule</h1>

      <select
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      >
        <option>Select Student</option>
        {students.map((s, i) => (
          <option key={i}>{s.name}</option>
        ))}
      </select>

      <br /><br />

      <select
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option>Select Vehicle</option>
        {vehicles.map((v, i) => (
          <option key={i}>{v.number}</option>
        ))}
      </select>

      <br /><br />

      <select
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
      >
        <option>Select Instructor</option>
        {instructors.map((ins, i) => (
          <option key={i}>{ins.name}</option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button onClick={save}>
        Save Schedule
      </button>
    </div>
  );
}

export default AddSchedule;