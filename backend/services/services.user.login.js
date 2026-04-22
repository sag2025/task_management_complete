const User = require("../models/user.js");
const { generateToken } = require("../utils/jwt.js");
const { comparePassword } = require("../utils/hash.js");

async function loginUser(body) {
  const { email, password } = body;

  const user = await User.getUserByEmail(email);

  if (!user) {
    return "USER_NOT_FOUND";
  }

  
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return "INVALID_PASSWORD";
  }

  const token = generateToken(user);

  return { token };
}

module.exports = loginUser;