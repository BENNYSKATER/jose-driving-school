import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      schoolName: "Jose Driving School",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      logo: "",
    }
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};