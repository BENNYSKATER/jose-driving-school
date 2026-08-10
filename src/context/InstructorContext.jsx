import { createContext, useEffect, useState } from "react";

export const InstructorContext = createContext();

export function InstructorProvider({ children }) {
  const [instructors, setInstructors] = useState(() => {
    try {
      const saved = localStorage.getItem("jds_instructors");

      if (!saved) return [];

      const data = JSON.parse(saved);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error loading instructors:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "jds_instructors",
        JSON.stringify(instructors)
      );
    } catch (error) {
      console.error("Error saving instructors:", error);
    }
  }, [instructors]);

  const addInstructor = (instructor) => {
    setInstructors((prev) => [...prev, instructor]);
  };

  const updateInstructor = (id, updatedData) => {
    setInstructors((prev) =>
      prev.map((instructor) =>
        String(instructor.id) === String(id)
          ? { ...instructor, ...updatedData }
          : instructor
      )
    );
  };

  const deleteInstructor = (id) => {
    setInstructors((prev) =>
      prev.filter(
        (instructor) =>
          String(instructor.id) !== String(id)
      )
    );
  };

  const getInstructorById = (id) => {
    return instructors.find(
      (instructor) =>
        String(instructor.id) === String(id)
    );
  };

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        addInstructor,
        updateInstructor,
        deleteInstructor,
        getInstructorById,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}

export default InstructorProvider;