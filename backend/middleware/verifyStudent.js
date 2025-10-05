import Student from "../models/student.js";

export const verifyStudent = async (req, res, next) => {
  try {
    const { fullName, class: studentClass } = req.body;

    // Validate required fields
    if (!fullName || !studentClass) {
      return res.status(400).json({
        success: false,
        message: "fullName and class are required to verify the student.",
      });
    }

    // Check if the student exists in DB
    const existingStudent = await Student.findOne({
      fullName,
      class: studentClass,
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found. Please check your details and try again.",
      });
    }

    // Attach found student to request (optional)
    req.student = existingStudent;
    next(); // Proceed to controller
  } catch (err) {
    console.error("Error verifying student:", err);
    res.status(500).json({
      success: false,
      message: "Error verifying student.",
      error: err.message,
    });
  }
};
