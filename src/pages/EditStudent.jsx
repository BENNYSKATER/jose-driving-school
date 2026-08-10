import { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { StudentContext } from "../context/StudentContext";

import {
  FaUserGraduate,
  FaPhone,
  FaCar,
  FaIdCard,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";


const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  marginTop: "8px",
  border: "1px solid #dbe3ef",
  borderRadius: "10px",
  outline: "none",
  color: "#0f172a",
  background: "#ffffff",
  fontSize: "15px",
};


function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    students,
    updateStudent,
  } = useContext(StudentContext);


  // FIND STUDENT
  const student = students.find(
    (item) =>
      String(item.id) === String(id)
  );


  const [formData, setFormData] =
    useState({
      name: "",
      mobile: "",
      vehicle: "",
      licenseType: "LMV",
      joiningDate: "",
      fees: "",
      paid: "",
    });


  const [error, setError] =
    useState("");


  // LOAD STUDENT DATA
  useEffect(() => {

    if (!student) return;

    setFormData({
      name: student.name || "",
      mobile: student.mobile || "",
      vehicle: student.vehicle || "",
      licenseType:
        student.licenseType || "LMV",
      joiningDate:
        student.joiningDate || "",
      fees: student.fees ?? "",
      paid: student.paid ?? "",
    });

  }, [student]);


  // STUDENT NOT FOUND
  if (!student) {

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >

        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "18px",
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,.08)",
          }}
        >

          <div
            style={{
              fontSize: "55px",
              marginBottom: "15px",
            }}
          >
            👨‍🎓
          </div>

          <h2>
            Student Not Found
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            This student may have been
            deleted.
          </p>

          <button
            onClick={() =>
              navigate("/students")
            }
            style={{
              marginTop: "15px",
              padding: "12px 22px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Back to Students
          </button>

        </div>

      </div>
    );
  }


  // HANDLE INPUT
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  // SAVE
  const handleSubmit = (e) => {

    e.preventDefault();

    const name =
      formData.name.trim();

    const mobile =
      formData.mobile.trim();

    const fees =
      Number(formData.fees || 0);

    const paid =
      Number(formData.paid || 0);


    // VALIDATION

    if (!name) {
      setError(
        "Please enter student name."
      );
      return;
    }


    if (!/^[0-9]{10}$/.test(mobile)) {
      setError(
        "Mobile number must contain exactly 10 digits."
      );
      return;
    }


    if (!formData.vehicle) {
      setError(
        "Please select a vehicle."
      );
      return;
    }


    if (!formData.joiningDate) {
      setError(
        "Please select joining date."
      );
      return;
    }


    if (fees <= 0) {
      setError(
        "Please enter valid total fees."
      );
      return;
    }


    if (paid < 0) {
      setError(
        "Paid amount cannot be negative."
      );
      return;
    }


    if (paid > fees) {
      setError(
        "Paid amount cannot be greater than total fees."
      );
      return;
    }


    const balance =
      fees - paid;


    const updatedStudent = {

      ...student,

      name,

      mobile,

      vehicle:
        formData.vehicle,

      licenseType:
        formData.licenseType,

      joiningDate:
        formData.joiningDate,

      fees,

      paid,

      balance,

      status:
        balance === 0
          ? "Paid"
          : "Pending",
    };


    updateStudent(
      student.id,
      updatedStudent
    );


    alert(
      "Student updated successfully ✅"
    );


    navigate("/students");
  };


  const balance =
    Number(formData.fees || 0) -
    Number(formData.paid || 0);


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >

      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
        }}
      >

        {/* BACK */}

        <button
          onClick={() =>
            navigate("/students")
          }
          style={{
            border: "none",
            background: "transparent",
            color: "#2563eb",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "15px",
            marginBottom: "18px",
          }}
        >
          <FaArrowLeft />
          {" "} Back to Students
        </button>


        {/* HEADER */}

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "20px",
            boxShadow:
              "0 8px 25px rgba(15,23,42,.07)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >

            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "15px",
                background: "#dbeafe",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              <FaUserGraduate />
            </div>


            <div>

              <h1
                style={{
                  margin: 0,
                  color: "#172554",
                  fontSize: "28px",
                }}
              >
                Edit Student
              </h1>

              <p
                style={{
                  margin:
                    "5px 0 0",
                  color: "#64748b",
                }}
              >
                Update {student.name}'s
                information
              </p>

            </div>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
              border:
                "1px solid #fecaca",
              fontWeight: "600",
            }}
          >
            ⚠️ {error}
          </div>

        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
        >

          {/* PERSONAL */}

          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "18px",
              marginBottom: "20px",
              boxShadow:
                "0 8px 25px rgba(15,23,42,.07)",
            }}
          >

            <h2
              style={{
                color: "#172554",
                marginTop: 0,
              }}
            >
              👤 Personal Information
            </h2>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              <div>

                <label>
                  Student Name
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <FaUserGraduate
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "22px",
                      color: "#64748b",
                    }}
                  />

                  <input
                    style={{
                      ...inputStyle,
                      paddingLeft: "40px",
                    }}
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter student name"
                  />

                </div>

              </div>


              <div>

                <label>
                  Mobile Number
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <FaPhone
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "22px",
                      color: "#64748b",
                    }}
                  />

                  <input
                    style={{
                      ...inputStyle,
                      paddingLeft: "40px",
                    }}
                    name="mobile"
                    value={
                      formData.mobile
                    }
                    onChange={
                      handleChange
                    }
                    maxLength="10"
                    inputMode="numeric"
                    placeholder="10 digit mobile number"
                  />

                </div>

              </div>


              <div>

                <label>
                  Joining Date
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <FaCalendarAlt
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "22px",
                      color: "#64748b",
                    }}
                  />

                  <input
                    type="date"
                    style={{
                      ...inputStyle,
                      paddingLeft: "40px",
                    }}
                    name="joiningDate"
                    value={
                      formData.joiningDate
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </div>

          </div>


          {/* DRIVING */}

          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "18px",
              marginBottom: "20px",
              boxShadow:
                "0 8px 25px rgba(15,23,42,.07)",
            }}
          >

            <h2
              style={{
                color: "#172554",
                marginTop: 0,
              }}
            >
              🚗 Driving Information
            </h2>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              <div>

                <label>
                  Vehicle
                </label>

                <select
                  style={inputStyle}
                  name="vehicle"
                  value={
                    formData.vehicle
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select Vehicle
                  </option>

                  <option value="Bike">
                    🏍️ Bike
                  </option>

                  <option value="Car">
                    🚗 Car
                  </option>

                  <option value="Bike + Car">
                    🏍️ + 🚗 Bike + Car
                  </option>

                </select>

              </div>


              <div>

                <label>
                  License Type
                </label>

                <select
                  style={inputStyle}
                  name="licenseType"
                  value={
                    formData.licenseType
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="LMV">
                    LMV - Car
                  </option>

                  <option value="MCWG">
                    MCWG - Bike
                  </option>

                  <option value="LMV + MCWG">
                    LMV + MCWG
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* FEES */}

          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "18px",
              marginBottom: "20px",
              boxShadow:
                "0 8px 25px rgba(15,23,42,.07)",
            }}
          >

            <h2
              style={{
                color: "#172554",
                marginTop: 0,
              }}
            >
              💰 Fee Information
            </h2>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              <div>

                <label>
                  Total Fees
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <FaMoneyBillWave
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "22px",
                      color: "#64748b",
                    }}
                  />

                  <input
                    type="number"
                    style={{
                      ...inputStyle,
                      paddingLeft: "40px",
                    }}
                    name="fees"
                    value={
                      formData.fees
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                  />

                </div>

              </div>


              <div>

                <label>
                  Paid Amount
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <FaMoneyBillWave
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "22px",
                      color: "#64748b",
                    }}
                  />

                  <input
                    type="number"
                    style={{
                      ...inputStyle,
                      paddingLeft: "40px",
                    }}
                    name="paid"
                    value={
                      formData.paid
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                  />

                </div>

              </div>

            </div>


            {/* BALANCE */}

            <div
              style={{
                marginTop: "22px",
                padding: "18px 20px",
                borderRadius: "14px",
                background:
                  balance <= 0
                    ? "#f0fdf4"
                    : "#fff7ed",
                border:
                  balance <= 0
                    ? "1px solid #bbf7d0"
                    : "1px solid #fed7aa",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >

              <div>

                <small
                  style={{
                    color: "#64748b",
                  }}
                >
                  Remaining Balance
                </small>

                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    marginTop: "5px",
                    color:
                      balance <= 0
                        ? "#16a34a"
                        : "#ea580c",
                  }}
                >
                  ₹
                  {Math.max(
                    balance,
                    0
                  )}
                </div>

              </div>


              <strong
                style={{
                  color:
                    balance <= 0
                      ? "#16a34a"
                      : "#ea580c",
                }}
              >
                {balance <= 0
                  ? "✓ Fully Paid"
                  : "● Payment Pending"}
              </strong>

            </div>

          </div>


          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent:
                "flex-end",
            }}
          >

            <button
              type="button"
              onClick={() =>
                navigate("/students")
              }
              style={{
                padding:
                  "13px 25px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "10px",
                background: "#ffffff",
                color: "#334155",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>


            <button
              type="submit"
              style={{
                padding:
                  "13px 28px",
                border: "none",
                borderRadius: "10px",
                background:
                  "#2563eb",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems:
                  "center",
                gap: "8px",
              }}
            >
              <FaSave />
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


export default EditStudent;