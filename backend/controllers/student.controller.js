import Student from "../models/student.js";
import soboResult from "../models/soboResult.js";

// controllers/studentController.js
export const loginStudentController = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Echo successful — student verified and data received back.",
    data: {
      student: req.student, 
    },
  });
}

export const studentResult = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    console.log("Student:", student);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const dob = new Date(student.dob);
    const dobString = `${String(dob.getMonth() + 1).padStart(2, '0')}/${String(dob.getDate()).padStart(2, '0')}/${dob.getFullYear()}`;
    
    console.log("Searching with criteria:", {
      Name: student.fullName.trim(),
      School: student.school,
      Class: Number(student.class),
      Section: student.section.trim().toUpperCase(),
      DOB: dobString,
    });

    let result = await soboResult.findOne({
      Name: student.fullName.trim(),
      School: student.school.toUpperCase(), 
      Class: Number(student.class),   
      Section: student.section.trim().toUpperCase(),
      DOB: dobString,
    });

    console.log("Found Result:", result);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found for this student",
        searchCriteria: {
          Name: student.fullName.trim(),
          Class: student.class,
          Section: student.section,
          DOB: dobString,
          School: student.school
        }
      });
    }

    return res.status(200).json({
      success: true,
      student: student,
      result: result,
    });

  } catch (err) {
    console.error("Error fetching student result:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student result",
      error: err.message,
    });
  }
};

