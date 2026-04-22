
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  const token = authHeader.split(" ")[1];

  console.log("EXTRACTED TOKEN:", token);
  console.log("JWT SECRET:", process.env.MY_SECRET_KEY);

  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);

    console.log("DECODED USER:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "INVALID_TOKEN",
      error: err.message
    });
  }
}

module.exports=authMiddleware;