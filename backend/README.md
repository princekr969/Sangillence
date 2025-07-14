# School Registration Backend

This backend service handles school registration form submissions and stores the data in Google Sheets.

## Features

- ✅ School registration form API
- ✅ Google Sheets integration
- ✅ File upload support (Excel files)
- ✅ Form validation
- ✅ CORS support for frontend integration
- ✅ Error handling and logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Google Sheets API Setup

#### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Step 2: Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

#### Step 3: Generate Service Account Key
1. Click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Download the JSON file

#### Step 4: Set Up Google Sheet
1. Create a new Google Sheet
2. Share it with your service account email (found in the JSON file)
3. Give it "Editor" permissions
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

#### Step 5: Configure Headers
Add these headers to your Google Sheet (Row 1):
```
Timestamp | School Name | Address | City | State | Pincode | Contact Person Name | Designation | Email | Mobile | School Type | Medium | Board | Student Strength | Requirements | Excel File Uploaded
```

### 3. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   # Google Sheets API Configuration
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
   GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id-here"

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

3. Update the Google Sheets configuration in `config/googleSheets.js`:
   - Replace `your-project-id` with your actual project ID
   - Replace `your-private-key-id` with your actual private key ID
   - Replace `your-client-id` with your actual client ID

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST `/api/school/submit`
Submit a school registration form.

**Request Body (multipart/form-data):**
- `schoolName` (required): School name
- `address` (required): School address
- `city` (required): City
- `state` (required): State
- `pincode` (required): 6-digit pincode
- `contactPersonName` (required): Contact person name
- `designation` (required): Contact person designation
- `email` (required): Contact person email
- `mobile` (required): 10-digit mobile number
- `schoolType` (required): Type of school
- `board` (required): Board of education
- `studentStrength` (optional): Number of students
- `requirements` (optional): Additional requirements
- `excelFile` (optional): Excel file upload

**Response:**
```json
{
  "success": true,
  "message": "School registration submitted successfully!",
  "data": { ... }
}
```

### GET `/api/school/registrations`
Retrieve all school registrations (for admin purposes).

**Response:**
```json
{
  "success": true,
  "data": [
    ["2024-01-01T10:00:00.000Z", "School Name", "Address", ...],
    ...
  ],
  "message": "Registrations retrieved successfully"
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T10:00:00.000Z"
}
```

## Frontend Integration

The frontend should send requests to:
- Development: `http://localhost:5000/api/school/submit`
- Production: `https://your-domain.com/api/school/submit`

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid email format
- Invalid mobile number format
- Invalid pincode format
- File upload errors
- Google Sheets API errors

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **CORS**: Configure CORS origins for production
3. **File Upload**: Validate file types and sizes
4. **Rate Limiting**: Consider implementing rate limiting for production
5. **Authentication**: Consider adding authentication for admin endpoints

## Troubleshooting

### Common Issues

1. **"Invalid private key" error**
   - Make sure the private key in `.env` includes `\n` for line breaks
   - Verify the key is correctly copied from the JSON file

2. **"Permission denied" error**
   - Ensure the service account has access to the Google Sheet
   - Check that the sheet is shared with the service account email

3. **"Spreadsheet not found" error**
   - Verify the spreadsheet ID is correct
   - Ensure the spreadsheet exists and is accessible

4. **CORS errors**
   - Check that the frontend origin is included in the CORS configuration
   - Verify the backend is running on the correct port

### Debug Mode

To enable debug logging, set `NODE_ENV=development` in your `.env` file.

## Support

For issues or questions, please check the error logs and ensure all setup steps have been completed correctly. 