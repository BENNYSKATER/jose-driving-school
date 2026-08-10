import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import "../css/Students.css";
import { generateReceipt } from "../utils/generateReceipt";

function Students() {
  const {
    students,
    deleteStudent,
    updateStudent,
  } = useContext(StudentContext);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // SEARCH
  // =========================
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    return (
      student.name
        ?.toLowerCase()
        .includes(searchText) ||
      String(student.mobile || "").includes(searchText)
    );
  });

  // =========================
  // DELETE
  // =========================
  const handleDelete = (student) => {
    const confirmDelete = window.confirm(
      `Delete ${student.name}?`
    );

    if (!confirmDelete) return;

    deleteStudent(student.id);
  };

  // =========================
  // MARK PAID
  // =========================
  const handleMarkPaid = (student) => {
    const totalFees = Number(student.fees || 0);

    updateStudent(student.id, {
      paid: totalFees,
      balance: 0,
      status: "Paid",
    });
  };

  // =========================
  // ADD CLASS
  // =========================
  const handleAddClass = (student) => {
    updateStudent(student.id, {
      practiceClasses:
        Number(student.practiceClasses || 0) + 1,
    });
  };

  // =========================
  // PAYMENT
  // =========================
  const handlePayment = (student) => {
    const amount = Number(
      window.prompt(
        `Enter payment amount for ${student.name}`
      )
    );

    if (!amount || amount <= 0) return;

    const totalFees = Number(student.fees || 0);
    const currentPaid = Number(student.paid || 0);
    const currentBalance = totalFees - currentPaid;

    if (amount > currentBalance) {
      alert(
        `Payment cannot be greater than balance ₹${currentBalance}`
      );
      return;
    }

    const newPaid = currentPaid + amount;
    const newBalance = totalFees - newPaid;

    const updatedStudent = {
      ...student,

      paid: newPaid,

      balance: newBalance,

      status:
        newBalance <= 0
          ? "Paid"
          : "Pending",

      paymentHistory: [
        ...(student.paymentHistory || []),
        {
          amount: amount,
          date: new Date().toLocaleDateString(),
        },
      ],
    };

    updateStudent(
      student.id,
      updatedStudent
    );

    generateReceipt(
      updatedStudent,
      amount
    );
  };

  // =========================
  // OPEN PROFILE
  // =========================
  const openProfile = (student) => {
    navigate(`/student/${student.id}`);
  };

  return (
    <div className="students-page">

      {/* ================= HEADER ================= */}

      <div className="students-header">

        <div className="students-title">

          <div className="students-title-icon">
            👨‍🎓
          </div>

          <div>
            <h1>Students</h1>

            <p>
              Manage all driving school students
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


      {/* ================= SEARCH ================= */}

      <div className="student-search-section">

        <div className="student-search-wrapper">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by name or mobile number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}

        </div>

      </div>


      {/* ================= RESULT INFO ================= */}

      <div className="students-result-info">

        <span>
          Total Students:
          <strong>
            {students.length}
          </strong>
        </span>

        {search && (
          <span>
            Showing:
            <strong>
              {filteredStudents.length}
            </strong>
          </span>
        )}

      </div>


      {/* ================= TABLE ================= */}

      <div className="students-table-card">

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Student</th>
                <th>Mobile</th>
                <th>Vehicle</th>
                <th>Total Fees</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Classes</th>
                <th>Actions</th>
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
                        No students found
                      </h3>

                      <p>
                        {search
                          ? "Try another search"
                          : "Add your first student"}
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (student) => {

                    const balance =
                      Number(
                        student.balance || 0
                      );

                    const paid =
                      Number(
                        student.paid || 0
                      );

                    return (

                      <tr
                        key={student.id}
                      >

                        {/* ================= STUDENT ================= */}

                        <td>

                          <button
                            type="button"
                            className="student-name"
                            onClick={() =>
                              openProfile(student)
                            }
                          >

                            <span className="student-avatar">

                              {student.photo ? (

                                <img
                                  src={student.photo}
                                  alt={student.name}
                                />

                              ) : (

                                "👤"

                              )}

                            </span>


                            <span className="student-info">

                              <strong>
                                {student.name}
                              </strong>

                              <small>
                                {student.licenseType ||
                                  "License not set"}
                              </small>

                            </span>

                          </button>

                        </td>


                        {/* ================= MOBILE ================= */}

                        <td>

                          <span className="mobile-number">
                            📱 {student.mobile}
                          </span>

                        </td>


                        {/* ================= VEHICLE ================= */}

                        <td>

                          <span className="vehicle-badge">
                            🚗 {student.vehicle}
                          </span>

                        </td>


                        {/* ================= FEES ================= */}

                        <td>

                          <strong className="fee-value">
                            ₹
                            {Number(
                              student.fees || 0
                            )}
                          </strong>

                        </td>


                        {/* ================= PAID ================= */}

                        <td>

                          <span className="paid-amount">
                            ₹{paid}
                          </span>

                        </td>


                        {/* ================= BALANCE ================= */}

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


                        {/* ================= STATUS ================= */}

                        <td>

                          <span
                            className={
                              student.status === "Paid"
                                ? "status paid"
                                : "status pending"
                            }
                          >

                            <span className="status-dot">
                              ●
                            </span>

                            {student.status ||
                              "Pending"}

                          </span>

                        </td>


                        {/* ================= CLASSES ================= */}

                        <td>

                          <span className="classes-count">
                            {student.practiceClasses ||
                              0}
                          </span>

                        </td>


                        {/* ================= ACTIONS ================= */}

                        <td>

                          <div className="actions">

                            {/* VIEW */}

                            <button
                              type="button"
                              className="action view"
                              onClick={() =>
                                openProfile(student)
                              }
                              title="View Profile"
                            >
                              👁️
                            </button>


                            {/* EDIT */}

                            <button
                              type="button"
                              className="action edit"
                              onClick={() =>
                                navigate(
                                  `/edit-student/${student.id}`
                                )
                              }
                              title="Edit Student"
                            >
                              ✏️
                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              className="action delete"
                              onClick={() =>
                                handleDelete(student)
                              }
                              title="Delete Student"
                            >
                              🗑️
                            </button>


                            {/* MARK PAID */}

                            {student.status !==
                              "Paid" && (

                              <button
                                type="button"
                                className="action mark-paid"
                                onClick={() =>
                                  handleMarkPaid(student)
                                }
                                title="Mark Fully Paid"
                              >
                                ✓
                              </button>

                            )}


                            {/* ADD CLASS */}

                            <button
                              type="button"
                              className="action class-btn"
                              onClick={() =>
                                handleAddClass(student)
                              }
                              title="Add Practice Class"
                            >
                              +1
                            </button>


                            {/* PAYMENT */}

                            {balance > 0 && (

                              <button
                                type="button"
                                className="action pay"
                                onClick={() =>
                                  handlePayment(student)
                                }
                                title="Make Payment"
                              >
                                ₹
                              </button>

                            )}

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