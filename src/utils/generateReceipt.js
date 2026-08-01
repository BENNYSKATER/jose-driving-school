import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import logo from "../assets/logo.png";

export function generateReceipt(student, amount) {
  const doc = new jsPDF();

  const receiptNo = `JDS-${Date.now()}`;

  // Logo
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    doc.addImage(img, "PNG", 15, 10, 25, 25);

    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.text("JOSE DRIVING SCHOOL", 45, 18);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("PAYMENT RECEIPT", 45, 26);

    doc.setFontSize(10);
    doc.text(`Receipt No : ${receiptNo}`, 45, 34);

    autoTable(doc, {
      startY: 50,
      body: [
        ["Student", student.name],
        ["Mobile", student.mobile],
        ["Vehicle", student.vehicle],
        ["Total Fees", `Rs. ${Number(student.fees).toLocaleString("en-IN")}`],
        ["Paid Now", `Rs. ${Number(amount).toLocaleString("en-IN")}`],
        ["Total Paid", `Rs. ${Number(student.paid).toLocaleString("en-IN")}`],
        ["Balance", `Rs. ${Number(student.balance).toLocaleString("en-IN")}`],
        ["Date", new Date().toLocaleDateString()],
      ],
    });

    doc.setFontSize(11);
    doc.text("Thank you for choosing Jose Driving School.", 20, 150);
    doc.text("Authorized Signature", 140, 180);

    doc.save(`${student.name}-Receipt.pdf`);
  };
}