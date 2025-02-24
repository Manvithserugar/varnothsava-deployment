const fetchDetails = require("../services/fetchDetailsService");
const qrCodeService = require("../services/qrCodeService");
const emailService = require("../services/emailService");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const path = require("path");

const handleOfflinePayment = async (req, res) => {
  try {
    const session = req.session;
    const studentId = session.studentId;
    const studentDetails = await fetchDetails.fetchStudentById(studentId);

    await Student.updateOne({ _id: studentId }, { paymentMode: "offline" });

    const qrCodeData = studentId.toString();
    const studentEmail = studentDetails.email;
    const studentUsn = studentDetails.usn;
    console.log(studentUsn);
    console.log(typeof qrCodeData);

    const qrCodeImagePath = path.join(
      "qrCodeImages",
      `qrcode_${studentUsn}.png`
    );
    await qrCodeService.generateQRCodeToFile(qrCodeData, qrCodeImagePath);
    await emailService.sendEmail(
      studentEmail,
      "Subject: Registration Successful",
      `Your registration was successful! Here is your QR code:`,
      qrCodeImagePath
    );
    res.status(200).json({
      message: "QR code data generated and sent to mail successfully",
    });
  } catch (error) {
    console.error("Error in handleOfflinePayment:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

const handleOnlinePayment = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Please upload the payment proof.",
      });
    }

    // Proceed with the rest of the logic
    const session = req.session;
    const studentId = session.studentId;

    const studentDetails = await fetchDetails.fetchStudentById(studentId);
    await Student.updateOne(
      { _id: studentId },
      { paymentMode: "online", uploadedImg: req.file.filname }
    );

    const qrCodeData = studentId.toString();
    const studentEmail = studentDetails.email;
    const studentUsn = studentDetails.usn;
    console.log(studentUsn);
    console.log(typeof qrCodeData);

    const qrCodeImagePath = path.join(
      "qrCodeImages",
      `qrcode_${studentUsn}.png`
    );

    // Generate QR code
    await qrCodeService.generateQRCodeToFile(qrCodeData, qrCodeImagePath);

    // Send email with QR code
    await emailService.sendEmail(
      studentEmail,
      "Subject: Registration Successful",
      `Your registration was successful! Here is your QR code:`,
      qrCodeImagePath
    );

    // Send success response
    res.status(200).json({
      message: "QR code data generated and sent to mail successfully",
    });
  } catch (error) {
    console.error("Error in handleOnlinePayment:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

module.exports = {
  handleOfflinePayment,
  handleOnlinePayment,
};
