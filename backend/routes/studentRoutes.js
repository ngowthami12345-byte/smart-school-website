
const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", addStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
