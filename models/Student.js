const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true },
  college: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
  },
  events: {
    type: [String],
    required: true,
  },
  paymentMode: String,
  uploadedImg: String,
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
