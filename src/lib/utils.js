const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // Prevents XSS
        sameSite: "None", // Enables cross-origin cookies
        secure: true // Required for HTTPS
    });

    return token;
};

module.exports = { generateToken };
