const jwt = require("jsonwebtoken");
require('dotenv').config({path: '../.env'});
const SECRET = process.env.MY_SECRET_KEY;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "2h" }
  );
}

module.exports = { generateToken };