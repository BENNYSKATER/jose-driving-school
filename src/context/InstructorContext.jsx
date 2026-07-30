import { createContext, useState, useEffect } from "react";

export const InstructorContext = createContext();

export function InstructorProvider({ children }) {
  const [instructors, setInstructors] = useState(() => {
    const saved = localStorage.getItem("instructors");
    return saved ? JSON.parse(saved) : [];
  });

  const addInstructor = (instructor) => {
    setInstructors((prev) => [...prev, instructor]);
  };

  const deleteInstructor = (index) => {
    setInstructors((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateInstructor = (index, updatedInstructor) => {
    setInstructors((prev) =>
      prev.map((inst, i) =>
        i === index ? updatedInstructor : inst
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "instructors",
      JSON.stringify(instructors)
    );
  }, [instructors]);

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        addInstructor,
        deleteInstructor,
        updateInstructor,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}