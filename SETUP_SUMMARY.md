# 🎓 School Registration Form - Google Sheets Integration

Your school registration form is now fully connected to Google Sheets! Here's what has been implemented:

## ✨ What's Been Added

### Backend (Node.js/Express)
- **Complete API server** with Google Sheets integration
- **Form validation** and error handling
- **File upload support** for Excel files
- **CORS configuration** for frontend integration
- **Environment-based configuration**

### Frontend Updates
- **API integration** in the SchoolForm component
- **File upload handling** with validation
- **Loading states** and success/error messages
- **Form reset** after successful submission

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
cd backend
./quick-start.sh
```

### Option 2: Manual Setup
```bash
cd backend
npm install
node setup-google-sheets.js
npm run dev
```

## 📋 Google Sheets Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Sheets API

### 2. Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Create Service Account
3. Download JSON key file

### 3. Set Up Google Sheet
1. Create a new Google Sheet
2. Add these headers in Row 1:
   ```
   Timestamp | School Name | Address | City | State | Pincode | Contact Person Name | Designation | Email | Mobile | School Type | Medium | Board | Student Strength | Requirements | Excel File Uploaded
   ```
3. Share with your service account email (Editor permissions)

### 4. Configure Environment
The setup script will help you create the `.env` file with all necessary credentials.

## 🔧 API Endpoints

- **POST** `/api/school/submit` - Submit registration form
- **GET** `/api/school/registrations` - Get all registrations (admin)
- **GET** `/health` - Health check

## 📁 Project Structure

```
backend/
├── config/
│   └── googleSheets.js      # Google Sheets API configuration
├── routes/
│   └── schoolRegistration.js # API routes
├── server.js                # Main server file
├── package.json             # Dependencies
├── setup-google-sheets.js   # Setup helper
├── quick-start.sh          # Automated setup
└── README.md               # Detailed documentation

src/components/RegistrationForm/
└── SchoolForm.jsx          # Updated with API integration
```

## 🎯 Features

### ✅ Form Validation
- Required field validation
- Email format validation
- Mobile number validation (10 digits)
- Pincode validation (6 digits)
- File type and size validation

### ✅ File Upload
- Excel file support (.xls, .xlsx)
- 5MB file size limit
- File validation and error handling

### ✅ User Experience
- Loading states during submission
- Success/error messages
- Form reset after successful submission
- File upload confirmation

### ✅ Data Storage
- All form data stored in Google Sheets
- Timestamp for each submission
- Excel file upload indicator
- Structured data format

## 🔒 Security Features

- Environment variable configuration
- CORS protection
- File upload validation
- Input sanitization
- Error handling without exposing sensitive data

## 🧪 Testing

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Test the form submission with sample data

4. Check your Google Sheet for new entries

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check CORS configuration in server.js

2. **Google Sheets API Errors**
   - Verify service account credentials
   - Check spreadsheet sharing permissions
   - Ensure Google Sheets API is enabled

3. **File Upload Issues**
   - Check file size (max 5MB)
   - Verify file type (.xls, .xlsx)
   - Check network connection

### Debug Mode
Set `NODE_ENV=development` in your `.env` file for detailed error logs.

## 📞 Support

If you encounter any issues:

1. Check the backend console for error messages
2. Verify all environment variables are set correctly
3. Ensure Google Sheets API is properly configured
4. Check the README.md in the backend folder for detailed instructions

## 🎉 Next Steps

Your school registration form is now fully functional! You can:

1. **Customize the form** - Add more fields as needed
2. **Style the UI** - Modify the design to match your brand
3. **Add authentication** - Implement user login for admin access
4. **Deploy to production** - Set up hosting for both frontend and backend
5. **Add analytics** - Track form submissions and user behavior

---

**Happy coding! 🚀** 