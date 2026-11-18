const Teacher = require("../models/Teacher");

// Add Teacher
exports.addTeacher = async (req, res) => {
  try {
    const {
      name,
      employeeId,
      subject,
      qualification,
      phone,
      email,
    } = req.body;

    const existingTeacher = await Teacher.findOne({ employeeId });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Employee ID already exists",
      });
    }

    const teacher = await Teacher.create({
      name,
      employeeId,
      subject,
      qualification,
      phone,
      email,
      photo: req.file ? `/uploads/teachers/${req.file.filename}` : "",
    });

    res.status(201).json({
      message: "Teacher added successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = `/uploads/teachers/${req.file.filename}`;
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};