import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaMotorcycle,
  FaArrowLeft,
  FaSave,
  FaIdCard,
  FaCalendarAlt,
  FaPalette,
  FaGasPump,
  FaTools,
} from "react-icons/fa";

import { VehicleContext } from "../context/VehicleContext";
import "../css/AddVehicle.css";

function AddVehicle() {
  const navigate = useNavigate();

  const { addVehicle } = useContext(VehicleContext);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "Car",
    model: "",
    year: "",
    color: "",
    fuel: "Petrol",
    status: "Active",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      number,
      type,
      model,
      year,
      color,
      fuel,
      status,
    } = formData;

    if (!name.trim()) {
      setError("Please enter vehicle name.");
      return;
    }

    if (!number.trim()) {
      setError("Please enter vehicle number.");
      return;
    }

    if (!model.trim()) {
      setError("Please enter vehicle model.");
      return;
    }

    if (!year) {
      setError("Please select vehicle year.");
      return;
    }

    const newVehicle = {
      id: Date.now(),

      name: name.trim(),

      number: number
        .trim()
        .toUpperCase(),

      type,

      model: model.trim(),

      year,

      color: color.trim(),

      fuel,

      status,

      createdAt:
        new Date().toLocaleDateString(),
    };

    addVehicle(newVehicle);

    navigate("/vehicles");
  };

  return (
    <div className="add-vehicle-page">

      {/* HEADER */}

      <div className="add-vehicle-header">

        <button
          className="vehicle-back-btn"
          type="button"
          onClick={() =>
            navigate("/vehicles")
          }
        >
          <FaArrowLeft />
          Back to Vehicles
        </button>

        <div className="add-vehicle-title">

          <div className="add-vehicle-title-icon">
            <FaCar />
          </div>

          <div>
            <h1>Add New Vehicle</h1>

            <p>
              Register a vehicle into Jose Driving School
            </p>
          </div>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="vehicle-form-error">
          ⚠️ {error}
        </div>
      )}


      {/* FORM */}

      <form
        className="add-vehicle-layout"
        onSubmit={handleSubmit}
      >

        {/* LEFT */}

        <div className="add-vehicle-main">

          {/* BASIC INFORMATION */}

          <div className="vehicle-form-card">

            <div className="vehicle-section-title">

              <div className="section-blue">
                <FaIdCard />
              </div>

              <div>
                <h2>Vehicle Information</h2>

                <p>
                  Enter basic vehicle details
                </p>
              </div>

            </div>


            <div className="vehicle-form-grid">

              {/* NAME */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Name
                  <span>*</span>
                </label>

                <div className="vehicle-input">

                  <FaCar />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Example: Hyundai i20"
                  />

                </div>

              </div>


              {/* NUMBER */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Number
                  <span>*</span>
                </label>

                <div className="vehicle-input">

                  <FaIdCard />

                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Example: TN 37 AB 1234"
                  />

                </div>

              </div>


              {/* MODEL */}

              <div className="vehicle-form-group">

                <label>
                  Model
                  <span>*</span>
                </label>

                <div className="vehicle-input">

                  <FaCar />

                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Example: Sportz"
                  />

                </div>

              </div>


              {/* YEAR */}

              <div className="vehicle-form-group">

                <label>
                  Manufacturing Year
                  <span>*</span>
                </label>

                <div className="vehicle-input">

                  <FaCalendarAlt />

                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Year
                    </option>

                    {Array.from(
                      {
                        length: 20,
                      },
                      (_, index) =>
                        new Date().getFullYear() -
                        index
                    ).map((year) => (

                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>

                    ))}

                  </select>

                </div>

              </div>

            </div>

          </div>


          {/* VEHICLE TYPE */}

          <div className="vehicle-form-card">

            <div className="vehicle-section-title">

              <div className="section-green">
                <FaCar />
              </div>

              <div>
                <h2>Vehicle Type</h2>

                <p>
                  Select the type of vehicle
                </p>
              </div>

            </div>


            <div className="vehicle-type-options">

              <button
                type="button"
                className={
                  formData.type === "Car"
                    ? "vehicle-type selected"
                    : "vehicle-type"
                }
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "Car",
                  }))
                }
              >

                <FaCar />

                <div>
                  <strong>Car</strong>
                  <span>
                    LMV Training
                  </span>
                </div>

              </button>


              <button
                type="button"
                className={
                  formData.type === "Bike"
                    ? "vehicle-type selected"
                    : "vehicle-type"
                }
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "Bike",
                  }))
                }
              >

                <FaMotorcycle />

                <div>
                  <strong>Bike</strong>
                  <span>
                    MCWG Training
                  </span>
                </div>

              </button>

            </div>

          </div>


          {/* ADDITIONAL DETAILS */}

          <div className="vehicle-form-card">

            <div className="vehicle-section-title">

              <div className="section-orange">
                <FaPalette />
              </div>

              <div>
                <h2>Additional Details</h2>

                <p>
                  Add vehicle maintenance information
                </p>
              </div>

            </div>


            <div className="vehicle-form-grid">

              {/* COLOR */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Color
                </label>

                <div className="vehicle-input">

                  <FaPalette />

                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Example: White"
                  />

                </div>

              </div>


              {/* FUEL */}

              <div className="vehicle-form-group">

                <label>
                  Fuel Type
                </label>

                <div className="vehicle-input">

                  <FaGasPump />

                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                  >

                    <option value="Petrol">
                      Petrol
                    </option>

                    <option value="Diesel">
                      Diesel
                    </option>

                    <option value="Electric">
                      Electric
                    </option>

                    <option value="CNG">
                      CNG
                    </option>

                  </select>

                </div>

              </div>


              {/* STATUS */}

              <div className="vehicle-form-group full">

                <label>
                  Vehicle Status
                </label>

                <div className="vehicle-input">

                  <FaTools />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="add-vehicle-side">

          {/* PREVIEW */}

          <div className="vehicle-preview-card">

            <div className="preview-label">
              VEHICLE PREVIEW
            </div>

            <div className="preview-icon">

              {formData.type === "Bike" ? (
                <FaMotorcycle />
              ) : (
                <FaCar />
              )}

            </div>

            <h2>
              {formData.name ||
                "Vehicle Name"}
            </h2>

            <div className="preview-number">

              {formData.number ||
                "TN 00 XX 0000"}

            </div>


            <div className="preview-details">

              <div>
                <span>Type</span>
                <strong>
                  {formData.type}
                </strong>
              </div>

              <div>
                <span>Model</span>
                <strong>
                  {formData.model ||
                    "Not added"}
                </strong>
              </div>

              <div>
                <span>Year</span>
                <strong>
                  {formData.year ||
                    "----"}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="preview-status">
                  {formData.status}
                </strong>
              </div>

            </div>

          </div>


          {/* SAVE CARD */}

          <div className="vehicle-save-card">

            <div className="save-icon">
              <FaSave />
            </div>

            <div>
              <h3>
                Ready to save?
              </h3>

              <p>
                Check the vehicle details
                before adding it.
              </p>
            </div>

          </div>


          <button
            type="submit"
            className="save-vehicle-btn"
          >
            <FaSave />
            Save Vehicle
          </button>


          <button
            type="button"
            className="cancel-vehicle-btn"
            onClick={() =>
              navigate("/vehicles")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddVehicle;