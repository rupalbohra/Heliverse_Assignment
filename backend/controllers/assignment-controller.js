const Assignment = require("../models/assignmentSchema");

const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    const result = await assignment.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAssignmentsByClassAndSubject = async (req, res) => {
  const { class: className, subject } = req.params;
  try {
    const assignments = await Assignment.find({ className, subject });
    res.send(assignments);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createAssignment, getAssignmentsByClassAndSubject };
