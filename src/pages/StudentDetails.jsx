import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function StudentDetails() {

    const { id } = useParams();

    const { students } = useContext(StudentContext);

    const student = students[id];

    console.log(student);
    

    if (!student)
        return <h2>Student Not Found</h2>;

   return (
  <div
    style={{
      padding: "30px",
      background: "#f4f7fb",
      minHeight: "100vh",
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
      <img
  src={student.photo || "https://via.placeholder.com/150"}
  alt="Student"
  style={{
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #2563eb",
  }}
/>

        <div>
          <h1>{student.name}</h1>

          <h3>📞 {student.mobile}</h3>

          <h3>🚗 {student.vehicle}</h3>

          <span
            style={{
              background:
                student.status === "Paid"
                  ? "#dcfce7"
                  : "#fee2e2",
              color:
                student.status === "Paid"
                  ? "#166534"
                  : "#991b1b",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {student.status}
          </span>
        </div>
      </div>

      <hr />

      <h2>💰 Fee Details</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <h4>Total Fees</h4>
          <h2>₹{student.fees}</h2>
        </div>

        <div>
          <h4>Paid</h4>
          <h2 style={{ color: "green" }}>
            ₹{student.paid}
          </h2>
        </div>

        <div>
          <h4>Balance</h4>
          <h2 style={{ color: "red" }}>
            ₹{student.balance}
          </h2>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>
        📚 Completed Classes :{" "}
        {student.classesCompleted || 0}
      </h2>

      <progress
        value={student.classesCompleted || 0}
        max="30"
        style={{
          width: "100%",
          height: "20px",
          marginTop: "15px",
        }}
      ></progress>

      <hr style={{ margin: "30px 0" }} />

      <h2>📜 Payment History</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {(student.paymentHistory || []).map(
            (pay, index) => (
              <tr key={index}>
                <td>{pay.date}</td>
                <td>₹{pay.amount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default StudentDetails;