import { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const deleteStudent = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };
  const updateStudent = (index, updatedStudent) => {
  setStudents((prev) =>
    prev.map((student, i) =>
      i === index ? updatedStudent : student
    )
  );
};

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <StudentContext.Provider
      value={{
  students,
  addStudent,
  deleteStudent,
  updateStudent,
}}
        
    >
      {children}
    </StudentContext.Provider>
  );
}