import { createContext, useState, useEffect } from "react";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("vehicles");
    return saved ? JSON.parse(saved) : [];
  });

  const addVehicle = (vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const deleteVehicle = (index) => {
    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVehicle = (index, updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((vehicle, i) =>
        i === index ? updatedVehicle : vehicle
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        addVehicle,
        deleteVehicle,
        updateVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}