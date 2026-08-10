import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCar,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { ScheduleContext } from "../context/ScheduleContext";
import "../css/Schedule.css";

function Schedule() {
  const navigate = useNavigate();

  const {
    schedules = [],
    deleteSchedule,
  } = useContext(ScheduleContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const scheduleList = Array.isArray(schedules)
    ? schedules
    : [];

  const filteredSchedules = useMemo(() => {
    const text = search.toLowerCase();

    return scheduleList.filter((item) => {
      const matchesSearch =
        String(item.studentName || "")
          .toLowerCase()
          .includes(text) ||
        String(item.instructor || "")
          .toLowerCase()
          .includes(text) ||
        String(item.vehicle || "")
          .toLowerCase()
          .includes(text) ||
        String(item.date || "")
          .toLowerCase()
          .includes(text);

      const status = item.status || "Scheduled";

      const matchesFilter =
        filter === "All" ||
        status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [scheduleList, search, filter]);

  const total = scheduleList.length;

  const scheduled = scheduleList.filter(
    (item) =>
      (item.status || "Scheduled") ===
      "Scheduled"
  ).length;

  const completed = scheduleList.filter(
    (item) =>
      item.status === "Completed"
  ).length;

  const cancelled = scheduleList.filter(
    (item) =>
      item.status === "Cancelled"
  ).length;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) return;

    deleteSchedule(id);
  };

  return (
    <div className="schedule-page">

      {/* HEADER */}

      <div className="schedule-header">

        <div className="schedule-heading">

          <div className="schedule-heading-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h1>Schedule</h1>
            <p>
              Manage driving practice schedules
            </p>
          </div>

        </div>

        <button
          className="add-schedule-btn"
          onClick={() =>
            navigate("/add-schedule")
          }
        >
          <FaPlus />
          Add Schedule
        </button>

      </div>


      {/* STATS */}

      <div className="schedule-stats">

        <div className="schedule-stat-card">

          <div className="schedule-stat-icon blue">
            <FaCalendarAlt />
          </div>

          <div>
            <span>Total Classes</span>
            <strong>{total}</strong>
          </div>

        </div>


        <div className="schedule-stat-card">

          <div className="schedule-stat-icon orange">
            <FaClock />
          </div>

          <div>
            <span>Scheduled</span>
            <strong>{scheduled}</strong>
          </div>

        </div>


        <div className="schedule-stat-card">

          <div className="schedule-stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>

        </div>


        <div className="schedule-stat-card">

          <div className="schedule-stat-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelled}</strong>
          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="schedule-toolbar">

        <div className="schedule-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search student, instructor or vehicle..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="schedule-filter">

          {[
            "All",
            "Scheduled",
            "Completed",
            "Cancelled",
          ].map((status) => (

            <button
              key={status}
              className={
                filter === status
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter(status)
              }
            >
              {status}
            </button>

          ))}

        </div>

      </div>


      {/* SCHEDULE TABLE */}

      <div className="schedule-table-card">

        {filteredSchedules.length === 0 ? (

          <div className="schedule-empty">

            <div className="schedule-empty-icon">
              <FaCalendarAlt />
            </div>

            <h2>No Schedules Found</h2>

            <p>
              Add a driving practice schedule
              to get started.
            </p>

            <button
              onClick={() =>
                navigate("/add-schedule")
              }
            >
              <FaPlus />
              Add Schedule
            </button>

          </div>

        ) : (

          <div className="schedule-table-wrapper">

            <table className="schedule-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Student</th>
                  <th>Instructor</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredSchedules.map(
                  (item, index) => {

                    const status =
                      item.status ||
                      "Scheduled";

                    return (
                      <tr
                        key={
                          item.id ||
                          index
                        }
                      >

                        <td>
                          <div className="date-cell">
                            <FaCalendarAlt />
                            <span>
                              {item.date ||
                                "Not set"}
                            </span>
                          </div>
                        </td>


                        <td>
                          <div className="time-cell">
                            <FaClock />
                            {item.time ||
                              "Not set"}
                          </div>
                        </td>


                        <td>
                          <strong>
                            {item.studentName ||
                              item.student ||
                              "Unknown"}
                          </strong>
                        </td>


                        <td>
                          <div className="person-cell">
                            <FaUserTie />
                            {item.instructor ||
                              "Not assigned"}
                          </div>
                        </td>


                        <td>
                          <div className="vehicle-cell">
                            <FaCar />
                            {item.vehicle ||
                              "Not assigned"}
                          </div>
                        </td>


                        <td>

                          <span
                            className={`schedule-status ${status.toLowerCase()}`}
                          >
                            <span className="status-dot"></span>
                            {status}
                          </span>

                        </td>


                        <td>

                          <div className="schedule-actions">

                            <button
                              title="Edit"
                              onClick={() =>
                                navigate(
                                  `/edit-schedule/${
                                    item.id ||
                                    index
                                  }`
                                )
                              }
                            >
                              <FaEdit />
                            </button>


                            <button
                              title="Delete"
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  item.id ||
                                    index
                                )
                              }
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Schedule;