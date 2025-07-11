const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User is unauthorized!" });
    }
    req.user = decoded; // Attach decoded user info
    next(); // Proceed to the next middleware or route
  });
};

module.exports = authMiddleware;
