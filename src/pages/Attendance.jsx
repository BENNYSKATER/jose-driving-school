import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarCheck,
  FaUser,
  FaClock,
  FaUserTie,
  FaCar,
} from "react-icons/fa";

import { AttendanceContext } from "../context/AttendanceContext";
import "../css/Attendance.css";

function Attendance() {
  const navigate = useNavigate();

  const {
    attendances = [],
    deleteAttendance,
  } = useContext(AttendanceContext);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance?"
    );

    if (!confirmDelete) return;

    deleteAttendance(id);
  };

  const getStatusClass = (status) => {
    if (status === "Present") return "status-present";
    if (status === "Absent") return "status-absent";
    if (status === "Late") return "status-late";

    return "";
  };

  return (
    <div className="attendance-page">

      {/* HEADER */}
      <div className="attendance-page-header">

        <div className="attendance-title-section">

          <div className="attendance-title-icon">
            <FaCalendarCheck />
          </div>

          <div>
            <h1>Attendance</h1>

            <p>
              Manage student driving practice attendance
            </p>
          </div>

        </div>

        <button
          className="add-attendance-btn"
          onClick={() =>
            navigate("/add-attendance")
          }
        >
          <FaPlus />
          Add Attendance
        </button>

      </div>


      {/* SUMMARY */}
      <div className="attendance-summary">

        <div className="attendance-summary-card">
          <span>Total Records</span>
          <strong>{attendances.length}</strong>
        </div>

        <div className="attendance-summary-card present-card">
          <span>Present</span>
          <strong>
            {
              attendances.filter(
                (item) =>
                  item.status === "Present"
              ).length
            }
          </strong>
        </div>

        <div className="attendance-summary-card absent-card">
          <span>Absent</span>
          <strong>
            {
              attendances.filter(
                (item) =>
                  item.status === "Absent"
              ).length
            }
          </strong>
        </div>

        <div className="attendance-summary-card late-card">
          <span>Late</span>
          <strong>
            {
              attendances.filter(
                (item) =>
                  item.status === "Late"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* TABLE CARD */}
      <div className="attendance-table-card">

        <div className="attendance-table-header">

          <div>
            <h2>Attendance Records</h2>

            <p>
              All student practice attendance records
            </p>
          </div>

        </div>


        {attendances.length === 0 ? (

          /* EMPTY STATE */

          <div className="attendance-empty">

            <div className="attendance-empty-icon">
              📋
            </div>

            <h3>
              No Attendance Records
            </h3>

            <p>
              No attendance has been recorded yet.
            </p>

            <button
              onClick={() =>
                navigate("/add-attendance")
              }
            >
              <FaPlus />
              Add First Attendance
            </button>

          </div>

        ) : (

          /* TABLE */

          <div className="attendance-table-wrapper">

            <table className="attendance-table">

              <thead>
                <tr>

                  <th>Student</th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Instructor</th>

                  <th>Vehicle</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>
              </thead>


              <tbody>

                {attendances.map(
                  (attendance) => (

                    <tr
                      key={
                        attendance.id
                      }
                    >

                      {/* STUDENT */}

                      <td>

                        <div className="attendance-student">

                          <div className="attendance-avatar">
                            <FaUser />
                          </div>

                          <div>
                            <strong>
                              {
                                attendance.studentName ||
                                "Unknown Student"
                              }
                            </strong>
                          </div>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>

                        <div className="attendance-info">

                          <FaCalendarCheck />

                          <span>
                            {
                              attendance.date ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>


                      {/* TIME */}

                      <td>

                        <div className="attendance-info">

                          <FaClock />

                          <span>
                            {
                              attendance.time ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>


                      {/* INSTRUCTOR */}

                      <td>

                        <div className="attendance-info">

                          <FaUserTie />

                          <span>
                            {
                              attendance.instructor ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>


                      {/* VEHICLE */}

                      <td>

                        <div className="attendance-info">

                          <FaCar />

                          <span>
                            {
                              attendance.vehicle ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`attendance-status ${getStatusClass(
                            attendance.status
                          )}`}
                        >
                          {attendance.status}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="attendance-actions">

                          <button
                            className="attendance-edit-btn"
                            title="Edit Attendance"
                            onClick={() =>
                              navigate(
                                `/edit-attendance/${attendance.id}`
                              )
                            }
                          >
                            <FaEdit />
                          </button>


                          <button
                            className="attendance-delete-btn"
                            title="Delete Attendance"
                            onClick={() =>
                              handleDelete(
                                attendance.id
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Attendance;