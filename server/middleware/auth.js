const User = require('../models/User');
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"] ?? "";
  try {
    console.log("inside try block.")
    const decoded = jwt.verify(authHeader, 'secretkey');
    console.log(decoded);

    if (decoded.role) {
      decoded.userId == 'admin';
      return next();
    } else {
      return res.status(403).json({
        message: "You are not an Admin."
      });
    }
  } catch (error) {
    //console.log(error);
    console.log("error in middleware");
    res.status(500).send('Error checking user role');
  }
};

module.exports = { isAdmin };