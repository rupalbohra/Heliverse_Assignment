const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'sclass', required: true },
  day: { type: String, required: true }, // e.g., "Monday"
  timeSlot: { type: String, required: true } // e.g., "9-10 AM"
});

const Timetable = mongoose.model('Timetable', timeTableSchema);

module.exports = Timetable;
