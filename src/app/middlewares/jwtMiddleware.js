// middlewares/jwtMiddleware.js
const jwt = require('jsonwebtoken');
const config = require("../config/config")

const jwtMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.jwt.secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = jwtMiddleware;
