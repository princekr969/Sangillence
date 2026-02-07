import { studentAPI } from '../utils/api';

// Single mock student data matching login form structure
// This will be replaced with actual DB data later
export const mockStudentData = {
  // Student identification
  _id: "mock_student_123",
  fullName: "RAHUL KUMAR",
  school: "school_a", // PM SHRI KENDRIYA VIDYALAYA NUMBER-1 GWALIOR
  dob: "15/05/2010",
  rollNo: "2025001",
  class: "Class 8",
  section: "A",
  
  // Additional data for dashboard
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  email: "rahul.kumar@example.com",
  registrationDate: "2025-01-20",
  olympiadStatus: "Registered",
  examDate: "2025-03-20",
  examTime: "10:00 AM",
  rollNumber: "SOBO2025001",
  subjects: ["Mathematics", "Science", "English"],
  performance: {
    practiceTests: 3,
    averageScore: 75,
    rank: 156
  }
};

// Map school codes to full names
export const schoolNames = {
  "school_a": "PM SHRI KENDRIYA VIDYALAYA NUMBER-1 GWALIOR",
  "school_b": "PM SHRI KENDRIYA VIDYALAYA NUMBER-2, AFS, GWALIOR",
  "school_c": "PM SHRI KENDRIYA VIDYALAYA NUMBER-4, GWALIOR",
  "school_d": "PM SHRI KENDRIYA VIDYALAYA NUMBER-5, GWALIOR",
  "school_e": "PM SHRI KENDRIYA VIDYALAYA NUMBER-1 AFS CHAKERI, KANPUR",
  "school_f": "PM SHRI KENDRIYA VIDYALAYA NUMBER-1, SURAT",
  "school_g": "ARMY PUBLIC SCHOOL, GWALIOR"
};

// Function to verify login credentials
export const verifyLogin = (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if credentials match mock data
      if (
        formData.fullName.toUpperCase().trim() === mockStudentData.fullName &&
        formData.school === mockStudentData.school &&
        formData.dob === mockStudentData.dob &&
        formData.rollNo === mockStudentData.rollNo &&
        formData.class === mockStudentData.class &&
        formData.section === mockStudentData.section
      ) {
        resolve({
          success: true,
          data: {
            student: mockStudentData
          }
        });
      } else {
        reject(new Error('Invalid credentials. Please check your details.'));
      }
    }, 500);
  });
};

// Function to fetch student data by ID
export const fetchStudentData = async (studentId) => {
  try {
    // Try to fetch from real API first (silently fail if unavailable)
    const response = await studentAPI.getById(studentId);
    return response.data;
  } catch (error) {
    // Silently fall back to mock data if API fails
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (studentId === mockStudentData._id) {
          resolve(mockStudentData);
        } else {
          reject(new Error('Student not found'));
        }
      }, 500);
    });
  }
};
