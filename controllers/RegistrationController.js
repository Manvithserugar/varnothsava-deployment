const mongoose = require("mongoose");
const Student = require("../models/Student");
const Event = require("../models/Event");
const Session = require("../models/Session");
const { v4: uuidv4 } = require("uuid");

const registerStudent = async (req, res) => {
  try {
    const studentData = req.body;
    console.log("Student data received:", studentData);
    const student = await Student.create(studentData);
    console.log("Student inserted successfully:", student);

    const sessionId = uuidv4();
    await Session.create({ sessionId, studentId: student._id });
    console.log("Session created successfully:", sessionId);

    res
      .status(200)
      .cookie("sessionId", sessionId, {
        httpOnly: true,
        // secure: true,
        maxAge: 3600000,
      })
      .json({ message: "Student registered successfully", sessionId });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({
      error:
        "An error occurred while registering the student. Please try again.",
    });
  }
};
module.exports = {
  registerStudent,
};
