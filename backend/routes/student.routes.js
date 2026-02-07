const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// Get student by ID
router.get('/:studentId', studentController.getStudentById);

// Get student by email
router.get('/by-email/:email', studentController.getStudentByEmail);

// Get all students with pagination (for admin)
router.get('/', studentController.getAllStudents);

module.exports = router;
