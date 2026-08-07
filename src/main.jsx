import { StudentProvider } from "./context/StudentContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VehicleProvider } from "./context/VehicleContext";
import { InstructorProvider } from "./context/InstructorContext";
import { ScheduleProvider } from "./context/ScheduleContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
        <VehicleProvider>
          <InstructorProvider>
            <ScheduleProvider>
              <AttendanceProvider>
                <SettingsProvider>
                  <App />
                </SettingsProvider>
              </AttendanceProvider>
            </ScheduleProvider>
          </InstructorProvider>
        </VehicleProvider>
      </StudentProvider>
    </AuthProvider>
  </BrowserRouter>
);