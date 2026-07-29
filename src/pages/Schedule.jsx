function Schedule() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>📅 Schedule Management</h1>

      <button>Create Schedule</button>

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
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan="5">
              No Schedule Available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;