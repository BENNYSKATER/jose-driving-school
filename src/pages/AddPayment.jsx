import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaCheck,
  FaUser,
} from "react-icons/fa";

import { StudentContext } from "../context/StudentContext";
import { generateReceipt } from "../utils/generateReceipt";

import "../css/AddPayment.css";

function AddPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    students,
    addPayment,
  } = useContext(StudentContext);

  const student = students.find(
    (item) => String(item.id) === String(id)
  );

  const [amount, setAmount] = useState("");

  // ================================
  // STUDENT NOT FOUND
  // ================================

  if (!student) {
    return (
      <div className="payment-not-found">
        <FaMoneyBillWave />

        <h2>Student Not Found</h2>

        <p>
          The student record could not be found.
        </p>

        <button
          onClick={() => navigate("/fees")}
        >
          <FaArrowLeft />
          Back to Fees
        </button>
      </div>
    );
  }

  // ================================
  // FEE CALCULATIONS
  // ================================

  const totalFees = Number(
    student.fees || 0
  );

  const totalPaid = Number(
    student.paid || 0
  );

  const balance = Math.max(
    totalFees - totalPaid,
    0
  );

  const paymentAmount = Number(
    amount || 0
  );

  const remainingBalance = Math.max(
    balance - paymentAmount,
    0
  );

  // ================================
  // PAYMENT
  // ================================

  const handlePayment = (e) => {
    e.preventDefault();

    // Validate amount
    if (
      !paymentAmount ||
      paymentAmount <= 0
    ) {
      alert(
        "Enter a valid payment amount."
      );
      return;
    }

    // Prevent over payment
    if (paymentAmount > balance) {
      alert(
        "Payment cannot be greater than the balance."
      );
      return;
    }

    // ================================
    // UPDATED DATA FOR RECEIPT
    // ================================

    const updatedPaid =
      totalPaid + paymentAmount;

    const updatedBalance = Math.max(
      totalFees - updatedPaid,
      0
    );

    const updatedStatus =
      updatedBalance === 0
        ? "Paid"
        : "Pending";

    const updatedStudent = {
      ...student,

      paid: updatedPaid,

      balance: updatedBalance,

      status: updatedStatus,
    };

    // ================================
    // SAVE PAYMENT
    // ================================

    addPayment(
      student.id,
      paymentAmount
    );

    // ================================
    // DOWNLOAD RECEIPT
    // ================================

    generateReceipt(
      updatedStudent,
      paymentAmount
    );

    // ================================
    // CONSOLE
    // ================================

    console.log(
      "Payment Successful"
    );

    console.log(
      "Student:",
      student.name
    );

    console.log(
      "Paid Now:",
      paymentAmount
    );

    console.log(
      "Total Paid:",
      updatedPaid
    );

    console.log(
      "Remaining Balance:",
      updatedBalance
    );

    // ================================
    // BACK TO FEES
    // ================================

    navigate("/fees");
  };

  // ================================
  // UI
  // ================================

  return (
    <div className="payment-page">

      {/* ============================
          TOP
      ============================= */}

      <div className="payment-top">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/fees")
          }
        >
          <FaArrowLeft />
          Back
        </button>

        <div>
          <h1>Add Payment</h1>

          <p>
            Record a student payment
          </p>
        </div>

      </div>

      {/* ============================
          CARD
      ============================= */}

      <div className="payment-card">

        {/* STUDENT */}

        <div className="payment-student">

          <div className="payment-user-icon">
            <FaUser />
          </div>

          <div>
            <h2>
              {student.name}
            </h2>

            <span>
              {student.mobile ||
                "No mobile number"}
            </span>
          </div>

        </div>

        {/* ==========================
            FEE INFO
        ========================== */}

        <div className="payment-info">

          <div>
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

          <div>
            <span>
              Total Paid
            </span>

            <strong className="green-text">
              ₹
              {totalPaid.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div>
            <span>
              Balance
            </span>

            <strong className="orange-text">
              ₹
              {balance.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

        </div>

        {/* ==========================
            PAYMENT FORM
        ========================== */}

        {balance > 0 ? (

          <form
            onSubmit={handlePayment}
          >

            <div className="payment-form-group">

              <label>
                Payment Amount
              </label>

              <div className="payment-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  max={balance}
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  placeholder="Enter amount"
                />

              </div>

            </div>

            {/* REMAINING */}

            <div className="remaining-box">

              <span>
                Remaining after payment
              </span>

              <strong>
                ₹
                {remainingBalance.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            {/* SAVE */}

            <button
              type="submit"
              className="payment-submit-btn"
            >
              <FaCheck />

              Save Payment
            </button>

          </form>

        ) : (

          /* FULLY PAID */

          <div className="fully-paid-box">

            <FaCheck />

            <h3>
              Fees Fully Paid
            </h3>

            <p>
              This student's fee
              balance is already ₹0.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default AddPayment;