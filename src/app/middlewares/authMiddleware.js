
const verifyToken = require("../config/jwt/verifyToken")

const authenticate = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
  }
  // Verify the token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
  }
  next();
};

module.exports = authenticate;