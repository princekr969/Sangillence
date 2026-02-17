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

   const [day, month, year] = dob.split("/");
  const parsedDob = new Date(Number(year), Number(month) - 1, Number(day)); // JS months are 0-indexed

  // Define start and end of the day
  const startOfDay = new Date(parsedDob);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(parsedDob);
  endOfDay.setHours(23, 59, 59, 999);

  console.log("Searching for student with:", {
    fullName: fullName.trim(),
    class: studentClass.trim().replace("Class ", ""),
    section: section.trim(),
    dob: startOfDay,
    dob1: endOfDay,
  });

  const existingStudent = await Student.findOne({
    fullName: fullName.trim(),
    "class": studentClass.trim().replace("Class ", ""),
    section: section.trim(),
    dob: { $gte: startOfDay, $lte: endOfDay },
  });

    console.log(existingStudent)
   
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found. Please check your details and try again.",
      });
    }
    console.log(existingStudent)

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
