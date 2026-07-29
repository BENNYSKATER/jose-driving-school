import { useContext, useState } from "react";
import { VehicleContext } from "../context/VehicleContext";

function AddVehicle() {
  const { addVehicle } = useContext(VehicleContext);

  const [number, setNumber] = useState("");
  const [type, setType] = useState("Car");
  const [status, setStatus] = useState("Available");

 const handleSave = () => {
  const vehicle = {
    number,
    type,
    status,
  };

  console.log("Saving:", vehicle);

  addVehicle(vehicle);

  alert("Vehicle Added Successfully 🚗");

  setNumber("");
  setType("Car");
  setStatus("Available");
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>➕ Add Vehicle</h1>

      <input
        type="text"
        placeholder="Vehicle Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Car</option>
        <option>Bike</option>
      </select>

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Available</option>
        <option>In Use</option>
        <option>Service</option>
      </select>

      <br /><br />

      <button onClick={handleSave}>
        Save Vehicle
      </button>
    </div>
  );
}

export default AddVehicle;