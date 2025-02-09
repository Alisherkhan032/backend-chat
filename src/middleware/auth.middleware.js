const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized- No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized - No user" });

    req.user = user;
    next();
    
  } catch (error) {
    console.log("Error in auth middleware: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {authMiddleware};
