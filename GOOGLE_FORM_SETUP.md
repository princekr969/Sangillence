# Google Form Integration Setup

## Overview
After students log in through the Sangillence platform, they are redirected to a Google Form that is embedded within the platform. The form is pre-filled with the student's information.

## Current Flow
1. Student logs in via `/studentLogin` page
2. After successful authentication, student is redirected to `/sobo/{schoolId}/EXAM_PAGE`
3. The exam page displays the Google Form in an iframe with pre-filled data

## Google Form Configuration

### Current Form URL
```
https://docs.google.com/forms/d/e/1FAIpQLSd7K-ZDRYmOs-7Asi62USUmetvdn88Pn-0DqN_HGao9mVuUtQ/viewform
```

### Form Fields
- School Name (text)
- Student Name (text)
- Class (dropdown: 3, 4, 5, 6, 7, 8, 9, 10)
- Section (dropdown: A, B, C, D, E, F)
- Roll no (text)
- Date of Birth (date)

## Getting Correct Entry IDs

To ensure the form fields are properly pre-filled, you need to get the correct entry IDs from your Google Form:

### Steps:
1. Open your Google Form in edit mode
2. Click the three dots menu (⋮) in the top right
3. Select "Get pre-filled link"
4. Fill in sample values for each field:
   - School Name: "Test School"
   - Student Name: "John Doe"
   - Class: "5"
   - Section: "A"
   - Roll no: "123"
   - Date of Birth: "01/01/2010"
5. Click "Get link"
6. Copy the generated URL
7. Extract the entry IDs from the URL (they look like `entry.1234567890`)

### Example Generated URL:
```
https://docs.google.com/forms/d/e/1FAIpQLSd7K-ZDRYmOs-7Asi62USUmetvdn88Pn-0DqN_HGao9mVuUtQ/viewform?entry.1061894325=Test+School&entry.166164457=John+Doe&entry.2089310622=5&entry.866716400=A&entry.1918702461=123&entry.1794705777=2010-01-01
```

### Current Entry IDs (Verified ✅)
The entry IDs are already correctly configured in `/src/pages/SoboExamPage.jsx`:

```javascript
const GOOGLE_ENTRY_IDS = {
  schoolName: 'entry.1061894325',        // School Name ✅
  studentName: 'entry.166164457',        // Student Name ✅
  class: 'entry.2089310622',            // Class (dropdown) ✅
  section: 'entry.866716400',           // Section (dropdown) ✅
  rollNo: 'entry.1918702461',           // Roll No ✅
  dateOfBirth: 'entry.1794705777',      // Date of Birth ✅
}
```

**Status**: All entry IDs have been verified and are working correctly with the Google Form.

## Testing the Integration

1. Start the development server: `npm run dev`
2. Navigate to `/studentLogin`
3. Fill in student details and submit
4. Verify that you're redirected to the exam page
5. Check that the Google Form loads with pre-filled data
6. If fields are not pre-filled, check the browser console for debug logs

## Troubleshooting

### Form Fields Not Pre-filled
- Verify the entry IDs are correct
- Check browser console for debug logs
- Ensure the Google Form allows pre-filling (some forms may have restrictions)

### Form Not Loading
- Check if the Google Form URL is accessible
- Verify the form's sharing settings allow public access
- Check for any CORS issues in the browser console

### Date Format Issues
- The system converts DD/MM/YYYY to YYYY-MM-DD for Google Forms
- Ensure your Google Form date field accepts this format

## Security Considerations

- The Google Form should be configured to accept submissions from your domain
- Consider implementing additional validation on the backend
- Monitor form submissions for any suspicious activity
