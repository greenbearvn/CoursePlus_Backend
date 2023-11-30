const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (token) => {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      return null;
    }
  };
  

  
module.exports = verifyToken
