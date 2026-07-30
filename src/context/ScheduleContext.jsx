import { createContext, useState, useEffect } from "react";

export const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem("schedules");
    return saved ? JSON.parse(saved) : [];
  });

  const addSchedule = (schedule) => {
    setSchedules((prev) => [...prev, schedule]);
  };

  const deleteSchedule = (index) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSchedule = (index, updatedSchedule) => {
    setSchedules((prev) =>
      prev.map((schedule, i) =>
        i === index ? updatedSchedule : schedule
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
        deleteSchedule,
        updateSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}