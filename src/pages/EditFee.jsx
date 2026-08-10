import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaSave,
  FaUser,
  FaPhone,
  FaCar,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";

import { StudentContext } from "../context/StudentContext";
import "../css/EditFee.css";

function EditFee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { students, updateStudent } = useContext(StudentContext);

  const student = students.find(
    (item) => String(item.id) === String(id)
  );

  const [fees, setFees] = useState("");

  useEffect(() => {
    if (student) {
      setFees(student.fees || "");
    }
  }, [student]);

  if (!student) {
    return (
      <div className="edit-fee-page">
        <div className="fee-not-found">
          <div className="not-found-icon">
            <FaMoneyBillWave />
          </div>

          <h2>Student Not Found</h2>

          <p>
            The student record you're looking for is unavailable.
          </p>

          <button onClick={() => navigate("/fees")}>
            <FaArrowLeft />
            Back to Fees
          </button>
        </div>
      </div>
    );
  }

  const totalFees = Number(fees || 0);
  const alreadyPaid = Number(student.paid || 0);

  const balance = Math.max(
    totalFees - alreadyPaid,
    0
  );

  const handleSave = (e) => {
    e.preventDefault();

    const newFees = Number(fees);

    if (!newFees || newFees <= 0) {
      alert("Please enter a valid fee amount.");
      return;
    }

    const currentPaid = Number(student.paid || 0);

    const newBalance = Math.max(
      newFees - currentPaid,
      0
    );

    updateStudent(student.id, {
      fees: newFees,
      balance: newBalance,
      status:
        newBalance === 0
          ? "Paid"
          : "Pending",
    });

    navigate("/fees");
  };

  return (
    <div className="edit-fee-page">

      {/* PAGE HEADER */}

      <div className="edit-fee-page-header">

        <button
          className="edit-fee-back"
          onClick={() => navigate("/fees")}
        >
          <FaArrowLeft />
        </button>

        <div>
          <div className="edit-fee-breadcrumb">
            Fees
            <span>/</span>
            Edit
          </div>

          <h1>Edit Fee Details</h1>

          <p>
            Update the student's fee structure and balance.
          </p>
        </div>

      </div>


      {/* MAIN LAYOUT */}

      <div className="edit-fee-layout">


        {/* LEFT PROFILE */}

        <aside className="edit-fee-profile">

          <div className="profile-top">

            <div className="profile-avatar">
              {student.name
                ? student.name.charAt(0).toUpperCase()
                : "S"}
            </div>

            <div className="profile-status">
              <FaCheckCircle />
              Active Student
            </div>

          </div>


          <div className="profile-name">

            <h2>{student.name}</h2>

            <p>Student ID #{student.id}</p>

          </div>


          <div className="profile-info">

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <FaPhone />
              </div>

              <div>
                <span>Mobile</span>

                <strong>
                  {student.mobile || "Not available"}
                </strong>
              </div>

            </div>


            <div className="profile-info-item">

              <div className="profile-info-icon">
                <FaCar />
              </div>

              <div>
                <span>Vehicle</span>

                <strong>
                  {student.vehicle || "Not specified"}
                </strong>
              </div>

            </div>

          </div>


          {/* CURRENT PAYMENT */}

          <div className="profile-payment">

            <div className="profile-payment-title">
              <FaWallet />
              Current Payment
            </div>

            <div className="payment-line">

              <span>Total fees</span>

              <strong>
                ₹
                {Number(
                  student.fees || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="payment-line">

              <span>Paid</span>

              <strong className="paid">
                ₹
                {alreadyPaid.toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="payment-divider" />

            <div className="payment-line balance">

              <span>Balance</span>

              <strong>
                ₹
                {Number(
                  student.balance || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        </aside>


        {/* RIGHT FORM */}

        <main className="edit-fee-form-card">

          <div className="form-card-header">

            <div className="form-header-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <h2>Fee Structure</h2>

              <p>
                Set the total course fee for this student.
              </p>
            </div>

          </div>


          <form onSubmit={handleSave}>

            {/* TOTAL FEES */}

            <div className="fee-main-field">

              <label>
                Total Course Fee
              </label>

              <p className="field-description">
                Enter the complete amount payable for the course.
              </p>


              <div className="premium-fee-input">

                <span className="currency">
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  value={fees}
                  onChange={(e) =>
                    setFees(e.target.value)
                  }
                  placeholder="0"
                />

              </div>

            </div>


            {/* LIVE SUMMARY */}

            <div className="live-summary">

              <div className="summary-heading">
                <span>Payment Summary</span>
                <small>Live calculation</small>
              </div>


              <div className="summary-grid">

                <div className="summary-box">

                  <span>
                    Total Fees
                  </span>

                  <strong>
                    ₹
                    {totalFees.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div className="summary-box">

                  <span>
                    Already Paid
                  </span>

                  <strong className="summary-paid">
                    ₹
                    {alreadyPaid.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div className="summary-box highlight">

                  <span>
                    Remaining Balance
                  </span>

                  <strong>
                    ₹
                    {balance.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="edit-fee-actions">

              <button
                type="button"
                className="cancel-fee-btn"
                onClick={() => navigate("/fees")}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-fee-btn"
              >
                <FaSave />
                Save Fee Changes
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default EditFee;