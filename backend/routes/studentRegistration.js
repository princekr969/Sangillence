import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { sendStudentConfirmationEmail, sendSchoolNotificationEmail } from '../utils/emailService.js';
import { blockOmanForStudentRegistrationV2 } from '../middleware/ipRestriction.js';

dotenv.config();

const router = express.Router();

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const STUDENT_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_STUDENT_SPREADSHEET_ID;

// Test endpoint to check IP and country detection
router.get('/test-ip', async (req, res) => {
    try {
        const getClientIP = (req) => {
            return req.headers['x-forwarded-for'] ||
                req.headers['x-real-ip'] ||
                req.connection?.remoteAddress ||
                req.socket?.remoteAddress ||
                req.ip ||
                '127.0.0.1';
        };

        const clientIP = getClientIP(req);

        // Skip for localhost/development
        if (clientIP === '127.0.0.1' || clientIP === '::1' || clientIP === '::ffff:127.0.0.1') {
            return res.status(200).json({
                success: true,
                message: 'Development mode - IP detection bypassed',
                ip: clientIP,
                country: 'Development',
                studentRegistrationAvailable: true
            });
        }

        // Get country from IP
        const response = await fetch(`https://ipapi.co/${clientIP}/country_code/`);
        const countryCode = await response.text();

        res.status(200).json({
            success: true,
            message: 'IP and country detection working',
            ip: clientIP,
            country: countryCode.trim(),
            studentRegistrationAvailable: countryCode.trim() !== 'OM'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error detecting IP/country',
            error: error.message
        });
    }
});

// Helper function to convert ISO date to dd/mm/yyyy format
const formatDateForSheet = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

router.post('/submit', blockOmanForStudentRegistrationV2, async (req, res) => {
    try {
        const { fullName, dob, email, class: studentClass, mobile, schoolEmail } = req.body;

        // Validation
        if (!fullName || !dob || !email || !studentClass || !mobile || !schoolEmail) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || !emailRegex.test(schoolEmail)) {
            return res.status(400).json({ success: false, message: 'Please provide valid email addresses.' });
        }

        // Validate mobile number (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
        }

        // Validate date format (YYYY-MM-DD from HTML date input)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dob)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid date of birth.' });
        }

        // Convert date to dd/mm/yyyy format for Google Sheet
        const formattedDob = formatDateForSheet(dob);

        // Append to Google Sheet
        const values = [
            [new Date().toISOString(), fullName, formattedDob, email, studentClass, mobile, schoolEmail]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: STUDENT_SPREADSHEET_ID,
            range: 'Sheet1!A:G',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: { values },
        });

        // Send confirmation emails
        const studentData = {
            fullName,
            dob: formattedDob,
            email,
            class: studentClass,
            mobile,
            schoolEmail
        };

        // Send confirmation email to student
        const studentEmailResult = await sendStudentConfirmationEmail(studentData);

        // Send notification email to school
        const schoolEmailResult = await sendSchoolNotificationEmail(studentData);

        // Log email results
        if (!studentEmailResult.success) {
            console.error('Failed to send student confirmation email:', studentEmailResult.error);
        }
        if (!schoolEmailResult.success) {
            console.error('Failed to send school notification email:', schoolEmailResult.error);
        }

        res.status(200).json({
            success: true,
            message: 'Student registration submitted successfully! Confirmation emails have been sent.',
            emailStatus: {
                studentEmail: studentEmailResult.success ? 'sent' : 'failed',
                schoolEmail: schoolEmailResult.success ? 'sent' : 'failed'
            }
        });
    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

export default router; 