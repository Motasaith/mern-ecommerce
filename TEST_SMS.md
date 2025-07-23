# SMS Verification Testing Guide

## Quick Test Steps

### 1. Test Registration
1. Go to http://localhost:3001/register
2. Fill out the form with:
   - Name: Test User
   - Phone: Select Pakistan (+92) and enter: 3363855120
   - Email: test@example.com
   - Password: password123

### 2. Expected Flow
1. Registration should succeed
2. SMS verification modal should open
3. Check backend console for verification code
4. Enter the code in the modal

### 3. Debugging Steps

#### Backend Errors
- Check backend console for error messages
- Verify MongoDB connection
- Check if user is being created in database

#### Frontend Errors
- Open browser developer tools (F12)
- Check Network tab for API calls
- Look for 400/500 errors in console

#### Common Issues
1. **400 Bad Request**: Usually validation error
   - Check phone number format
   - Verify all required fields are sent

2. **Phone validation fails**: 
   - Check RAPIDAPI_KEY in .env
   - Verify internet connection

3. **Modal not showing**:
   - Check if registration succeeds first
   - Look for JavaScript errors

### 4. Manual API Test

You can test the API directly using curl:

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "phone": "+923363855120"
  }'
```

### 5. Current Status
- ✅ Backend server running on port 5000
- ✅ Frontend running on port 3001
- ✅ MongoDB connected
- ✅ Phone validation API configured
- ❓ SMS service (will log codes in development)

### 6. Known Issues Fixed
- ✅ Removed problematic test files
- ✅ Fixed Twilio initialization
- ✅ Simplified PhoneInput component
- ✅ Added proper error handling
