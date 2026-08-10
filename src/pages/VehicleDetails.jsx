import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCar,
  FaMotorcycle,
  FaEdit,
  FaTrash,
  FaIdCard,
  FaCalendarAlt,
  FaTools,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { VehicleContext } from "../context/VehicleContext";
import "../css/VehicleDetails.css";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { vehicles, deleteVehicle } = useContext(VehicleContext);

  const vehicle = vehicles.find(
    (item) => String(item.id) === String(id)
  );

  if (!vehicle) {
    return (
      <div className="vehicle-not-found">
        <div className="not-found-card">
          <div className="not-found-icon">
            <FaCar />
          </div>

          <h2>Vehicle Not Found</h2>

          <p>
            The vehicle you are looking for does not exist
            or may have been removed.
          </p>

          <button onClick={() => navigate("/vehicles")}>
            <FaArrowLeft />
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  const status = vehicle.status || "Active";

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete ${vehicle.name || "this vehicle"}?`
    );

    if (!confirmed) return;

    const index = vehicles.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (index !== -1) {
      deleteVehicle(index);
    }

    navigate("/vehicles");
  };

  const isBike = vehicle.type === "Bike";

  return (
    <div className="vehicle-details-page">

      {/* HEADER */}

      <div className="vehicle-details-header">

        <button
          className="back-btn"
          onClick={() => navigate("/vehicles")}
        >
          <FaArrowLeft />
          Vehicles
        </button>

        <div className="details-actions">

          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit-vehicle/${vehicle.id}`)
            }
          >
            <FaEdit />
            Edit Vehicle
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>

        </div>

      </div>

      {/* MAIN CARD */}

      <div className="vehicle-profile-card">

        <div className="vehicle-profile-top">

          <div className="vehicle-big-icon">
            {isBike ? <FaMotorcycle /> : <FaCar />}
          </div>

          <div className="vehicle-main-info">

            <div className="vehicle-name-row">

              <h1>
                {vehicle.name || "Unnamed Vehicle"}
              </h1>

              <span
                className={`details-status ${status.toLowerCase()}`}
              >
                <span></span>
                {status}
              </span>

            </div>

            <p className="vehicle-number-large">
              {vehicle.number || "Registration number not added"}
            </p>

            <p className="vehicle-type-text">
              {vehicle.type || "Vehicle"} •{" "}
              {vehicle.model || "Model not specified"}
            </p>

          </div>

        </div>

        {/* INFORMATION */}

        <div className="vehicle-info-section">

          <div className="section-heading">
            <h2>Vehicle Information</h2>
            <p>Basic details of this vehicle</p>
          </div>

          <div className="vehicle-info-grid">

            <div className="info-box">
              <div className="info-icon">
                <FaIdCard />
              </div>

              <div>
                <span>Registration Number</span>
                <strong>
                  {vehicle.number || "Not added"}
                </strong>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                {isBike ? <FaMotorcycle /> : <FaCar />}
              </div>

              <div>
                <span>Vehicle Type</span>
                <strong>
                  {vehicle.type || "Not specified"}
                </strong>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <FaCar />
              </div>

              <div>
                <span>Model</span>
                <strong>
                  {vehicle.model || "Not specified"}
                </strong>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <FaCalendarAlt />
              </div>

              <div>
                <span>Manufacturing Year</span>
                <strong>
                  {vehicle.year || "Not added"}
                </strong>
              </div>
            </div>

          </div>

        </div>

        {/* STATUS */}

        <div className="vehicle-status-section">

          <div className="section-heading">
            <h2>Current Status</h2>
            <p>Vehicle availability information</p>
          </div>

          <div className="status-large-card">

            <div className="status-large-icon">

              {status === "Active" && (
                <FaCheckCircle />
              )}

              {status === "Maintenance" && (
                <FaTools />
              )}

              {status === "Inactive" && (
                <FaTimesCircle />
              )}

            </div>

            <div>
              <strong>{status}</strong>

              <p>
                {status === "Active"
                  ? "This vehicle is currently available for driving practice."
                  : status === "Maintenance"
                  ? "This vehicle is currently under maintenance."
                  : "This vehicle is currently unavailable."
                }
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VehicleDetails;