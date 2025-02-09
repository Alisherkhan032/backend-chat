const jwt = require('jsonwebtoken');

const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '7d'
    })

    res.cookie('token', token, {
        maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly : true, // prevent XSS attack
        sameSite : true, // prevent CSRF attack
        secure : process.env.NODE_ENV === 'production' ? true : false // only set cookie in https in production
    })

    return token;
}

module.exports = {generateToken};