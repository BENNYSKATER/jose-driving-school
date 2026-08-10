import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem("jds_students");

      if (!savedStudents) {
        return [];
      }

      const data = JSON.parse(savedStudents);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error loading students:", error);
      return [];
    }
  });

  // =========================
  // SAVE STUDENTS
  // =========================

  useEffect(() => {
    try {
      localStorage.setItem(
        "jds_students",
        JSON.stringify(students)
      );
    } catch (error) {
      console.error("Error saving students:", error);
    }
  }, [students]);

  // =========================
  // ADD STUDENT
  // =========================

  const addStudent = (student) => {
    const newStudent = {
      ...student,

      id: student.id || Date.now(),

      name: student.name || "",
      mobile: student.mobile || "",

      vehicle: student.vehicle || "",
      licenseType: student.licenseType || "LMV",

      joiningDate: student.joiningDate || "",

      fees: Number(student.fees || 0),
      paid: Number(student.paid || 0),

      balance: Number(
        student.balance ??
          Math.max(
            Number(student.fees || 0) -
              Number(student.paid || 0),
            0
          )
      ),

      status:
        Number(
          student.balance ??
            Number(student.fees || 0) -
              Number(student.paid || 0)
        ) <= 0
          ? "Paid"
          : "Pending",

      practiceClasses: Number(
        student.practiceClasses || 0
      ),

      paymentHistory:
        Array.isArray(student.paymentHistory)
          ? student.paymentHistory
          : [],

      photo: student.photo || null,
    };

    setStudents((prevStudents) => [
      ...prevStudents,
      newStudent,
    ]);
  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = (
    studentId,
    updatedData
  ) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (
          String(student.id) ===
          String(studentId)
        ) {
          return {
            ...student,
            ...updatedData,
          };
        }

        return student;
      });
    });
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = (studentId) => {
    setStudents((prevStudents) => {
      return prevStudents.filter(
        (student) =>
          String(student.id) !==
          String(studentId)
      );
    });
  };

  // =========================
  // GET STUDENT BY ID
  // =========================

  const getStudentById = (studentId) => {
    return students.find(
      (student) =>
        String(student.id) ===
        String(studentId)
    );
  };

  // =========================
  // ADD PRACTICE CLASS
  // =========================

  const addPracticeClass = (
    studentId
  ) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (
          String(student.id) ===
          String(studentId)
        ) {
          return {
            ...student,

            practiceClasses:
              Number(
                student.practiceClasses || 0
              ) + 1,
          };
        }

        return student;
      });
    });
  };

  // =========================
  // ADD PAYMENT
  // =========================

  const addPayment = (
    studentId,
    amount
  ) => {
    const paymentAmount = Number(amount);

    if (
      !paymentAmount ||
      paymentAmount <= 0
    ) {
      return false;
    }

    let paymentAdded = false;

    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (
          String(student.id) !==
          String(studentId)
        ) {
          return student;
        }

        const totalFees = Number(
          student.fees || 0
        );

        const currentPaid = Number(
          student.paid || 0
        );

        const currentBalance = Math.max(
          totalFees - currentPaid,
          0
        );

        if (
          paymentAmount >
          currentBalance
        ) {
          return student;
        }

        const newPaid =
          currentPaid +
          paymentAmount;

        const newBalance = Math.max(
          totalFees - newPaid,
          0
        );

        paymentAdded = true;

        return {
          ...student,

          paid: newPaid,

          balance: newBalance,

          status:
            newBalance === 0
              ? "Paid"
              : "Pending",

          paymentHistory: [
            ...(student.paymentHistory || []),

            {
              amount: paymentAmount,

              date:
                new Date().toLocaleDateString(),
            },
          ],
        };
      });
    });

    return paymentAdded;
  };

  // =========================
  // MARK STUDENT PAID
  // =========================

  const markStudentPaid = (
    studentId
  ) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (
          String(student.id) ===
          String(studentId)
        ) {
          const totalFees = Number(
            student.fees || 0
          );

          const currentPaid = Number(
            student.paid || 0
          );

          const balance = Math.max(
            totalFees - currentPaid,
            0
          );

          if (balance === 0) {
            return {
              ...student,

              paid: totalFees,

              balance: 0,

              status: "Paid",
            };
          }

          return {
            ...student,

            paid: totalFees,

            balance: 0,

            status: "Paid",

            paymentHistory: [
              ...(student.paymentHistory || []),

              {
                amount: balance,

                date:
                  new Date().toLocaleDateString(),
              },
            ],
          };
        }

        return student;
      });
    });
  };

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    students,

    addStudent,

    updateStudent,

    deleteStudent,

    getStudentById,

    addPracticeClass,

    addPayment,

    markStudentPaid,
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export default StudentProvider;