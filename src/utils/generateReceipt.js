import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateReceipt(student, amount) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("JOSE DRIVING SCHOOL", 20, 20);

  doc.setFontSize(12);
  doc.text("PAYMENT RECEIPT", 20, 30);

  autoTable(doc, {
    startY: 40,
    body: [
      ["Student", student.name],
      ["Mobile", student.mobile],
      ["Vehicle", student.vehicle],
      ["Total Fees", `₹${student.fees}`],
      ["Paid Now", `₹${amount}`],
      ["Total Paid", `₹${student.paid + amount}`],
      ["Balance", `₹${student.fees - (student.paid + amount)}`],
      ["Date", new Date().toLocaleDateString()],
    ],
  });
alert("Generating PDF...");
  const pdfBlob = doc.output("blob");
const url = URL.createObjectURL(pdfBlob);

window.open(url);
}