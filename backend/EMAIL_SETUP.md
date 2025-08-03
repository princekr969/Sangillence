# 📧 Email Setup Guide

This guide will help you set up email confirmation functionality for student registrations.

## 🚀 Quick Setup

### 1. Gmail Account Setup (sangillence@gmail.com)

1. **Enable 2-Factor Authentication**
   - Go to sangillence@gmail.com Google Account settings
   - Navigate to Security → 2-Step Verification
   - Enable 2-Factor Authentication if not already enabled

2. **Generate App Password**
   - In Security settings, find "App passwords"
   - Click "Generate" for a new app password
   - Select "Mail" as the app type
   - Choose "Other (Custom name)" and name it "Sangillence Backend"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2. Environment Variables

Add these to your `.env` file:

```bash
# Email Configuration
EMAIL_USER=sangillence@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

### 3. Test the Setup

Run the email test script:

```bash
npm run test-email
```

## 📧 Email Features

### Student Confirmation Email
- ✅ Sent to the student's email address
- ✅ Contains registration details
- ✅ Professional HTML template
- ✅ Next steps information

### School Notification Email
- ✅ Sent to the school's email address
- ✅ Notifies about new student registration
- ✅ Contains student details for verification

## 🔧 Configuration Options

### Customizing Email Templates
Edit the HTML templates in `utils/emailService.js`:
- `sendStudentConfirmationEmail()` - Student confirmation template
- `sendSchoolNotificationEmail()` - School notification template

### Email Service Providers
Currently configured for Gmail. To use other providers:

1. **Outlook/Hotmail:**
```javascript
const transporter = nodemailer.createTransporter({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

2. **Custom SMTP:**
```javascript
const transporter = nodemailer.createTransporter({
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Ensure you're using an App Password, not your regular Gmail password
   - Verify 2-Factor Authentication is enabled

2. **"Less secure app access" error**
   - Gmail no longer supports less secure apps
   - Use App Passwords instead

3. **Emails not sending**
   - Check your internet connection
   - Verify environment variables are set correctly
   - Check server logs for detailed error messages

### Debug Commands:

```bash
# Test email functionality
npm run test-email

# Check environment variables
echo $EMAIL_USER
echo $EMAIL_PASSWORD

# View server logs
npm run dev
```

## 📊 Email Templates

The email templates include:
- Responsive HTML design
- Professional branding
- Clear information hierarchy
- Contact information
- Next steps guidance

### Template Structure:
```
┌─────────────────────────────────────┐
│ 🎉 Registration Confirmed!          │
├─────────────────────────────────────┤
│ Registration Details:               │
│ • Full Name                         │
│ • Date of Birth                     │
│ • Class                             │
│ • Mobile                            │
│ • School Email                      │
├─────────────────────────────────────┤
│ 📋 What's Next?                     │
│ • Keep this email for records       │
│ • We'll contact you with details    │
│ • Check email regularly for updates │
└─────────────────────────────────────┘
```

## 🔒 Security Best Practices

- ✅ Use App Passwords, not regular passwords
- ✅ Never commit `.env` files to version control
- ✅ Regularly rotate App Passwords
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS in production

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Gmail settings
3. Test with the provided test script
4. Check server logs for detailed error messages 