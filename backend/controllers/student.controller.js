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

export const getResultId = async (req, res) => {
  try {
    const { fullName, dob } = req.body;
    console.log("wfwd", req.body);

    if (!fullName || !dob) {
      return res.status(400).json({
        success: false,
        message: "fullName and dob are required to verify the student.",
      });
    }

    const [day, month, year] = dob.split("/");
    const parsedDob = new Date(Number(year), Number(month) - 1, Number(day)); // JS months are 0-indexed
    const startOfDay = new Date(parsedDob);
    const dobString = `${String(startOfDay.getMonth() + 1).padStart(2, '0')}/${String(startOfDay.getDate()).padStart(2, '0')}/${startOfDay.getFullYear()}`;

    console.log("Searching with criteria:", {
      Name: fullName.trim(),
      DOB: dobString,
    });

    let result = await soboResult.findOne({
      Name: fullName.trim(),
      DOB: dobString,
    });


    console.log("Found Result:", result);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found for this student",
        searchCriteria: {
          Name: fullName.trim(),
          DOB: dobString,
        }
      });
    }

    return res.status(200).json({
      success: true,
      result: result,
    });

  }catch (err) {
    console.error("Error in getResultId:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to get result ID",
      error: err.message,
    });
  }
}

export const studentResult = async (req, res) => {
  try {
    const result = await soboResult.findById(req.params.id);
    console.log("Found Result:", result);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found for this student",
      });
    }

    return res.status(200).json({
      success: true,
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

