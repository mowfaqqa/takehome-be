const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secretKey = process.env.JSON_SECRET_KEY;
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

module.exports = generateToken;
