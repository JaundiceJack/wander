const jwt = require('jsonwebtoken');

// Grab the json web token key
const jwtk = require('../config/keys').jwtSecret;

function auth(req, res, next) {
  // Get the json web token from the request header
  const token = req.header('x-auth-token');
  // Check for the authentication token and reply with a 401 if there was none
  if (!token)
    return res.status(401)
              .json({msg: "Please log in again or create an account."});
  try {
    // Verify the token and proceed with the next tast if authentic
    const decoded = jwt.verify(token, jwtk);
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({msg: "Session expired. Please log in again."})
  }
}

module.exports = auth;
