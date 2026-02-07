# 🔐 Student Dashboard - Test Login

## Quick Test Credentials

```
Name:     RAHUL KUMAR
School:   PM SHRI KENDRIYA VIDYALAYA NUMBER-1 GWALIOR
DOB:      15/05/2010
Roll No:  2025001
Class:    Class 8
Section:  A
```

---

## How to Test

### Method 1: Login Form (Recommended)
1. Start server: `npm run dev`
2. Go to: `http://localhost:5173/studentLogin`
3. Fill form with credentials above
4. Click "Continue"
5. View dashboard!

### Method 2: Quick Console Access
```javascript
localStorage.setItem('studentId', 'mock_student_123');
window.location.href = '/student-dashboard';
```

---

## What You'll See on Dashboard

- ✅ Student photo
- ✅ Name: RAHUL KUMAR
- ✅ School: PM SHRI KENDRIYA VIDYALAYA NUMBER-1 GWALIOR
- ✅ Class: Class 8, Section A
- ✅ Email: rahul.kumar@example.com
- ✅ Roll Number: SOBO2025001
- ✅ Performance: 75% average, Rank #156
- ✅ Practice Tests: 3 completed
- ✅ Subjects: Mathematics, Science, English
- ✅ Olympiad Status: Registered
- ✅ Exam Date: 2025-03-20 at 10:00 AM

---

## Testing Checklist

- [ ] Login with correct credentials → Success
- [ ] Login with wrong credentials → Shows error
- [ ] Dashboard displays all student info
- [ ] School name shows full name (not code)
- [ ] Logout button works
- [ ] After logout, redirects to login

---

## Console Errors (Safe to Ignore)

You may see these errors - they're **expected**:
- `API Login failed` → Normal, mock data is used
- `ERR_CONNECTION_REFUSED` → Backend not running, mock data works
- `✅ Mock login successful!` → **This means it's working!**

---

## Ready for Real Database

When you connect your backend:
1. Mock data automatically falls back if API fails
2. Same login flow
3. Same dashboard display
4. No code changes needed!

---

## Files Changed

### Modified Files:
1. `src/data/mockStudentData.js` - Single student mock data
2. `src/components/Forms/StudentLoginForm.jsx` - Added mock fallback
3. `src/pages/StudentDashboard.jsx` - Display school full name
4. `src/App.jsx` - Routes setup

### New Files:
1. `src/utils/api.js` - API utility functions
2. `backend/controllers/student.controller.js` - Backend controller
3. `backend/routes/student.routes.js` - Backend routes

---

## Troubleshooting

**Dashboard shows "Student not found"?**
```javascript
localStorage.clear();
localStorage.setItem('studentId', 'mock_student_123');
location.reload();
```

**Can't login?**
- Check credentials match exactly
- Name can be lowercase (auto-converts to uppercase)
- Date format must be DD/MM/YYYY

**Want to logout?**
- Click Logout button, OR
- Run: `localStorage.clear()`
