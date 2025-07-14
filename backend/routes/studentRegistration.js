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

router.post('/submit', async (req, res) => {
    try {
        const { name, class: studentClass, mobile, email } = req.body;

        // Validation
        if (!name || !studentClass || !mobile || !email) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Append to Google Sheet
        const values = [
            [new Date().toISOString(), name, studentClass, mobile, email]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: STUDENT_SPREADSHEET_ID,
            range: 'Sheet1!A:E',
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