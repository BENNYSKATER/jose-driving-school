import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaPlus,
  FaSearch,
  FaPhone,
  FaCar,
  FaIdCard,
  FaStar,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaCheckCircle,
  FaUserClock,
  FaTimes,
} from "react-icons/fa";

import { InstructorContext } from "../context/InstructorContext";

import "../css/Instructors.css";

function Instructors() {
  const {
    instructors,
    deleteInstructor,
  } = useContext(InstructorContext);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredInstructors = useMemo(() => {
    return instructors.filter((instructor) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        instructor.name
          ?.toLowerCase()
          .includes(searchText) ||
        String(instructor.mobile || "")
          .includes(searchText) ||
        instructor.licenseType
          ?.toLowerCase()
          .includes(searchText);

      const status =
        instructor.status || "Active";

      const matchesFilter =
        filter === "All" ||
        status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [instructors, search, filter]);

  const activeCount = instructors.filter(
    (item) =>
      (item.status || "Active") === "Active"
  ).length;

  const inactiveCount = instructors.filter(
    (item) =>
      (item.status || "Active") === "Inactive"
  ).length;

  const assignedVehicles = instructors.filter(
    (item) => item.vehicle
  ).length;

  const handleDelete = (instructor) => {
    const confirmDelete = window.confirm(
      `Delete ${instructor.name}?`
    );

    if (!confirmDelete) return;

    deleteInstructor(instructor.id);
  };

  return (
    <div className="instructors-page">

      {/* ================= HEADER ================= */}

      <div className="instructors-header">

        <div className="instructors-heading">

          <div className="instructors-heading-icon">
            <FaUserTie />
          </div>

          <div>
            <h1>Instructor Management</h1>

            <p>
              Manage your driving school instructors
            </p>
          </div>

        </div>

        <Link
          to="/add-instructor"
          className="add-instructor-btn"
        >
          <FaPlus />
          Add Instructor
        </Link>

      </div>

      {/* ================= STATS ================= */}

      <div className="instructor-stats">

        <div className="instructor-stat-card">

          <div className="stat-icon blue">
            <FaUserTie />
          </div>

          <div>
            <span>Total Instructors</span>
            <strong>{instructors.length}</strong>
          </div>

        </div>

        <div className="instructor-stat-card">

          <div className="stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>

        </div>

        <div className="instructor-stat-card">

          <div className="stat-icon orange">
            <FaUserClock />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
          </div>

        </div>

        <div className="instructor-stat-card">

          <div className="stat-icon purple">
            <FaCar />
          </div>

          <div>
            <span>Vehicles Assigned</span>
            <strong>{assignedVehicles}</strong>
          </div>

        </div>

      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="instructor-toolbar">

        <div className="instructor-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search instructor..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="clear-instructor-search"
              onClick={() => setSearch("")}
            >
              <FaTimes />
            </button>
          )}

        </div>

        <div className="instructor-filters">

          {["All", "Active", "Inactive"].map(
            (item) => (
              <button
                key={item}
                className={
                  filter === item
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            )
          )}

        </div>

      </div>

      {/* ================= RESULT ================= */}

      <div className="instructor-result">

        Showing{" "}
        <strong>
          {filteredInstructors.length}
        </strong>{" "}
        of{" "}
        <strong>
          {instructors.length}
        </strong>{" "}
        instructors

      </div>

      {/* ================= GRID ================= */}

      {filteredInstructors.length === 0 ? (

        <div className="instructor-empty">

          <div className="empty-instructor-icon">
            <FaUserTie />
          </div>

          <h2>
            {search
              ? "No instructors found"
              : "No instructors yet"}
          </h2>

          <p>
            {search
              ? "Try another search."
              : "Add your first instructor to get started."}
          </p>

          {!search && (
            <Link
              to="/add-instructor"
              className="empty-add-btn"
            >
              <FaPlus />
              Add Instructor
            </Link>
          )}

        </div>

      ) : (

        <div className="instructors-grid">

          {filteredInstructors.map(
            (instructor) => {

              const status =
                instructor.status || "Active";

              const students =
                Number(
                  instructor.studentsCount || 0
                );

              const classes =
                Number(
                  instructor.classesCount || 0
                );

              const rating =
                Number(
                  instructor.rating || 5
                );

              return (
                <div
                  className="instructor-card"
                  key={instructor.id}
                >

                  {/* TOP */}

                  <div className="instructor-card-top">

                    <div className="instructor-profile">

                      <div className="instructor-avatar">

                        {instructor.photo ? (
                          <img
                            src={instructor.photo}
                            alt={instructor.name}
                          />
                        ) : (
                          <FaUserTie />
                        )}

                      </div>

                      <div>

                        <h2>
                          {instructor.name}
                        </h2>

                        <p>
                          {instructor.experience
                            ? `${instructor.experience} Experience`
                            : "Driving Instructor"}
                        </p>

                      </div>

                    </div>

                    <span
                      className={
                        status === "Active"
                          ? "instructor-status active"
                          : "instructor-status inactive"
                      }
                    >
                      <span />
                      {status}
                    </span>

                  </div>

                  {/* DETAILS */}

                  <div className="instructor-details">

                    <div>
                      <FaPhone />
                      <span>
                        {instructor.mobile || "-"}
                      </span>
                    </div>

                    <div>
                      <FaCar />
                      <span>
                        {instructor.vehicle ||
                          "No vehicle"}
                      </span>
                    </div>

                    <div>
                      <FaIdCard />
                      <span>
                        {instructor.licenseType ||
                          "-"}
                      </span>
                    </div>

                    <div>
                      <FaStar />
                      <span>
                        {rating.toFixed(1)} Rating
                      </span>
                    </div>

                  </div>

                  {/* STATS */}

                  <div className="instructor-mini-stats">

                    <div>
                      <FaUsers />

                      <strong>
                        {students}
                      </strong>

                      <span>
                        Students
                      </span>
                    </div>

                    <div>
                      <FaCar />

                      <strong>
                        {classes}
                      </strong>

                      <span>
                        Classes
                      </span>
                    </div>

                    <div>
                      <FaStar />

                      <strong>
                        {rating.toFixed(1)}
                      </strong>

                      <span>
                        Rating
                      </span>
                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="instructor-actions">

                    <button
                      className="instructor-action view"
                      onClick={() =>
                        navigate(
                          `/instructor/${instructor.id}`
                        )
                      }
                      title="View"
                    >
                      <FaEye />
                    </button>

                    <button
                      className="instructor-action edit"
                      onClick={() =>
                        navigate(
                          `/edit-instructor/${instructor.id}`
                        )
                      }
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="instructor-action delete"
                      onClick={() =>
                        handleDelete(
                          instructor
                        )
                      }
                      title="Delete"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}

export default Instructors;