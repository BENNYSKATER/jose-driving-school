import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import logo from "../assets/logo.png";

export function generateReceipt(student, amount) {
  const doc = new jsPDF();

  const receiptNo = `JDS-${Date.now()}`;

  const totalFees = Number(student.fees || 0);
  const paidNow = Number(amount || 0);
  const totalPaid = Number(student.paid || 0);
  const balance = Number(student.balance || 0);

  const today = new Date().toLocaleDateString("en-IN");

  const img = new Image();
  img.src = logo;

  img.onload = () => {
    // =====================================
    // HEADER
    // =====================================

    doc.addImage(
      img,
      "PNG",
      18,
      14,
      24,
      24
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(25, 55, 100);

    doc.text(
      "JOSE DRIVING SCHOOL",
      50,
      23
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 110, 125);

    doc.text(
      "Driving Training & License Support",
      50,
      30
    );

    // =====================================
    // RECEIPT TITLE
    // =====================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(30, 35, 45);

    doc.text(
      "PAYMENT RECEIPT",
      105,
      55,
      {
        align: "center",
      }
    );

    // =====================================
    // RECEIPT INFO
    // =====================================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 108, 120);

    doc.text(
      `Receipt No: ${receiptNo}`,
      20,
      68
    );

    doc.text(
      `Date: ${today}`,
      190,
      68,
      {
        align: "right",
      }
    );

    // =====================================
    // STUDENT DETAILS
    // =====================================

    autoTable(doc, {
      startY: 78,

      theme: "grid",

      head: [
        [
          "Student Details",
          "Information",
        ],
      ],

      body: [
        [
          "Student Name",
          student.name || "-",
        ],

        [
          "Mobile",
          student.mobile || "-",
        ],

        [
          "Vehicle",
          student.vehicle || "-",
        ],
      ],

      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 6,
        textColor: [
          45,
          50,
          60,
        ],
        lineColor: [
          225,
          228,
          233,
        ],
        lineWidth: 0.3,
      },

      headStyles: {
        fillColor: [
          245,
          247,
          250,
        ],
        textColor: [
          35,
          40,
          50,
        ],
        fontStyle: "bold",
      },

      columnStyles: {
        0: {
          cellWidth: 55,
          fontStyle: "bold",
        },

        1: {
          cellWidth: 115,
        },
      },
    });

    // =====================================
    // PAYMENT DETAILS
    // =====================================

    const paymentStart =
      doc.lastAutoTable.finalY + 12;

    autoTable(doc, {
      startY: paymentStart,

      theme: "grid",

      body: [
        [
          "Total Fees",
          `Rs. ${totalFees.toLocaleString(
            "en-IN"
          )}`,
        ],

        [
          "Paid Now",
          `Rs. ${paidNow.toLocaleString(
            "en-IN"
          )}`,
        ],

        [
          "Total Paid",
          `Rs. ${totalPaid.toLocaleString(
            "en-IN"
          )}`,
        ],

        [
          "Balance",
          `Rs. ${balance.toLocaleString(
            "en-IN"
          )}`,
        ],
      ],

      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 6,
        textColor: [
          45,
          50,
          60,
        ],
        lineColor: [
          225,
          228,
          233,
        ],
        lineWidth: 0.3,
      },

      columnStyles: {
        0: {
          cellWidth: 55,
          fontStyle: "bold",
        },

        1: {
          cellWidth: 115,
          halign: "right",
        },
      },
    });

    // =====================================
    // PAYMENT STATUS
    // =====================================

    const statusY =
      doc.lastAutoTable.finalY + 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    if (balance === 0) {
      doc.setTextColor(
        22,
        130,
        70
      );

      doc.text(
        "Payment Status: PAID",
        20,
        statusY
      );
    } else {
      doc.setTextColor(
        190,
        110,
        20
      );

      doc.text(
        "Payment Status: PENDING",
        20,
        statusY
      );
    }

    // =====================================
    // FOOTER MESSAGE
    // =====================================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(
      100,
      105,
      115
    );

    doc.text(
      "Thank you for choosing Jose Driving School.",
      105,
      250,
      {
        align: "center",
      }
    );

    doc.text(
      "This is a computer-generated receipt.",
      105,
      258,
      {
        align: "center",
      }
    );

    // =====================================
    // FOOTER LINE
    // =====================================

    doc.setDrawColor(
      220,
      223,
      228
    );

    doc.line(
      20,
      270,
      190,
      270
    );

    doc.setFontSize(8);

    doc.setTextColor(
      120,
      125,
      135
    );

    doc.text(
      "JOSE DRIVING SCHOOL",
      20,
      279
    );

    doc.text(
      "Authorized Signature",
      190,
      279,
      {
        align: "right",
      }
    );

    // =====================================
    // DOWNLOAD PDF
    // =====================================

    const safeName = String(
      student.name || "Student"
    ).replace(
      /[^a-z0-9]/gi,
      "_"
    );

    doc.save(
      `${safeName}-Payment-Receipt.pdf`
    );
  };

  // =====================================
  // LOGO ERROR
  // =====================================

  img.onerror = () => {
    console.error(
      "Receipt logo could not be loaded."
    );
  };
}