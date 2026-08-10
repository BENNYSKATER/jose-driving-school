import { createContext, useEffect, useState } from "react";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(() => {
    try {
      const saved = localStorage.getItem("vehicles");

      if (!saved) {
        return [];
      }

      const data = JSON.parse(saved);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error loading vehicles:", error);
      return [];
    }
  });

  // =========================
  // SAVE VEHICLES
  // =========================

  useEffect(() => {
    try {
      localStorage.setItem(
        "vehicles",
        JSON.stringify(vehicles)
      );
    } catch (error) {
      console.error("Error saving vehicles:", error);
    }
  }, [vehicles]);

  // =========================
  // ADD VEHICLE
  // =========================

  const addVehicle = (vehicle) => {
    const newVehicle = {
      ...vehicle,
      id: vehicle.id || Date.now(),
    };

    setVehicles((prevVehicles) => [
      ...prevVehicles,
      newVehicle,
    ]);
  };

  // =========================
  // GET VEHICLE BY ID
  // =========================

  const getVehicleById = (vehicleId) => {
    return vehicles.find(
      (vehicle) =>
        String(vehicle.id) === String(vehicleId)
    );
  };

  // =========================
  // UPDATE VEHICLE
  // =========================

  const updateVehicle = (
    vehicleId,
    updatedVehicle
  ) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        String(vehicle.id) === String(vehicleId)
          ? {
              ...vehicle,
              ...updatedVehicle,
            }
          : vehicle
      )
    );
  };

  // =========================
  // DELETE VEHICLE
  // =========================

  const deleteVehicle = (vehicleId) => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter(
        (vehicle) =>
          String(vehicle.id) !== String(vehicleId)
      )
    );
  };

  // =========================
  // VALUE
  // =========================

  const value = {
    vehicles,
    addVehicle,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
}

export default VehicleProvider;