import { useContext } from "react";
import { Link } from "react-router-dom";
import { InstructorContext } from "../context/InstructorContext";

function Instructors() {
  const {
    instructors,
    deleteInstructor,
    updateInstructor,
  } = useContext(InstructorContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>👨‍🏫 Instructors</h1>

      <Link to="/add-instructor">
        <button
          style={{
            background: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Add Instructor
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
            <th>Name</th>
            <th>Mobile</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {instructors.length === 0 ? (
            <tr>
              <td colSpan="5">
                No Instructors Found
              </td>
            </tr>
          ) : (
            instructors.map((inst, index) => (
              <tr key={index}>
                <td>{inst.name}</td>
                <td>{inst.mobile}</td>
                <td>{inst.experience}</td>
                <td>{inst.status}</td>

                <td>
                  <button
                    onClick={() => {
                      const newName = prompt(
                        "Enter Name",
                        inst.name
                      );

                      if (!newName) return;

                      updateInstructor(index, {
                        ...inst,
                        name: newName,
                      });
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    style={{
                      marginLeft: "10px",
                      background: "red",
                      color: "white",
                    }}
                    onClick={() =>
                      deleteInstructor(index)
                    }
                  >
                    🗑️ Delete
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

export default Instructors;