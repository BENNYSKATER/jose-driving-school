import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import "../css/StudentProfile.css";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { students } = useContext(StudentContext);

  // IMPORTANT:
  // Student ID is Date.now(), so DON'T use students[Number(id)]
  const student = students.find(
    (s) => String(s.id) === String(id)
  );

  // Student not found
  if (!student) {
    return (
      <div className="profile-page">
        <div className="profile-not-found">
          <div>😕</div>

          <h2>Student Not Found</h2>

          <p>
            The student you are looking for does not exist.
          </p>

          <Link to="/students">
            ← Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const fees = Number(student.fees || 0);
  const paid = Number(student.paid || 0);

  const balance =
    student.balance !== undefined
      ? Number(student.balance)
      : Math.max(fees - paid, 0);

  const isPaid =
    balance <= 0 || student.status === "Paid";

  const classesCompleted = Number(
    student.practiceClasses ||
      student.classesCompleted ||
      0
  );

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">

        <Link
          to="/students"
          className="back-btn"
        >
          ← Back to Students
        </Link>

        <button
          className="profile-edit-btn"
          onClick={() =>
            navigate(`/edit-student/${student.id}`)
          }
        >
          ✏️ Edit Student
        </button>

      </div>


      {/* MAIN PROFILE */}
      <div className="profile-main-card">

        <div className="profile-avatar">

          {student.photo ? (
            <img
              src={student.photo}
              alt={student.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            student.name
              ? student.name.charAt(0).toUpperCase()
              : "S"
          )}

        </div>

        <div className="profile-main-info">

          <h1>
            {student.name || "Unknown Student"}
          </h1>

          <p>
            📱 {student.mobile || "No mobile number"}
          </p>

          <span
            className={
              isPaid
                ? "profile-status paid"
                : "profile-status pending"
            }
          >
            {isPaid
              ? "✓ Fees Paid"
              : "● Payment Pending"}
          </span>

        </div>

      </div>


      {/* INFORMATION GRID */}
      <div className="profile-grid">


        {/* PERSONAL INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <span>👤</span>

            <div>
              <h2>Personal Information</h2>
              <p>Student basic details</p>
            </div>

          </div>

          <div className="profile-details">

            <div>
              <label>Student Name</label>
              <strong>
                {student.name || "-"}
              </strong>
            </div>

            <div>
              <label>Mobile Number</label>
              <strong>
                {student.mobile || "-"}
              </strong>
            </div>

            <div>
              <label>Vehicle</label>
              <strong>
                🚗 {student.vehicle || "-"}
              </strong>
            </div>

            <div>
              <label>License Type</label>
              <strong>
                {student.licenseType || "-"}
              </strong>
            </div>

            <div>
              <label>Joining Date</label>
              <strong>
                {student.joiningDate || "-"}
              </strong>
            </div>

          </div>

        </div>


        {/* PAYMENT INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <span>💰</span>

            <div>
              <h2>Payment Information</h2>
              <p>Fees and payment status</p>
            </div>

          </div>

          <div className="payment-details">

            <div>
              <span>Total Fees</span>
              <strong>
                ₹{fees}
              </strong>
            </div>

            <div className="payment-paid">
              <span>Total Paid</span>
              <strong>
                ₹{paid}
              </strong>
            </div>

            <div className="payment-balance">
              <span>Balance</span>
              <strong>
                ₹{balance}
              </strong>
            </div>

          </div>

        </div>


        {/* PRACTICE INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <span>🚗</span>

            <div>
              <h2>Practice Information</h2>
              <p>Driving practice progress</p>
            </div>

          </div>

          <div className="practice-info">

            <div className="practice-number">

              <strong>
                {classesCompleted}
              </strong>

              <span>
                Classes Completed
              </span>

            </div>

            <div className="practice-progress">

              <div className="progress-bar">

                <div
                  style={{
                    width: `${Math.min(
                      classesCompleted * 8.33,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* PAYMENT HISTORY */}
        <div className="profile-card">

          <div className="profile-card-title">

            <span>📜</span>

            <div>
              <h2>Payment History</h2>
              <p>Recent payments</p>
            </div>

          </div>

          {student.paymentHistory &&
          student.paymentHistory.length > 0 ? (

            <div className="payment-history">

              {student.paymentHistory
                .slice()
                .reverse()
                .map((payment, index) => (

                  <div
                    className="history-row"
                    key={index}
                  >

                    <div>

                      <strong>
                        ₹{Number(payment.amount || 0)}
                      </strong>

                      <span>
                        Payment received
                      </span>

                    </div>

                    <small>
                      {payment.date}
                    </small>

                  </div>

                ))}

            </div>

          ) : (

            <div className="empty-history">

              💳

              <p>
                No payment history
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;