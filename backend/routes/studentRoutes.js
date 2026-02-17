import express from "express";
import Student from "../models/student.js";
import { verifyStudent } from "../middleware/verifyStudent.js";
import { loginStudentController,  studentResult, getResultId} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/result/:id", studentResult);
router.post("/get-result-id", getResultId);
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

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    console.log(student)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: err.message,
    });
  }
});

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

router.post("/login", verifyStudent, loginStudentController);

export default router;
