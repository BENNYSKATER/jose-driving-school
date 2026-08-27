import { createContext, useEffect, useState } from "react";

export const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  const [attendances, setAttendances] = useState(() => {
    try {
      const saved = localStorage.getItem("jds_attendances");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;
    } catch (error) {
      console.error("Attendance loading error:", error);
      return [];
    }
  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "jds_attendances",
      JSON.stringify(attendances)
    );
  }, [attendances]);

  // ADD ATTENDANCE
  const addAttendance = (attendance) => {
    const newAttendance = {
      ...attendance,
      id:
        attendance.id ||
        `attendance-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`,
    };

    setAttendances((prev) => [
      ...prev,
      newAttendance,
    ]);
  };

  // UPDATE ATTENDANCE
  const updateAttendance = (id, updatedData) => {
    setAttendances((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              ...updatedData,
              id: item.id,
            }
          : item
      )
    );
  };

  // DELETE ATTENDANCE
  const deleteAttendance = (id) => {
    setAttendances((prev) =>
      prev.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendances,
        addAttendance,
        updateAttendance,
        deleteAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}