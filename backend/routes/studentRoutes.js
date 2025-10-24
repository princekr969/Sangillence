import express from "express";
import Student from "../models/student.js";
import { verifyStudent } from "../middleware/verifyStudent.js";
import { loginStudentController } from "../controllers/studentVerify.controller.js";

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
    const { schoolName, fullName, rollNo, class: studentClass, dob, section } = req.body;

    if (!schoolName || !fullName || !rollNo || !studentClass || !dob || !section) {
      return res.status(400).json({
        success: false,
        message: "schoolName, fullName, class, dob, and section are required",
      });
    }

    const newStudent = await Student.create({
      schoolName,
      fullName,
      rollNo,
      class: studentClass,
      dob,
      section
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
/*
Example post request
{
  "schoolName": "ABC",
  "fullName": "Jae Doe",
  "class": "7",
  "rollNo": "103",
  "dob": "2010-05-01",
  "section": "A"
}
*/ 
router.post("/login", verifyStudent, loginStudentController);

export default router;
