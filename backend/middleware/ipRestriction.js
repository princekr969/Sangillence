import fetch from 'node-fetch';

// Function to get client's real IP address
const getClientIP = (req) => {
    // Check various headers for the real IP
    return req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip ||
        '127.0.0.1';
};

// Function to get country from IP address
const getCountryFromIP = async (ip) => {
    try {
        // Skip for localhost/development
        if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
            return 'US'; // Default to US for development
        }

        // Use a free IP geolocation service
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
        const data = await response.json();

        return data.countryCode || 'US';
    } catch (error) {
        console.error('Error fetching country from IP:', error);
        return 'US'; // Default to US if service fails
    }
};

// Middleware to block Oman IPs from student registration
export const blockOmanForStudentRegistration = async (req, res, next) => {
    try {
        const clientIP = getClientIP(req);
        console.log(`Checking IP: ${clientIP}`);

        const countryCode = await getCountryFromIP(clientIP);
        console.log(`Country detected: ${countryCode}`);

        if (countryCode === 'OM') {
            return res.status(403).json({
                success: false,
                message: 'Student registration is not available for Oman. Please use school registration instead.',
                country: 'Oman',
                availableServices: ['School Registration']
            });
        }

        // Allow the request to proceed
        next();
    } catch (error) {
        console.error('IP restriction middleware error:', error);
        // In case of error, allow the request to proceed (fail open)
        next();
    }
};

// Alternative middleware using a more reliable service (ipapi.co)
export const blockOmanForStudentRegistrationV2 = async (req, res, next) => {
    try {
        const clientIP = getClientIP(req);
        console.log(`Checking IP: ${clientIP}`);

        // Skip for localhost/development
        if (clientIP === '127.0.0.1' || clientIP === '::1' || clientIP === '::ffff:127.0.0.1') {
            return next();
        }

        // Use ipapi.co service (more reliable, has free tier)
        const response = await fetch(`https://ipapi.co/${clientIP}/country_code/`);
        const countryCode = await response.text();

        console.log(`Country detected: ${countryCode}`);

        if (countryCode.trim() === 'OM') {
            return res.status(403).json({
                success: false,
                message: 'Student registration is not available for Oman. Please use school registration instead.',
                country: 'Oman',
                availableServices: ['School Registration']
            });
        }

        // Allow the request to proceed
        next();
    } catch (error) {
        console.error('IP restriction middleware error:', error);
        // In case of error, allow the request to proceed (fail open)
        next();
    }
};
