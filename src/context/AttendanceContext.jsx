import { createContext, useState, useEffect } from "react";

export const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : [];
  });

  const addAttendance = (record) => {
    setAttendance((prev) => [...prev, record]);
  };

  const deleteAttendance = (index) => {
    setAttendance((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        addAttendance,
        deleteAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}