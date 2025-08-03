import dotenv from 'dotenv';
import { sendStudentConfirmationEmail, sendSchoolNotificationEmail } from './utils/emailService.js';

dotenv.config();

const testStudentData = {
    fullName: 'Test Student',
    dob: '15/03/2010',
    email: 'test@example.com', // Replace with your test email
    class: '8',
    mobile: '9876543210',
    schoolEmail: 'school@example.com' // Replace with your test email
};

async function testEmails() {
    console.log('🧪 Testing Email Functionality...\n');

    try {
        // Test student confirmation email
        console.log('📧 Sending student confirmation email...');
        const studentResult = await sendStudentConfirmationEmail(testStudentData);

        if (studentResult.success) {
            console.log('✅ Student confirmation email sent successfully!');
            console.log('📧 Message ID:', studentResult.messageId);
        } else {
            console.log('❌ Failed to send student confirmation email:', studentResult.error);
        }

        console.log('\n📧 Sending school notification email...');
        const schoolResult = await sendSchoolNotificationEmail(testStudentData);

        if (schoolResult.success) {
            console.log('✅ School notification email sent successfully!');
            console.log('📧 Message ID:', schoolResult.messageId);
        } else {
            console.log('❌ Failed to send school notification email:', schoolResult.error);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Email environment variables not set!');
    console.log('Please set EMAIL_USER and EMAIL_PASSWORD in your .env file');
    process.exit(1);
}

testEmails(); 