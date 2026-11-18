const express = require("express");
const router = express.Router();

const {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/upload");

router.use(protect);

router.post("/", upload.single("photo"), addTeacher);
router.get("/", getTeachers);
router.put("/:id", upload.single("photo"), updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
