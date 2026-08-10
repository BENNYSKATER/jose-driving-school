import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaTools,
  FaMotorcycle,
} from "react-icons/fa";

import { VehicleContext } from "../context/VehicleContext";
import "../css/Vehicles.css";

function Vehicles() {
  const navigate = useNavigate();

  const { vehicles, deleteVehicle } = useContext(VehicleContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const vehicleList = Array.isArray(vehicles) ? vehicles : [];

  const filteredVehicles = vehicleList.filter((vehicle) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(vehicle.name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(vehicle.number || "")
        .toLowerCase()
        .includes(searchText) ||
      String(vehicle.type || "")
        .toLowerCase()
        .includes(searchText);

    const matchesFilter =
      filter === "All" ||
      String(vehicle.status || "") === filter;

    return matchesSearch && matchesFilter;
  });

  const totalVehicles = vehicleList.length;

  const activeVehicles = vehicleList.filter(
    (vehicle) =>
      vehicle.status === "Active"
  ).length;

  const maintenanceVehicles = vehicleList.filter(
    (vehicle) =>
      vehicle.status === "Maintenance"
  ).length;

  const inactiveVehicles = vehicleList.filter(
    (vehicle) =>
      vehicle.status === "Inactive"
  ).length;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    deleteVehicle(id);
  };

  return (
    <div className="vehicles-page">

      {/* HEADER */}

      <div className="vehicles-header">

        <div>
          <div className="vehicles-title">

            <div className="vehicles-title-icon">
              <FaCar />
            </div>

            <div>
              <h1>Vehicles</h1>

              <p>
                Manage Jose Driving School vehicles
              </p>
            </div>

          </div>
        </div>

        <button
          className="add-vehicle-btn"
          onClick={() =>
            navigate("/add-vehicle")
          }
        >
          <FaPlus />
          Add Vehicle
        </button>

      </div>


      {/* STATS */}

      <div className="vehicle-stats">

        <div className="vehicle-stat-card">

          <div className="stat-icon blue">
            <FaCar />
          </div>

          <div>
            <span>Total Vehicles</span>
            <strong>{totalVehicles}</strong>
          </div>

        </div>


        <div className="vehicle-stat-card">

          <div className="stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeVehicles}</strong>
          </div>

        </div>


        <div className="vehicle-stat-card">

          <div className="stat-icon orange">
            <FaTools />
          </div>

          <div>
            <span>Maintenance</span>
            <strong>{maintenanceVehicles}</strong>
          </div>

        </div>


        <div className="vehicle-stat-card">

          <div className="stat-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveVehicles}</strong>
          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="vehicles-toolbar">

        <div className="vehicle-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search vehicle..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="vehicle-filter">

          <button
            className={
              filter === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("All")
            }
          >
            All
          </button>

          <button
            className={
              filter === "Active"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Active")
            }
          >
            Active
          </button>

          <button
            className={
              filter === "Maintenance"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Maintenance")
            }
          >
            Maintenance
          </button>

          <button
            className={
              filter === "Inactive"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("Inactive")
            }
          >
            Inactive
          </button>

        </div>

      </div>


      {/* VEHICLE GRID */}

      <div className="vehicle-grid">

        {filteredVehicles.length === 0 ? (

          <div className="vehicle-empty">

            <div className="empty-icon">
              <FaCar />
            </div>

            <h2>
              No Vehicles Found
            </h2>

            <p>
              Add your first vehicle to start
              managing your driving school fleet.
            </p>

            <button
              onClick={() =>
                navigate("/add-vehicle")
              }
            >
              <FaPlus />
              Add Vehicle
            </button>

          </div>

        ) : (

          filteredVehicles.map((vehicle) => (

            <div
              className="vehicle-card"
              key={vehicle.id}
            >

              {/* CARD TOP */}

              <div className="vehicle-card-top">

                <div className="vehicle-image">

                  {vehicle.type === "Bike" ? (
                    <FaMotorcycle />
                  ) : (
                    <FaCar />
                  )}

                </div>

                <div className="vehicle-card-actions">

                  <button
                    title="View"
                    onClick={() =>
                      navigate(
                        `/vehicle/${vehicle.id}`
                      )
                    }
                  >
                    <FaEye />
                  </button>

                  <button
                    title="Edit"
                    onClick={() =>
                      navigate(
                        `/edit-vehicle/${vehicle.id}`
                      )
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    title="Delete"
                    className="delete-action"
                    onClick={() =>
                      handleDelete(vehicle.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>


              {/* VEHICLE INFO */}

              <div className="vehicle-info">

                <h2>
                  {vehicle.name ||
                    "Unnamed Vehicle"}
                </h2>

                <div className="vehicle-number">
                  {vehicle.number ||
                    "Number not added"}
                </div>

                <div className="vehicle-details">

                  <div>
                    <span>Type</span>
                    <strong>
                      {vehicle.type ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>Model</span>
                    <strong>
                      {vehicle.model ||
                        "Not specified"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* STATUS */}

              <div className="vehicle-card-footer">

                <span
                  className={`vehicle-status ${
                    String(
                      vehicle.status ||
                        "Active"
                    ).toLowerCase()
                  }`}
                >
                  <span className="status-dot"></span>

                  {vehicle.status ||
                    "Active"}

                </span>

                <span className="vehicle-year">
                  {vehicle.year || ""}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Vehicles;