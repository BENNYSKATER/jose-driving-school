import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUserGraduate,
  FaUserTie,
  FaCar,
  FaSave,
  FaStickyNote,
} from "react-icons/fa";

import { ScheduleContext } from "../context/ScheduleContext";
import "../css/AddSchedule.css";

function AddSchedule() {
  const navigate = useNavigate();

  const { addSchedule } = useContext(ScheduleContext);

  const [formData, setFormData] = useState({
    studentName: "",
    instructor: "",
    vehicle: "",
    date: "",
    time: "",
    status: "Scheduled",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.instructor ||
      !formData.vehicle ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      ...formData,
    };

    addSchedule(newSchedule);

    navigate("/schedule");
  };

  return (
    <div className="add-schedule-page">

      <div className="add-schedule-header">

        <button
          className="schedule-back-btn"
          onClick={() => navigate("/schedule")}
        >
          <FaArrowLeft />
          Back to Schedule
        </button>

        <div className="add-schedule-heading">

          <div className="add-schedule-heading-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h1>Add Schedule</h1>
            <p>Create a new driving practice schedule</p>
          </div>

        </div>

      </div>

      <div className="add-schedule-card">

        <div className="add-schedule-card-title">
          <h2>Schedule Details</h2>
          <p>
            Enter the details for the student's driving practice.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="schedule-form-grid">

            <div className="schedule-form-group">

              <label>
                <FaUserGraduate />
                Student
                <span>*</span>
              </label>

              <div className="schedule-input-wrapper">

                <FaUserGraduate />

                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />

              </div>

            </div>

            <div className="schedule-form-group">

              <label>
                <FaUserTie />
                Instructor
                <span>*</span>
              </label>

              <div className="schedule-input-wrapper">

                <FaUserTie />

                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="Enter instructor name"
                />

              </div>

            </div>

          </div>

          <div className="schedule-form-group">

            <label>
              <FaCar />
              Vehicle
              <span>*</span>
            </label>

            <div className="schedule-input-wrapper">

              <FaCar />

              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Example: TN 38 AB 1234"
              />

            </div>

          </div>

          <div className="schedule-form-grid">

            <div className="schedule-form-group">

              <label>
                <FaCalendarAlt />
                Practice Date
                <span>*</span>
              </label>

              <div className="schedule-input-wrapper">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="schedule-form-group">

              <label>
                <FaClock />
                Practice Time
                <span>*</span>
              </label>

              <div className="schedule-input-wrapper">

                <FaClock />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          <div className="schedule-form-group">

            <label>Status</label>

            <select
              name="status"
              value={formData.status}
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

          <div className="schedule-form-group">

            <label>
              <FaStickyNote />
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              rows="4"
            />

          </div>

          <div className="add-schedule-form-footer">

            <button
              type="button"
              className="schedule-cancel-btn"
              onClick={() => navigate("/schedule")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="schedule-save-btn"
            >
              <FaSave />
              Save Schedule
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddSchedule;