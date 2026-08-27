import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCar,
  FaSave,
} from "react-icons/fa";

import { ScheduleContext } from "../context/ScheduleContext";
import "../css/EditSchedule.css";

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { schedules = [], updateSchedule } =
    useContext(ScheduleContext);

  const schedule = schedules.find(
    (item) => String(item.id) === String(id)
  );

  const [form, setForm] = useState({
    date: "",
    time: "",
    studentName: "",
    instructor: "",
    vehicle: "",
    status: "Scheduled",
  });

  useEffect(() => {
    if (schedule) {
      setForm({
        date: schedule.date || "",
        time: schedule.time || "",
        studentName:
          schedule.studentName ||
          schedule.student ||
          "",
        instructor: schedule.instructor || "",
        vehicle: schedule.vehicle || "",
        status: schedule.status || "Scheduled",
      });
    }
  }, [schedule]);

  if (!schedule) {
    return (
      <div className="edit-schedule-not-found">
        <div className="not-found-icon">
          <FaCalendarAlt />
        </div>

        <h2>Schedule Not Found</h2>

        <p>
          The schedule you're trying to edit
          could not be found.
        </p>

        <button
          onClick={() => navigate("/schedule")}
        >
          <FaArrowLeft />
          Back to Schedule
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.date ||
      !form.time ||
      !form.studentName.trim() ||
      !form.instructor.trim() ||
      !form.vehicle.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedSchedule = {
      ...schedule,
      date: form.date,
      time: form.time,
      studentName: form.studentName.trim(),
      instructor: form.instructor.trim(),
      vehicle: form.vehicle.trim(),
      status: form.status,
    };

    updateSchedule(schedule.id, updatedSchedule);

    navigate("/schedule");
  };

  return (
    <div className="edit-schedule-page">

      {/* HEADER */}

      <div className="edit-schedule-header">

        <button
          type="button"
          className="edit-schedule-back"
          onClick={() => navigate("/schedule")}
        >
          <FaArrowLeft />
          Back to Schedule
        </button>

        <div className="edit-schedule-title">

          <div className="edit-schedule-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h1>Edit Schedule</h1>
            <p>
              Update driving practice schedule
            </p>
          </div>

        </div>

      </div>


      {/* CARD */}

      <div className="edit-schedule-card">

        <div className="edit-schedule-card-header">

          <div>
            <h2>Schedule Details</h2>
            <p>
              Update the information for this
              practice session.
            </p>
          </div>

          <span className="edit-schedule-id">
            ID #{schedule.id}
          </span>

        </div>


        <form onSubmit={handleSubmit}>

          {/* TIMING */}

          <div className="edit-section">

            <h3>Practice Timing</h3>

            <div className="edit-form-grid">

              <div className="edit-form-group">

                <label>
                  Date <span>*</span>
                </label>

                <div className="edit-input">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="edit-form-group">

                <label>
                  Time <span>*</span>
                </label>

                <div className="edit-input">

                  <FaClock />

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* STUDENT */}

          <div className="edit-section">

            <h3>Student Information</h3>

            <div className="edit-form-group">

              <label>
                Student Name <span>*</span>
              </label>

              <div className="edit-input">

                <FaUser />

                <input
                  type="text"
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />

              </div>

            </div>

          </div>


          {/* ASSIGNMENT */}

          <div className="edit-section">

            <h3>Training Assignment</h3>

            <div className="edit-form-grid">

              <div className="edit-form-group">

                <label>
                  Instructor <span>*</span>
                </label>

                <div className="edit-input">

                  <FaUser />

                  <input
                    type="text"
                    name="instructor"
                    value={form.instructor}
                    onChange={handleChange}
                    placeholder="Enter instructor"
                  />

                </div>

              </div>


              <div className="edit-form-group">

                <label>
                  Vehicle <span>*</span>
                </label>

                <div className="edit-input">

                  <FaCar />

                  <input
                    type="text"
                    name="vehicle"
                    value={form.vehicle}
                    onChange={handleChange}
                    placeholder="Enter vehicle"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* STATUS */}

          <div className="edit-section">

            <h3>Schedule Status</h3>

            <div className="edit-form-group">

              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="edit-schedule-actions">

            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => navigate("/schedule")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-save-btn"
            >
              <FaSave />
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditSchedule;