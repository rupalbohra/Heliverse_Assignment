const mongoose = require("mongoose");

// Sub-schema for questions and answers
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
});

const assignmentSchema = new mongoose.Schema({
  teacherEmail: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema], // Array of questions and answers
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
