const mongoose = require("mongoose");
const Event = require("../models/Event");
const Student = require("../models/Student");
const { ObjectId } = mongoose.Types;

const fetchStudentById = async (id) => {
  try {
    const student = await Student.findById(id).lean();
    if (!student) {
      console.log("Student not found");
      return null;
    }
    console.log("Student found");
    return student;
  } catch (err) {
    console.error("Error fetching student:", err);
    throw err;
  }
};

const fetchEventsById = async (ids) => {
  try {
    const events = await Event.find({
      _id: { $in: ids.map((id) => ObjectId.createFromHexString(id)) },
    }).lean();
    console.log("Events");
    return events;
  } catch (err) {
    console.error("Error fetching documents:", err);
    throw err;
  }
};

module.exports = {
  fetchEventsById,
  fetchStudentById,
};
