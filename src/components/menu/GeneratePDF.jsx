import React from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';
import { darkAlert } from '../other/darkAlert';

const GeneratePDF = ({ billItems, calculateTotal, calculateTax, customerName }) => {
  const generatePDF = () => {
    if (customerName === "Nama Pelanggan" || billItems.length === 0) {
      darkAlert({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama pelanggan atau item tagihan kosong!',
      });
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("Nota Pembayaran", 15, 15);

    // Customer Name
    doc.setFontSize(14);
    doc.text(`Nama Pelanggan: ${customerName}`, 15, 25);

    // Table
    const tableColumn = ["Nama Item", "Harga", "Jumlah", "Total"];
    const tableRows = [];

    // Sort items by name
    const sortedBillItems = [...billItems].sort((a, b) => a.name.localeCompare(b.name));

    sortedBillItems.forEach(item => {
      const itemData = [item.name, item.price, item.count, item.price * item.count];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });

    const totalPrice = calculateTotal();
    const tax = calculateTax(totalPrice);
    const grandTotal = totalPrice + tax;

    // Total Price
    doc.text(`Total Harga: ${totalPrice}`, 14, doc.autoTable.previous.finalY + 10);
    // Tax
    doc.text(`Pajak: ${tax}`, 14, doc.autoTable.previous.finalY + 20);
    // Grand Total
    doc.text(`Total Keseluruhan: ${grandTotal}`, 14, doc.autoTable.previous.finalY + 30);

    // Confirmation alert
    darkAlert({
      title: 'Apakah Anda yakin ingin mengunduh nota pembayaran?',
      showDenyButton: true,
      confirmButtonText: `Ya`,
      denyButtonText: `Tidak`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Save the PDF
        doc.save("Nota Pembayaran.pdf");
        darkAlert({ title: 'Unduhan Berhasil!', icon: 'success' })
      } else if (result.isDenied) {
        darkAlert({ title: 'Unduhan Dibatalkan', icon: 'info' })
      }
    });
  };

  return (
    <div className="place_order" onClick={generatePDF}>Payment receipt</div>
  );
};

export default GeneratePDF;
