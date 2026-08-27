import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaCalendarCheck,
  FaUser,
  FaUserTie,
  FaCar,
  FaClock,
  FaCheck,
} from "react-icons/fa";

import { AttendanceContext } from "../context/AttendanceContext";

import "../css/AddAttendance.css";

function EditAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    attendances = [],
    updateAttendance,
  } = useContext(AttendanceContext);

  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    time: "",
    instructor: "",
    vehicle: "",
    status: "Present",
  });

  const [loading, setLoading] = useState(true);

  /* =========================================
     FIND ATTENDANCE
  ========================================= */

  useEffect(() => {
    const record = attendances.find(
      (item) =>
        String(item.id) === String(id)
    );

    if (record) {
      setFormData({
        studentName:
          record.studentName || "",
        date: record.date || "",
        time: record.time || "",
        instructor:
          record.instructor || "",
        vehicle:
          record.vehicle || "",
        status:
          record.status || "Present",
      });

      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [attendances, id]);

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     UPDATE
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!formData.date) {
      alert("Please select date.");
      return;
    }

    if (!formData.time) {
      alert("Please select time.");
      return;
    }

    if (!formData.instructor.trim()) {
      alert("Please enter instructor name.");
      return;
    }

    if (!formData.vehicle.trim()) {
      alert("Please enter vehicle.");
      return;
    }

    updateAttendance(id, {
      ...formData,
    });

    navigate("/attendance");
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f7fb",
          color: "#64748b",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading attendance...
      </div>
    );
  }

  /* =========================================
     NOT FOUND
  ========================================= */

  const recordExists = attendances.some(
    (item) =>
      String(item.id) === String(id)
  );

  if (!recordExists) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f7fb",
          gap: "15px",
        }}
      >
        <div
          style={{
            fontSize: "50px",
          }}
        >
          📋
        </div>

        <h2
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          Attendance Not Found
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
          }}
        >
          This attendance record doesn't exist.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/attendance")
          }
          style={{
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Back to Attendance
        </button>
      </div>
    );
  }

  return (
    <div className="add-attendance-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="add-attendance-header">

        <button
          type="button"
          className="attendance-back-btn"
          onClick={() =>
            navigate("/attendance")
          }
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="add-attendance-heading">

          <div className="add-attendance-heading-icon">
            <FaCalendarCheck />
          </div>

          <div>
            <h1>Edit Attendance</h1>

            <p>
              Update student driving practice attendance
            </p>
          </div>

        </div>

      </div>


      {/* =========================================
          CARD
      ========================================= */}

      <div className="add-attendance-card">

        <div className="add-attendance-card-header">

          <div>
            <h2>Attendance Details</h2>

            <p>
              Update the attendance information below.
            </p>
          </div>

          <div className="attendance-required">
            * Required fields
          </div>

        </div>


        {/* =========================================
            FORM
        ========================================= */}

        <form
          className="add-attendance-form"
          onSubmit={handleSubmit}
        >

          {/* STUDENT */}

          <div className="attendance-form-group full">

            <label>
              Student Name
              <span>*</span>
            </label>

            <div className="attendance-input-wrapper">

              <FaUser />

              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                autoComplete="off"
              />

            </div>

          </div>


          {/* DATE */}

          <div className="attendance-form-group">

            <label>
              Practice Date
              <span>*</span>
            </label>

            <div className="attendance-input-wrapper">

              <FaCalendarCheck />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* TIME */}

          <div className="attendance-form-group">

            <label>
              Practice Time
              <span>*</span>
            </label>

            <div className="attendance-input-wrapper">

              <FaClock />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* INSTRUCTOR */}

          <div className="attendance-form-group">

            <label>
              Instructor
              <span>*</span>
            </label>

            <div className="attendance-input-wrapper">

              <FaUserTie />

              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Instructor name"
                autoComplete="off"
              />

            </div>

          </div>


          {/* VEHICLE */}

          <div className="attendance-form-group">

            <label>
              Vehicle
              <span>*</span>
            </label>

            <div className="attendance-input-wrapper">

              <FaCar />

              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Vehicle number / name"
                autoComplete="off"
              />

            </div>

          </div>


          {/* =========================================
              STATUS
          ========================================= */}

          <div className="attendance-form-group full">

            <label>
              Attendance Status
              <span>*</span>
            </label>

            <div className="attendance-status-options">

              {/* PRESENT */}

              <label
                className={`attendance-status-option present ${
                  formData.status === "Present"
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="status"
                  value="Present"
                  checked={
                    formData.status === "Present"
                  }
                  onChange={handleChange}
                />

                <div className="status-option-icon">
                  <FaCheck />
                </div>

                <div>
                  <strong>Present</strong>

                  <span>
                    Student attended practice
                  </span>
                </div>

              </label>


              {/* ABSENT */}

              <label
                className={`attendance-status-option absent ${
                  formData.status === "Absent"
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="status"
                  value="Absent"
                  checked={
                    formData.status === "Absent"
                  }
                  onChange={handleChange}
                />

                <div className="status-option-icon">
                  ×
                </div>

                <div>
                  <strong>Absent</strong>

                  <span>
                    Student did not attend
                  </span>
                </div>

              </label>


              {/* LATE */}

              <label
                className={`attendance-status-option late ${
                  formData.status === "Late"
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="status"
                  value="Late"
                  checked={
                    formData.status === "Late"
                  }
                  onChange={handleChange}
                />

                <div className="status-option-icon">
                  !
                </div>

                <div>
                  <strong>Late</strong>

                  <span>
                    Student arrived late
                  </span>
                </div>

              </label>

            </div>

          </div>


          {/* =========================================
              ACTIONS
          ========================================= */}

          <div className="add-attendance-actions">

            <button
              type="button"
              className="attendance-cancel-btn"
              onClick={() =>
                navigate("/attendance")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="attendance-save-btn"
            >
              <FaCheck />
              Update Attendance
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditAttendance;