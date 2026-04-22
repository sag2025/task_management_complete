const loginUser = require("../services/services.user.login");


async function login(req, res) {
  try {
    const result = await loginUser(req.body);

    if (result === "USER_NOT_FOUND" || result === "INVALID_PASSWORD") {
      return res.status(401).json({ message: result });
    }

    return res.status(200).json({
      token: result.token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { login };