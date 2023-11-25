import React from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = ({ billItems, calculateTotal, calculateTax }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("Nota Pembayaran", 15, 15);

    // Table
    const tableColumn = ["Nama Item", "Harga", "Jumlah", "Total"];
    const tableRows = [];

    // Sort items by name
    const sortedBillItems = [...billItems].sort((a, b) => a.name.localeCompare(b.name));

    sortedBillItems.forEach(item => {
      const itemData = [item.name, item.price, item.count, item.price * item.count];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    const totalPrice = calculateTotal();
    const tax = calculateTax(totalPrice);
    const grandTotal = totalPrice + tax;

    // Total Price
    doc.text(`Total Harga: ${totalPrice}`, 14, doc.autoTable.previous.finalY + 10);
    // Tax
    doc.text(`Pajak: ${tax}`, 14, doc.autoTable.previous.finalY + 20);
    // Grand Total
    doc.text(`Total Keseluruhan: ${grandTotal}`, 14, doc.autoTable.previous.finalY + 30);

    // Save the PDF
    doc.save("Nota Pembayaran.pdf");
  };

  return (
    <div className="place_order" onClick={generatePDF}>Payment receipt</div>
  );
};

export default GeneratePDF;
