// PDFKit logic for receiptsconst PDFDocument = require('pdfkit');
const fs = require('fs');

const generateReceipt = (ride, path) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path));

  doc.fontSize(20).text('Bossie Ride Receipt', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Rider ID: ${ride.riderId}`);
  doc.text(`Driver ID: ${ride.driverId}`);
  doc.text(`Pickup: ${ride.pickup}`);
  doc.text(`Destination: ${ride.destination}`);
  doc.text(`Fare: KES ${ride.fare}`);
  doc.text(`Status: ${ride.status}`);
  doc.text(`Date: ${new Date(ride.timestamp).toLocaleString()}`);

  doc.end();
};

module.exports = generateReceipt;

