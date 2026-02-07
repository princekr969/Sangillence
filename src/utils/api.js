// API base URL - update this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Student API functions
export const studentAPI = {
  // Get student by ID
  getById: async (studentId) => {
    return apiCall(`/students/${studentId}`);
  },

  // Get student by email
  getByEmail: async (email) => {
    return apiCall(`/students/by-email/${email}`);
  },

  // Get all students with pagination (admin only)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/students?${queryString}`);
  },
};

export default apiCall;
