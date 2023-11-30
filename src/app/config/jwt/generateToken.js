const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};


module.exports = generateToken;