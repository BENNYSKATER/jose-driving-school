import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

import {
  FaUserGraduate,
  FaPhone,
  FaCar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaIdCard,
  FaCamera,
  FaArrowLeft,
  FaSave,
  FaUser,
} from "react-icons/fa";

import "../css/AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();

  const { addStudent } = useContext(StudentContext);

  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    vehicle: "",
    licenseType: "LMV",
    joiningDate: "",
    fees: "",
    paid: "",
  });

  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // HANDLE PHOTO
  // =========================

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Photo size must be below 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };

    reader.readAsDataURL(file);

    setError("");
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("ADD STUDENT BUTTON CLICKED");

    const name = formData.name.trim();
    const mobile = formData.mobile.trim();
    const vehicle = formData.vehicle;
    const licenseType = formData.licenseType;
    const joiningDate = formData.joiningDate;

    const totalFees = Number(formData.fees || 0);
    const paidAmount = Number(formData.paid || 0);

    // =========================
    // VALIDATION
    // =========================

    if (!name) {
      setError("Please enter student name.");
      return;
    }

    if (!mobile) {
      setError("Please enter mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Mobile number must contain 10 digits.");
      return;
    }

    if (!vehicle) {
      setError("Please select a vehicle.");
      return;
    }

    if (!joiningDate) {
      setError("Please select joining date.");
      return;
    }

    if (totalFees <= 0) {
      setError("Please enter valid total fees.");
      return;
    }

    if (paidAmount < 0) {
      setError("Paid amount cannot be negative.");
      return;
    }

    if (paidAmount > totalFees) {
      setError(
        "Paid amount cannot be greater than total fees."
      );
      return;
    }

    // =========================
    // CALCULATE PAYMENT
    // =========================

    const balance = Math.max(
      totalFees - paidAmount,
      0
    );

    const status =
      balance === 0
        ? "Paid"
        : "Pending";

    // =========================
    // CREATE STUDENT
    // =========================

    const newStudent = {
      id: Date.now(),

      name,

      mobile,

      vehicle,

      licenseType,

      joiningDate,

      fees: totalFees,

      paid: paidAmount,

      balance,

      status,

      practiceClasses: 0,

      paymentHistory:
        paidAmount > 0
          ? [
              {
                amount: paidAmount,
                date:
                  new Date().toLocaleDateString(),
              },
            ]
          : [],

      photo: photoPreview || null,
    };

    console.log(
      "NEW STUDENT:",
      newStudent
    );

    // =========================
    // SAVE
    // =========================

    try {
      addStudent(newStudent);

      console.log(
        "STUDENT ADDED SUCCESSFULLY"
      );

      // Small delay so state/localStorage
      // update properly before navigation
      setTimeout(() => {
        navigate("/students");
      }, 100);
    } catch (err) {
      console.error(
        "ADD STUDENT ERROR:",
        err
      );

      setError(
        "Something went wrong while adding student."
      );
    }
  };

  // =========================
  // BALANCE
  // =========================

  const balance = Math.max(
    Number(formData.fees || 0) -
      Number(formData.paid || 0),
    0
  );

  return (
    <div className="add-student-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="add-student-header">

        <div>

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/students")
            }
          >
            <FaArrowLeft />

            Back to Students
          </button>

          <div className="page-heading">

            <div className="heading-icon">
              <FaUserGraduate />
            </div>

            <div>

              <h1>
                Add New Student
              </h1>

              <p>
                Register a new student into
                Jose Driving School
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="form-error">
          ⚠️ {error}
        </div>
      )}

      {/* =========================
          FORM
      ========================= */}

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="form-main">

          {/* =========================
              PERSONAL INFORMATION
          ========================= */}

          <div className="form-card">

            <div className="section-title">

              <div className="section-icon blue">
                <FaUser />
              </div>

              <div>

                <h2>
                  Personal Information
                </h2>

                <p>
                  Enter student's basic details
                </p>

              </div>

            </div>

            <div className="form-grid">

              {/* NAME */}

              <div className="form-group full">

                <label>
                  Student Name
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaUserGraduate />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />

                </div>

              </div>

              {/* MOBILE */}

              <div className="form-group">

                <label>
                  Mobile Number
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaPhone />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                    maxLength="10"
                  />

                </div>

              </div>

              {/* JOINING DATE */}

              <div className="form-group">

                <label>
                  Joining Date
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="joiningDate"
                    value={
                      formData.joiningDate
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              DRIVING INFORMATION
          ========================= */}

          <div className="form-card">

            <div className="section-title">

              <div className="section-icon green">
                <FaCar />
              </div>

              <div>

                <h2>
                  Driving Information
                </h2>

                <p>
                  Choose vehicle and license details
                </p>

              </div>

            </div>

            <div className="form-grid">

              {/* VEHICLE */}

              <div className="form-group">

                <label>
                  Vehicle
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaCar />

                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Vehicle
                    </option>

                    <option value="Bike">
                      🏍️ Bike
                    </option>

                    <option value="Car">
                      🚗 Car
                    </option>

                    <option value="Bike + Car">
                      🏍️ + 🚗 Bike + Car
                    </option>

                  </select>

                </div>

              </div>

              {/* LICENSE */}

              <div className="form-group">

                <label>
                  License Type
                </label>

                <div className="input-wrapper">

                  <FaIdCard />

                  <select
                    name="licenseType"
                    value={
                      formData.licenseType
                    }
                    onChange={handleChange}
                  >

                    <option value="LMV">
                      LMV - Car
                    </option>

                    <option value="MCWG">
                      MCWG - Bike
                    </option>

                    <option value="LMV + MCWG">
                      LMV + MCWG
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              FEE INFORMATION
          ========================= */}

          <div className="form-card">

            <div className="section-title">

              <div className="section-icon orange">
                <FaMoneyBillWave />
              </div>

              <div>

                <h2>
                  Fee Information
                </h2>

                <p>
                  Set course fees and initial payment
                </p>

              </div>

            </div>

            <div className="form-grid">

              {/* TOTAL FEES */}

              <div className="form-group">

                <label>
                  Total Fees
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    min="0"
                  />

                </div>

              </div>

              {/* PAID */}

              <div className="form-group">

                <label>
                  Initial Payment
                </label>

                <div className="input-wrapper">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="paid"
                    value={formData.paid}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    min="0"
                  />

                </div>

              </div>

            </div>

            {/* BALANCE */}

            <div
              className={
                balance <= 0
                  ? "balance-box paid"
                  : "balance-box pending"
              }
            >

              <div>

                <small>
                  Remaining Balance
                </small>

                <strong>
                  ₹{balance}
                </strong>

              </div>

              <div className="balance-status">

                {balance <= 0
                  ? "✓ Fully Paid"
                  : "● Payment Pending"}

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="form-side">

          {/* =========================
              PHOTO
          ========================= */}

          <div className="photo-card">

            <h3>
              Student Photo
            </h3>

            <p>
              Upload a profile photo
            </p>

            <div className="photo-preview">

              {photoPreview ? (

                <img
                  src={photoPreview}
                  alt="Student"
                />

              ) : (

                <FaUser />

              )}

            </div>

            <label className="upload-btn">

              <FaCamera />

              Choose Photo

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />

            </label>

            <small>
              JPG, PNG or WEBP • Max 5MB
            </small>

          </div>

          {/* =========================
              SUMMARY
          ========================= */}

          <div className="summary-card">

            <h3>
              Registration Summary
            </h3>

            <div className="summary-row">

              <span>
                Student
              </span>

              <strong>
                {formData.name ||
                  "Not entered"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Mobile
              </span>

              <strong>
                {formData.mobile ||
                  "Not entered"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Vehicle
              </span>

              <strong>
                {formData.vehicle ||
                  "Not selected"}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                License
              </span>

              <strong>
                {formData.licenseType}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Total Fees
              </span>

              <strong>
                ₹
                {Number(
                  formData.fees || 0
                )}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Initial Payment
              </span>

              <strong>
                ₹
                {Number(
                  formData.paid || 0
                )}
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Balance
              </span>

              <strong>
                ₹{balance}
              </strong>

            </div>

          </div>

          {/* =========================
              SAVE
          ========================= */}

          <button
            type="submit"
            className="save-student-btn"
          >

            <FaSave />

            Save Student

          </button>

          {/* =========================
              CANCEL
          ========================= */}

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/students")
            }
          >

            Cancel

          </button>

        </div>

      </form>

    </div>
  );
}

export default AddStudent;