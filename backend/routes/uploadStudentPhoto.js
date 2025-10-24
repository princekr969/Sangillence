import express from "express";
import multer from "multer";
import { uploadImage } from "../utils/clouldinaryUpload.js";
import Student from "../models/student.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // front camera sends blob in memory

router.post("/upload-student-image/:studentId", upload.single("photo"), async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId);
    console.log("1dfrhgrefgh",student)
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    const url = await uploadImage(req.file);

    student.imageUrl = url;  // Only update the image
    await student.save();

    res.json({ success: true, imageUrl: url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
});



export default router;