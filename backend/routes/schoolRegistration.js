import express from 'express';
import multer from 'multer';
import { uploadExcelFile } from '../utils/clouldinaryUpload.js';
import { appendToSheet, getSheetData } from '../config/googleSheets.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow Excel files
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Only Excel files are allowed'), false);
        }
    }
});

// Test endpoint that doesn't require Google Sheets
router.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'School registration API is working!',
        timestamp: new Date().toISOString()
    });
});

// POST endpoint to submit school registration
router.post('/submit', upload.single('excelFile'), async (req, res) => {
    try {
        const formData = req.body;
        const excelFile = req.file;

        // Add file information to form data
        if (excelFile) {
            formData.excelFile = {
                originalName: excelFile.originalname,
                size: excelFile.size,
                mimetype: excelFile.mimetype
            };
        }

        // Validate required fields
        const requiredFields = [
            'schoolName',
            'address',
            'city',
            'state',
            'pincode',
            'contactPersonName',
            'email',
            'mobile',
            'schoolType',
            'board'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Validate mobile number (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number must be 10 digits'
            });
        }

        // Validate pincode (6 digits)
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(formData.pincode)) {
            return res.status(400).json({
                success: false,
                message: 'Pincode must be 6 digits'
            });
        }

        // Upload file to Google Drive if provided
        let fileLink = null;
        if (excelFile) {
            console.log('Uploading file to Google Drive...');
            fileLink=await uploadExcelFile(excelFile); 
        }

        // Add the file link to form data
        formData.excelFileLink = fileLink;

        // Append data to Google Sheets
        const result = await appendToSheet(formData);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'School registration submitted successfully!',
                data: {
                    ...result.data,
                    fileUploaded: !!fileLink,
                    fileLink: fileLink
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to submit registration. Please try again.',
                error: result.error
            });
        }

    } catch (error) {
        console.error('Error in school registration:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: error.message
        });
    }
});

// GET endpoint to retrieve all registrations (for admin purposes)
router.get('/registrations', async (req, res) => {
    try {
        const result = await getSheetData();

        if (result.success) {
            res.status(200).json({
                success: true,
                data: result.data,
                message: 'Registrations retrieved successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve registrations',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Error retrieving registrations:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

export default router; 