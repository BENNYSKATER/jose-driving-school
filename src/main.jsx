import { StudentProvider } from "./context/StudentContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VehicleProvider } from "./context/VehicleContext";
import { InstructorProvider } from "./context/InstructorContext";
import { ScheduleProvider } from "./context/ScheduleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StudentProvider>
  <VehicleProvider>
    <InstructorProvider>
      <ScheduleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ScheduleProvider>
    </InstructorProvider>
  </VehicleProvider>
</StudentProvider>
);