import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaSearch,
  FaEdit,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaWallet,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

import { StudentContext } from "../context/StudentContext";
import "../css/Fees.css";

function Fees() {
  const navigate = useNavigate();
  const { students = [] } = useContext(StudentContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const studentList = Array.isArray(students) ? students : [];

  const getFees = (student) => Number(student.fees || 0);
  const getPaid = (student) => Number(student.paid || 0);

  const getBalance = (student) =>
    Math.max(getFees(student) - getPaid(student), 0);

  const getStatus = (student) => {
    const fees = getFees(student);
    const paid = getPaid(student);
    const balance = getBalance(student);

    if (fees > 0 && balance === 0) return "Paid";
    if (paid > 0 && balance > 0) return "Partial";
    return "Pending";
  };

  const totalFees = useMemo(
    () => studentList.reduce((sum, student) => sum + getFees(student), 0),
    [studentList]
  );

  const totalPaid = useMemo(
    () => studentList.reduce((sum, student) => sum + getPaid(student), 0),
    [studentList]
  );

  const totalBalance = useMemo(
    () =>
      studentList.reduce(
        (sum, student) => sum + getBalance(student),
        0
      ),
    [studentList]
  );

  const paidStudents = studentList.filter(
    (student) => getStatus(student) === "Paid"
  ).length;

  const pendingStudents = studentList.filter(
    (student) =>
      getStatus(student) === "Pending" ||
      getStatus(student) === "Partial"
  ).length;

  const filteredStudents = studentList.filter((student) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      String(student.name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(student.mobile || "")
        .toLowerCase()
        .includes(searchText) ||
      String(student.vehicle || "")
        .toLowerCase()
        .includes(searchText);

    const status = getStatus(student);

    const matchesFilter =
      filter === "All" ||
      (filter === "Paid" && status === "Paid") ||
      (filter === "Pending" && status === "Pending") ||
      (filter === "Partial" && status === "Partial");

    return matchesSearch && matchesFilter;
  });

  const formatMoney = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  return (
    <div className="fees-page">

      {/* HEADER */}
      <div className="fees-header">

        <div className="fees-heading">

          <div className="fees-heading-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <h1>Fees Management</h1>
            <p>
              Track student payments, balances and fee status
            </p>
          </div>

        </div>

      </div>


      {/* SUMMARY CARDS */}
      <div className="fees-summary-grid">

        <div className="fees-summary-card blue-card">

          <div className="summary-icon">
            <FaWallet />
          </div>

          <div className="summary-content">
            <span>Total Fees</span>
            <strong>{formatMoney(totalFees)}</strong>

            <small>
              Overall fee collection
            </small>
          </div>

        </div>


        <div className="fees-summary-card green-card">

          <div className="summary-icon">
            <FaCheckCircle />
          </div>

          <div className="summary-content">
            <span>Total Collected</span>
            <strong>{formatMoney(totalPaid)}</strong>

            <small>
              Amount received
            </small>
          </div>

        </div>


        <div className="fees-summary-card orange-card">

          <div className="summary-icon">
            <FaClock />
          </div>

          <div className="summary-content">
            <span>Outstanding</span>
            <strong>{formatMoney(totalBalance)}</strong>

            <small>
              Amount remaining
            </small>
          </div>

        </div>


        <div className="fees-summary-card purple-card">

          <div className="summary-icon">
            <FaUsers />
          </div>

          <div className="summary-content">
            <span>Students</span>
            <strong>{studentList.length}</strong>

            <small>
              {paidStudents} fully paid
            </small>
          </div>

        </div>

      </div>


      {/* COLLECTION OVERVIEW */}
      <div className="fees-overview">

        <div className="overview-left">

          <div className="overview-icon">
            <FaArrowUp />
          </div>

          <div>
            <span>Collection Overview</span>

            <strong>
              {totalFees > 0
                ? `${Math.round((totalPaid / totalFees) * 100)}%`
                : "0%"}
            </strong>
          </div>

        </div>

        <div className="progress-wrapper">

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width:
                  totalFees > 0
                    ? `${Math.min(
                        (totalPaid / totalFees) * 100,
                        100
                      )}%`
                    : "0%",
              }}
            />

          </div>

          <div className="progress-labels">
            <span>
              Collected {formatMoney(totalPaid)}
            </span>

            <span>
              Total {formatMoney(totalFees)}
            </span>
          </div>

        </div>

      </div>


      {/* STUDENT SECTION */}
      <div className="fees-section">

        <div className="fees-section-header">

          <div>
            <h2>Student Fee Records</h2>
            <p>
              Manage individual student payments
            </p>
          </div>

          <div className="student-count">
            {filteredStudents.length} Students
          </div>

        </div>


        {/* TOOLBAR */}
        <div className="fees-toolbar">

          <div className="fees-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search student, mobile or vehicle..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="fees-filters">

            {["All", "Paid", "Partial", "Pending"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    filter === item ? "active" : ""
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


        {/* TABLE */}
        <div className="fees-table-wrapper">

          {filteredStudents.length === 0 ? (

            <div className="fees-empty">

              <div className="empty-fee-icon">
                <FaMoneyBillWave />
              </div>

              <h3>No fee records found</h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <table className="fees-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Vehicle</th>
                  <th>Total Fees</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.map(
                  (student, index) => {

                    const fees = getFees(student);
                    const paid = getPaid(student);
                    const balance = getBalance(student);
                    const status = getStatus(student);

                    return (
                      <tr
                        key={
                          student.id ??
                          `${student.name}-${index}`
                        }
                      >

                        {/* STUDENT */}
                        <td>

                          <div className="student-cell">

                            <div className="student-avatar">
                              {String(
                                student.name || "S"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {student.name ||
                                  "Unnamed Student"}
                              </strong>

                              <span>
                                {student.mobile ||
                                  "No mobile"}
                              </span>
                            </div>

                          </div>

                        </td>


                        {/* VEHICLE */}
                        <td>
                          <span className="vehicle-badge">
                            {student.vehicle ||
                              "Not specified"}
                          </span>
                        </td>


                        {/* TOTAL */}
                        <td>
                          <strong className="money-text">
                            {formatMoney(fees)}
                          </strong>
                        </td>


                        {/* PAID */}
                        <td>
                          <strong className="paid-money">
                            {formatMoney(paid)}
                          </strong>
                        </td>


                        {/* BALANCE */}
                        <td>
                          <strong
                            className={
                              balance === 0
                                ? "balance-paid"
                                : "balance-money"
                            }
                          >
                            {formatMoney(balance)}
                          </strong>
                        </td>


                        {/* STATUS */}
                        <td>

                          <span
                            className={`fee-status ${status.toLowerCase()}`}
                          >
                            <span className="status-dot" />

                            {status}
                          </span>

                        </td>


                        {/* ACTIONS */}
                        <td>

                          <div className="fee-actions">

                            <button
                              className="add-payment-action"
                              title="Add Payment"
                              onClick={() =>
                                navigate(
                                  `/add-payment/${student.id}`
                                )
                              }
                              disabled={balance === 0}
                            >
                              <FaPlus />
                              Pay
                            </button>


                            <button
                              className="edit-fee-action"
                              title="Edit Fee"
                              onClick={() =>
                                navigate(
                                  `/edit-fee/${student.id}`
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default Fees;