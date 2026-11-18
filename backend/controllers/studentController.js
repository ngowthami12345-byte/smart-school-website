
const Student = require("../models/Student");

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const {
      name,
      admissionNumber,
      className,
      parentName,
      parentPhone,
      address,
    } = req.body;

    const existingStudent = await Student.findOne({ admissionNumber });

    if (existingStudent) {
      return res.status(400).json({
        message: "Admission number already exists",
      });
    }

    const student = await Student.create({
      name,
      admissionNumber,
      className,
      parentName,
      parentPhone,
      address,
    });

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
