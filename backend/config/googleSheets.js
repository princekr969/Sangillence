import { google } from 'googleapis';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

// Configure Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`
    },
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
    ],
});

const sheets = google.sheets({ version: 'v4', auth });
const drive = google.drive({ version: 'v3', auth });

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// Function to upload file to Google Drive
export const uploadFileToDrive = async (file, schoolName) => {
    try {
        const fileName = `${schoolName}_${new Date().toISOString().split('T')[0]}_${file.originalname}`;

        const fileMetadata = {
            name: fileName,
            parents: [], // Upload to root folder
            mimeType: file.mimetype,
        };

        const media = {
            mimeType: file.mimetype,
            body: Readable.from(file.buffer),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id,webViewLink,webContentLink',
        });

        // Make the file publicly accessible
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        return {
            success: true,
            fileId: response.data.id,
            webViewLink: response.data.webViewLink,
            webContentLink: response.data.webContentLink,
            fileName: fileName
        };
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Function to append data to Google Sheets
export const appendToSheet = async (data) => {
    try {
        const values = [
            [
                new Date().toISOString(), // Timestamp
                data.schoolName,
                data.address,
                data.city,
                data.state,
                data.pincode,
                data.contactPersonName,
                data.designation,
                data.email,
                data.mobile,
                data.schoolType,
                data.medium,
                data.board,
                data.studentStrength,
                data.requirements,
                data.excelFileLink || 'No file uploaded' // Excel file link from Google Drive
            ]
        ];

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:P', // Adjust range based on your sheet structure
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: values,
            },
        });

        return {
            success: true,
            data: response.data,
            message: 'Data successfully added to Google Sheets'
        };
    } catch (error) {
        console.error('Error appending to Google Sheets:', error);
        return {
            success: false,
            error: error.message,
            message: 'Failed to add data to Google Sheets'
        };
    }
};

// Function to get all data from Google Sheets
export const getSheetData = async () => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:P', // Adjust range based on your sheet structure
        });

        return {
            success: true,
            data: response.data.values,
            message: 'Data successfully retrieved from Google Sheets'
        };
    } catch (error) {
        console.error('Error getting data from Google Sheets:', error);
        return {
            success: false,
            error: error.message,
            message: 'Failed to get data from Google Sheets'
        };
    }
};

export default sheets; 