import express from "express";
import Student from "../models/student.js";
import { verifyStudent } from "../middleware/verifyStudent.js";

const router = express.Router();

// @route   GET /api/students
// @desc    Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: err.message,
    });
  }
});

// @route   POST /api/students
// @desc    Add a new student
router.post("/", async (req, res) => {
  try {
    const { fullName, rollNo, class: studentClass, dob } = req.body;

    if (!fullName || !rollNo || !studentClass || !dob) {
      return res.status(400).json({
        success: false,
        message: "fullName, rollNo, class, and dob are required",
      });
    }

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this roll number already exists",
      });
    }

    const newStudent = await Student.create({
      fullName,
      rollNo,
      class: studentClass,
      dob,
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add student",
      error: err.message,
    });
  }
});

// student Login
router.post("/login", verifyStudent, (req, res) => {
  const { fullName, class: studentClass, dob } = req.body;

  return res.status(200).json({
    success: true,
    message: "Echo successful — student verified and data received back.",
    data: {
      fullName,
      class: studentClass,
      dob,
      student: req.student, // optional, shows full DB record
    },
  });
});

export default router;
