import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for Gmail
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
        }
    });
};

// Send confirmation email to student
export const sendStudentConfirmationEmail = async (studentData) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentData.email,
            subject: '🎉 Registration Confirmation - Sangillence Olympiad',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333; margin-bottom: 10px;">🎉 Registration Confirmed!</h1>
                            <p style="color: #666; font-size: 16px;">Thank you for registering for the Sangillence Olympiad</p>
                        </div>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #333; margin-bottom: 15px;">Registration Details:</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Full Name:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.fullName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Date of Birth:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.dob}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Class:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.class}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Mobile:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.mobile}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">School Email:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.schoolEmail}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h3 style="color: #2d5a2d; margin-bottom: 10px;">📋 What's Next?</h3>
                            <ul style="color: #2d5a2d; line-height: 1.6;">
                                <li>Keep this email for your records</li>
                                <li>We'll contact you with further details about the Olympiad</li>
                                <li>Make sure to check your email regularly for updates</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 14px;">
                                If you have any questions, please contact us at 
                                <a href="mailto:info@sangillence.com" style="color: #007bff;">info@sangillence.com</a>
                            </p>
                            <p style="color: #999; font-size: 12px; margin-top: 10px;">
                                © 2024 Sangillence. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return { success: false, error: error.message };
    }
};

// Send notification email to school
export const sendSchoolNotificationEmail = async (studentData) => {
    try {
        console.log("Sending confirmation email to:", studentData.email);

        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentData.schoolEmail,
            subject: '📚 New Student Registration - Sangillence Olympiad',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333; margin-bottom: 10px;">📚 New Student Registration</h1>
                            <p style="color: #666; font-size: 16px;">A student from your school has registered for the Sangillence Olympiad</p>
                        </div>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #333; margin-bottom: 15px;">Student Details:</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Full Name:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.fullName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Date of Birth:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.dob}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Class:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.class}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Student Email:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Mobile:</td>
                                    <td style="padding: 8px 0; color: #333;">${studentData.mobile}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h3 style="color: #856404; margin-bottom: 10px;">ℹ️ Important Information</h3>
                            <ul style="color: #856404; line-height: 1.6;">
                                <li>This student has successfully registered for the Sangillence Olympiad</li>
                                <li>Please ensure the student's information is accurate</li>
                                <li>We'll provide further details about the Olympiad schedule</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 14px;">
                                For any queries, please contact us at 
                                <a href="mailto:info@sangillence.com" style="color: #007bff;">info@sangillence.com</a>
                            </p>
                            <p style="color: #999; font-size: 12px; margin-top: 10px;">
                                © 2024 Sangillence. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('School notification email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending school notification email:', error);
        return { success: false, error: error.message };
    }
}; 