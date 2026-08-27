import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { StudentContext } from "../context/StudentContext";
import { generateReceipt } from "../utils/generateReceipt";

import "../css/Students.css";

function Students() {
  const {
    students,
    deleteStudent,
    updateStudent,
  } = useContext(StudentContext);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // =========================================
  // SEARCH
  // =========================================

  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase().trim();

    return (
      student.name?.toLowerCase().includes(searchValue) ||
      student.mobile?.toLowerCase().includes(searchValue) ||
      student.vehicle?.toLowerCase().includes(searchValue)
    );
  });

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    deleteStudent(index);
  };

  // =========================================
  // MARK PAYMENT AS PAID
  // =========================================

  const handleMarkPaid = (student) => {
    const totalFees = Number(student.fees || 0);

    const updatedStudent = {
      ...student,
      paid: totalFees,
      balance: 0,
      status: "Paid",
    };

    if (updateStudent) {
      updateStudent(
        student.id,
        updatedStudent
      );

      alert("Payment marked as Paid ✅");
    } else {
      alert(
        "updateStudent function is not available in StudentContext."
      );
    }
  };

  // =========================================
  // RECEIPT
  // =========================================

  const handleReceipt = (student) => {
    try {
      generateReceipt(
        student,
        Number(student.paid || 0)
      );
    } catch (error) {
      console.error(error);
      alert("Unable to generate receipt.");
    }
  };

  // =========================================
  // VIEW STUDENT
  // =========================================

  const handleView = (student, index) => {
    navigate(
      `/student/${student.id ?? index}`
    );
  };

  // =========================================
  // EDIT STUDENT
  // =========================================

  const handleEdit = (student, index) => {
    navigate(
      `/edit-student/${student.id ?? index}`
    );
  };

  // =========================================
  // ADD CLASS
  // =========================================

  const handleClass = (student) => {
    const completed =
      Number(student.classesCompleted || 0) + 1;

    const updatedStudent = {
      ...student,
      classesCompleted: completed,
    };

    if (updateStudent) {
      updateStudent(
        student.id,
        updatedStudent
      );

      alert(
        `Class ${completed} completed ✅`
      );
    }
  };

  // =========================================
  // ADD PAYMENT
  // =========================================

  const handlePayment = (student, index) => {
    navigate(
      `/add-payment/${student.id ?? index}`
    );
  };

  return (
    <div className="students-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="students-header">

        <div className="students-title">

          <div className="students-title-icon">
            👨‍🎓
          </div>

          <div>
            <h1>Students</h1>

            <p>
              Manage driving school students
            </p>
          </div>

        </div>

        <Link
          to="/add-student"
          className="add-student-link"
        >
          <span>＋</span>
          Add Student
        </Link>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="student-search-section">

        <div className="student-search-wrapper">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="clear-search"
              onClick={() =>
                setSearch("")
              }
            >
              ×
            </button>
          )}

        </div>

      </div>


      {/* =========================================
          RESULT INFO
      ========================================= */}

      <div className="students-result-info">

        <div>
          Total Students:
          <strong>
            {students.length}
          </strong>
        </div>

        <div>
          Showing:
          <strong>
            {filteredStudents.length}
          </strong>
        </div>

      </div>


      {/* =========================================
          TABLE
      ========================================= */}

      <div className="students-table-card">

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Student
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Vehicle
                </th>

                <th>
                  Fees
                </th>

                <th>
                  Paid
                </th>

                <th>
                  Balance
                </th>

                <th>
                  Status
                </th>

                <th>
                  Classes
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    className="no-students"
                  >

                    <div className="empty-state">

                      <div className="empty-icon">
                        👨‍🎓
                      </div>

                      <h3>
                        No Students Found
                      </h3>

                      <p>
                        Add a student or
                        change your search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (student, index) => {

                    const balance =
                      Number(
                        student.balance || 0
                      );

                    const paid =
                      Number(
                        student.paid || 0
                      );

                    const fees =
                      Number(
                        student.fees || 0
                      );

                    return (

                      <tr
                        key={
                          student.id ?? index
                        }
                      >

                        {/* STUDENT */}

                        <td>

                          <button
                            className="student-name"
                            onClick={() =>
                              handleView(
                                student,
                                index
                              )
                            }
                          >

                            <div className="student-avatar">

                              {student.photo ? (

                                <img
                                  src={
                                    student.photo
                                  }
                                  alt={
                                    student.name
                                  }
                                />

                              ) : (
                                "👤"
                              )}

                            </div>


                            <div className="student-info">

                              <strong>
                                {
                                  student.name ||
                                  "Unnamed Student"
                                }
                              </strong>

                              <small>
                                ID:{" "}
                                {
                                  student.id ??
                                  index + 1
                                }
                              </small>

                            </div>

                          </button>

                        </td>


                        {/* MOBILE */}

                        <td>

                          <span className="mobile-number">
                            {
                              student.mobile ||
                              "-"
                            }
                          </span>

                        </td>


                        {/* VEHICLE */}

                        <td>

                          <span className="vehicle-badge">

                            🚗{" "}
                            {
                              student.vehicle ||
                              "-"
                            }

                          </span>

                        </td>


                        {/* FEES */}

                        <td>

                          <span className="fee-value">
                            ₹{fees}
                          </span>

                        </td>


                        {/* PAID */}

                        <td>

                          <span className="paid-amount">
                            ₹{paid}
                          </span>

                        </td>


                        {/* BALANCE */}

                        <td>

                          <span
                            className={
                              balance > 0
                                ? "balance-pending"
                                : "balance-paid"
                            }
                          >
                            ₹{balance}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              student.status ===
                              "Paid"
                                ? "status paid"
                                : "status pending"
                            }
                          >

                            <span className="status-dot">
                              ●
                            </span>

                            {
                              student.status ||
                              "Pending"
                            }

                          </span>

                        </td>


                        {/* CLASSES */}

                        <td>

                          <span className="classes-count">
                            {
                              student.classesCompleted ||
                              0
                            }
                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="actions">

                            {/* VIEW */}

                            <button
                              className="action view"
                              title="View Student"
                              onClick={() =>
                                handleView(
                                  student,
                                  index
                                )
                              }
                            >
                              👁
                            </button>


                            {/* EDIT */}

                            <button
                              className="action edit"
                              title="Edit Student"
                              onClick={() =>
                                handleEdit(
                                  student,
                                  index
                                )
                              }
                            >
                              ✏️
                            </button>


                            {/* DELETE */}

                            <button
                              className="action delete"
                              title="Delete Student"
                              onClick={() =>
                                handleDelete(
                                  index
                                )
                              }
                            >
                              🗑
                            </button>


                            {/* PAYMENT */}

                            {balance > 0 && (

                              <button
                                className="action pay"
                                title="Add Payment"
                                onClick={() =>
                                  handlePayment(
                                    student,
                                    index
                                  )
                                }
                              >
                                💰
                              </button>

                            )}


                            {/* MARK PAID */}

                            {student.status !==
                              "Paid" && (

                              <button
                                className="action mark-paid"
                                title="Mark Paid"
                                onClick={() =>
                                  handleMarkPaid(
                                    student
                                  )
                                }
                              >
                                ✓
                              </button>

                            )}


                            {/* ADD CLASS */}

                            <button
                              className="action class-btn"
                              title="Complete Class"
                              onClick={() =>
                                handleClass(
                                  student
                                )
                              }
                            >
                              🚗
                            </button>


                            {/* RECEIPT */}

                            <button
                              className="action receipt"
                              title="Generate Receipt"
                              onClick={() =>
                                handleReceipt(
                                  student
                                )
                              }
                            >
                              🧾
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Students;