import { useContext } from "react";
import { Link } from "react-router-dom";
import { ScheduleContext } from "../context/ScheduleContext";
function Schedule() {
const {
  schedules,
  deleteSchedule,
  updateSchedule,
} = useContext(ScheduleContext);
  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Schedule Management</h1>

      <Link to="/add-schedule">
  <button
    style={{
      background: "green",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ➕ Create Schedule
  </button>
</Link>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Student</th>
            <th>Instructor</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {schedules.length === 0 ? (
    <tr>
      <td colSpan="6">No Schedule Available</td>
    </tr>
  ) : (
    schedules.map((schedule, index) => (
      <tr key={index}>
        <td>{schedule.student}</td>
        <td>{schedule.instructor}</td>
        <td>{schedule.vehicle}</td>
        <td>{schedule.date}</td>
        <td>{schedule.time}</td>

        <td>
          <button
  style={{
    marginRight: "8px",
    background: "orange",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  onClick={() => {
    const newTime = prompt(
      "Enter New Time",
      schedule.time
    );

    if (!newTime) return;

    updateSchedule(index, {
      ...schedule,
      time: newTime,
    });
  }}
>
  ✏️ Edit
</button>
          <button
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => deleteSchedule(index)}
          >
            Delete
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

export default Schedule;