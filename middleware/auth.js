const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // console.log("decoded token = ", decoded);

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
