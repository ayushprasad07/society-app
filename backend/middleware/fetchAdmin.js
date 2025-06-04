const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchAdmin = (req, res, next) => {
  const token = req.header('auth-token'); 
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admins; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token. Please authenticate." });
  }
};

module.exports = fetchAdmin;
