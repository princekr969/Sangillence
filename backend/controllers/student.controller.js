const Student = require('../models/student');

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Only fetch necessary fields to minimize data transfer
    const student = await Student.findOne({ studentId })
      .select('studentId name email photo class school registrationDate olympiadStatus examDate examTime rollNumber subjects performance')
      .lean();

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student data',
      error: error.message
    });
  }
};

// Get student by email (for login)
exports.getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const student = await Student.findOne({ email })
      .select('studentId name email')
      .lean();

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student data',
      error: error.message
    });
  }
};

// Get all students with pagination (for admin)
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional filters
    const filters = {};
    if (req.query.class) filters.class = req.query.class;
    if (req.query.school) filters.school = req.query.school;
    if (req.query.olympiadStatus) filters.olympiadStatus = req.query.olympiadStatus;

    const students = await Student.find(filters)
      .select('studentId name email class school olympiadStatus rollNumber')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Student.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};
