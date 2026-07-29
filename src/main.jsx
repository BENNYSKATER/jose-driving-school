import { StudentProvider } from "./context/StudentContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VehicleProvider } from "./context/VehicleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StudentProvider>
  <VehicleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VehicleProvider>
</StudentProvider>

);