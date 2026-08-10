import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserTie,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCar,
  FaIdCard,
  FaCamera,
  FaBriefcase,
  FaMoneyBillWave,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { InstructorContext } from "../context/InstructorContext";

import "../css/AddInstructor.css";

function AddInstructor() {
  const navigate = useNavigate();

  const { addInstructor } =
    useContext(InstructorContext);

  const [photo, setPhoto] =
    useState(null);

  const [photoPreview, setPhotoPreview] =
    useState(null);

  const [error, setError] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    joiningDate: "",
    experience: "",
    licenseType: "LMV",
    vehicle: "",
    salary: "",
    status: "Active",
    studentsCount: 0,
    classesCount: 0,
    rating: 5,
    notes: "",
  });

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handlePhoto = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Photo size must be below 5MB."
      );
      return;
    }

    setPhoto(file);

    setPhotoPreview(
      URL.createObjectURL(file)
    );

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      mobile,
      email,
      joiningDate,
      experience,
      licenseType,
      vehicle,
      salary,
      status,
      notes,
    } = formData;

    if (!name.trim()) {
      setError(
        "Please enter instructor name."
      );
      return;
    }

    if (!mobile.trim()) {
      setError(
        "Please enter mobile number."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError(
        "Mobile number must contain 10 digits."
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setError(
        "Please enter a valid email."
      );
      return;
    }

    if (!joiningDate) {
      setError(
        "Please select joining date."
      );
      return;
    }

    if (!experience) {
      setError(
        "Please enter experience."
      );
      return;
    }

    const newInstructor = {
      id: Date.now(),

      name: name.trim(),

      mobile: mobile.trim(),

      email: email.trim(),

      joiningDate,

      experience,

      licenseType,

      vehicle,

      salary:
        Number(salary || 0),

      status,

      studentsCount: 0,

      classesCount: 0,

      rating: 5,

      notes: notes.trim(),

      photo: photo
        ? URL.createObjectURL(photo)
        : null,
    };

    addInstructor(newInstructor);

    navigate("/instructors");
  };

  return (
    <div className="add-instructor-page">

      {/* ================= HEADER ================= */}

      <div className="add-instructor-header">

        <button
          className="back-instructor-btn"
          onClick={() =>
            navigate("/instructors")
          }
        >
          <FaArrowLeft />
          Back to Instructors
        </button>

        <div className="add-instructor-title">

          <div className="add-title-icon">
            <FaUserTie />
          </div>

          <div>
            <h1>
              Add New Instructor
            </h1>

            <p>
              Register a new instructor
              into Jose Driving School
            </p>
          </div>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="instructor-form-error">
          ⚠️ {error}
        </div>
      )}

      {/* ================= FORM ================= */}

      <form
        className="add-instructor-layout"
        onSubmit={handleSubmit}
      >

        {/* ================= LEFT ================= */}

        <div className="add-instructor-main">

          {/* PERSONAL */}

          <div className="add-instructor-card">

            <div className="add-section-heading">

              <div className="section-heading-icon blue">
                <FaUser />
              </div>

              <div>
                <h2>
                  Personal Information
                </h2>

                <p>
                  Basic instructor details
                </p>
              </div>

            </div>

            <div className="instructor-form-grid">

              <div className="instructor-form-group full">

                <label>
                  Full Name
                  <span>*</span>
                </label>

                <div className="instructor-input">

                  <FaUser />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />

                </div>

              </div>

              <div className="instructor-form-group">

                <label>
                  Mobile Number
                  <span>*</span>
                </label>

                <div className="instructor-input">

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

              <div className="instructor-form-group">

                <label>
                  Email Address
                </label>

                <div className="instructor-input">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />

                </div>

              </div>

              <div className="instructor-form-group">

                <label>
                  Joining Date
                  <span>*</span>
                </label>

                <div className="instructor-input">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* PROFESSIONAL */}

          <div className="add-instructor-card">

            <div className="add-section-heading">

              <div className="section-heading-icon green">
                <FaBriefcase />
              </div>

              <div>
                <h2>
                  Professional Information
                </h2>

                <p>
                  Driving experience and assignment
                </p>
              </div>

            </div>

            <div className="instructor-form-grid">

              <div className="instructor-form-group">

                <label>
                  Experience
                  <span>*</span>
                </label>

                <div className="instructor-input">

                  <FaBriefcase />

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5 Years"
                  />

                </div>

              </div>

              <div className="instructor-form-group">

                <label>
                  License Type
                </label>

                <div className="instructor-input">

                  <FaIdCard />

                  <select
                    name="licenseType"
                    value={formData.licenseType}
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

              <div className="instructor-form-group">

                <label>
                  Assigned Vehicle
                </label>

                <div className="instructor-input">

                  <FaCar />

                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                  >

                    <option value="">
                      No Vehicle
                    </option>

                    <option value="Car">
                      🚗 Car
                    </option>

                    <option value="Bike">
                      🏍️ Bike
                    </option>

                    <option value="Car + Bike">
                      🚗 + 🏍️ Both
                    </option>

                  </select>

                </div>

              </div>

              <div className="instructor-form-group">

                <label>
                  Status
                </label>

                <div className="instructor-input">

                  <FaUserTie />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* EMPLOYMENT */}

          <div className="add-instructor-card">

            <div className="add-section-heading">

              <div className="section-heading-icon orange">
                <FaMoneyBillWave />
              </div>

              <div>
                <h2>
                  Employment Details
                </h2>

                <p>
                  Salary and additional notes
                </p>
              </div>

            </div>

            <div className="instructor-form-grid">

              <div className="instructor-form-group">

                <label>
                  Monthly Salary
                </label>

                <div className="instructor-input">

                  <FaMoneyBillWave />

                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    min="0"
                  />

                </div>

              </div>

              <div className="instructor-form-group full">

                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional information..."
                  rows="4"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="add-instructor-side">

          {/* PHOTO */}

          <div className="instructor-photo-card">

            <h3>
              Instructor Photo
            </h3>

            <p>
              Upload a professional profile photo
            </p>

            <div className="instructor-photo-preview">

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Instructor"
                />
              ) : (
                <FaUserTie />
              )}

            </div>

            <label className="instructor-upload-btn">

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

          {/* SUMMARY */}

          <div className="instructor-summary-card">

            <h3>
              Registration Summary
            </h3>

            <div className="summary-item">

              <span>
                Instructor
              </span>

              <strong>
                {formData.name ||
                  "Not entered"}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Experience
              </span>

              <strong>
                {formData.experience ||
                  "Not entered"}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                License
              </span>

              <strong>
                {formData.licenseType}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Vehicle
              </span>

              <strong>
                {formData.vehicle ||
                  "Not assigned"}
              </strong>

            </div>

            <div className="summary-item">

              <span>
                Status
              </span>

              <strong
                className={
                  formData.status === "Active"
                    ? "summary-active"
                    : "summary-inactive"
                }
              >
                {formData.status}
              </strong>

            </div>

          </div>

          {/* BUTTONS */}

          <button
            type="submit"
            className="save-instructor-btn"
          >
            <FaSave />
            Save Instructor
          </button>

          <button
            type="button"
            className="cancel-instructor-btn"
            onClick={() =>
              navigate("/instructors")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddInstructor;