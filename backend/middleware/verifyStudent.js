import Student from "../models/student.js";

export const verifyStudent = async (req, res, next) => {
  try {
    const { fullName, class: studentClass, section, dob } = req.body;

    // Validate required fields
    if (!fullName || !studentClass || !section || !dob) {
      return res.status(400).json({
        success: false,
        message: "fullName, class, section, and dob are required to verify the student.",
      });
    }

    // Convert DOB string to Date (important for matching)
    const parsedDob = new Date(dob);

    // Check if the student exists in DB
    const existingStudent = await Student.findOne({
      fullName: fullName.trim(),
      class: studentClass.trim(),
      section: section.trim(),
      dob: parsedDob,
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found. Please check your details and try again.",
      });
    }

    // Attach found student to request for use in controller
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
