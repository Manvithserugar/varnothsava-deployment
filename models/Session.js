const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  studentId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now, expires: 3600 }, 
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;