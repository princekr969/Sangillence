import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

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

// Helper function to convert ISO date to dd/mm/yyyy format
const formatDateForSheet = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

router.post('/submit', async (req, res) => {
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

        res.status(200).json({ success: true, message: 'Student registration submitted successfully!' });
    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

export default router; 