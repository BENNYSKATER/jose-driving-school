import { useContext } from "react";
import { Link } from "react-router-dom";
import { VehicleContext } from "../context/VehicleContext";

function Vehicles() {
 const {
  vehicles,
  deleteVehicle,
  updateVehicle,
} = useContext(VehicleContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🚗 Vehicles</h1>

      <Link to="/add-vehicle">
        <button
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Add Vehicle
        </button>
      </Link>

      <h3>Total Vehicles: {vehicles.length}</h3>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="4">No Vehicles Found</td>
            </tr>
          ) : (
            vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.number}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.status}</td>

                <td>
                  <button
  style={{
    marginRight: "8px",
    background: "orange",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  onClick={() => {
    const newNumber = prompt(
      "Enter Vehicle Number",
      vehicle.number
    );

    if (!newNumber) return;

    updateVehicle(index, {
      ...vehicle,
      number: newNumber,
    });
  }}
>
  ✏️ Edit
</button>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteVehicle(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicles;