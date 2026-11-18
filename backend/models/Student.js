
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    parentPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
