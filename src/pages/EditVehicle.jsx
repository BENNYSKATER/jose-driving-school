import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCar,
  FaMotorcycle,
  FaSave,
} from "react-icons/fa";

import { VehicleContext } from "../context/VehicleContext";
import "../css/EditVehicle.css";

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { vehicles, updateVehicle } =
    useContext(VehicleContext);

  const vehicleIndex = vehicles.findIndex(
    (vehicle) =>
      String(vehicle.id) === String(id)
  );

  const vehicle =
    vehicleIndex !== -1
      ? vehicles[vehicleIndex]
      : null;

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "Car",
    model: "",
    year: "",
    status: "Active",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || "",
        number: vehicle.number || "",
        type: vehicle.type || "Car",
        model: vehicle.model || "",
        year: vehicle.year || "",
        status: vehicle.status || "Active",
      });
    }
  }, [id, vehicle?.name]);

  if (!vehicle) {
    return (
      <div className="edit-vehicle-not-found">
        <div>
          <FaCar />
          <h2>Vehicle Not Found</h2>

          <button
            onClick={() =>
              navigate("/vehicles")
            }
          >
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.number.trim()
    ) {
      alert(
        "Vehicle name and registration number are required."
      );
      return;
    }

    updateVehicle(vehicleIndex, {
      ...vehicle,
      ...formData,
    });

    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <div className="edit-vehicle-page">

      {/* HEADER */}

      <div className="edit-vehicle-header">

        <button
          className="edit-back-btn"
          onClick={() =>
            navigate(`/vehicle/${vehicle.id}`)
          }
        >
          <FaArrowLeft />
          Back
        </button>

        <div>
          <h1>Edit Vehicle</h1>
          <p>
            Update vehicle information
          </p>
        </div>

      </div>

      {/* FORM CARD */}

      <form
        className="edit-vehicle-card"
        onSubmit={handleSubmit}
      >

        <div className="edit-card-heading">

          <div className="edit-vehicle-icon">
            {formData.type === "Bike" ? (
              <FaMotorcycle />
            ) : (
              <FaCar />
            )}
          </div>

          <div>
            <h2>Vehicle Details</h2>
            <p>
              Keep the vehicle information up to date.
            </p>
          </div>

        </div>

        <div className="edit-form-grid">

          <div className="edit-form-group">

            <label>
              Vehicle Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Eg. Hyundai i20"
            />

          </div>

          <div className="edit-form-group">

            <label>
              Registration Number
            </label>

            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Eg. TN 38 AB 1234"
            />

          </div>

          <div className="edit-form-group">

            <label>
              Vehicle Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Car">
                Car
              </option>

              <option value="Bike">
                Bike
              </option>
            </select>

          </div>

          <div className="edit-form-group">

            <label>
              Model
            </label>

            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Eg. Sportz"
            />

          </div>

          <div className="edit-form-group">

            <label>
              Manufacturing Year
            </label>

            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Eg. 2024"
            />

          </div>

          <div className="edit-form-group">

            <label>
              Status
            </label>

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

        {/* ACTIONS */}

        <div className="edit-form-footer">

          <button
            type="button"
            className="cancel-edit-btn"
            onClick={() =>
              navigate(`/vehicle/${vehicle.id}`)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-vehicle-btn"
          >
            <FaSave />
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditVehicle;