import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { VehicleContext } from "../context/VehicleContext";

function Reports() {
  const { students } = useContext(StudentContext);
  const { vehicles } = useContext(VehicleContext);

  const paidStudents = students.filter(
    (s) => s.status === "Paid"
  ).length;

  const pendingStudents = students.length - paidStudents;

  const totalFees = students.reduce(
    (sum, s) => sum + Number(s.fees || 0),
    0
  );

  const pendingFees = students
    .filter((s) => s.status !== "Paid")
    .reduce((sum, s) => sum + Number(s.fees || 0), 0);

  const collectedFees = totalFees - pendingFees;

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Reports</h1>

      <h3>Total Students : {students.length}</h3>
      <h3>Total Vehicles : {vehicles.length}</h3>
      <h3>Paid Students : {paidStudents}</h3>
      <h3>Pending Students : {pendingStudents}</h3>

      <hr />

      <h3>Total Fees : ₹{totalFees}</h3>
      <h3>Collected : ₹{collectedFees}</h3>
      <h3>Pending : ₹{pendingFees}</h3>
    </div>
  );
}

export default Reports;