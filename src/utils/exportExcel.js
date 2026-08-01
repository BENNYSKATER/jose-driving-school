import * as XLSX from "xlsx";

export function exportStudents(students) {
  const data = students.map((student) => ({
    Name: student.name,
    Mobile: student.mobile,
    Vehicle: student.vehicle,
    Fees: student.fees,
    Paid: student.paid,
    Balance: student.balance,
    Status: student.status,
    Classes: student.classesCompleted || 0,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Students"
  );

  XLSX.writeFile(
    workbook,
    "JoseDrivingSchool_Students.xlsx"
  );
}