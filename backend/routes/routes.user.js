const express = require("express");
const router = express.Router();

const { login } = require("../controllers/controllers.user.login");
const { register } = require("../controllers/controllers.user.register");

// POST /api/users/login
router.post("/login", login);
router.post("/register",register);

module.exports = router;