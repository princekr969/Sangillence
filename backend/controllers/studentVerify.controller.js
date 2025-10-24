// controllers/studentController.js
export const loginStudentController = (req, res) => {
  console.log("recieved request: ", req.body);
  const { fullName, class: studentClass, dob } = req.body;
  console.log(req.student)

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
}